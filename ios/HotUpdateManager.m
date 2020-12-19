/*
 * created by tuanhm
 */

#import "HotUpdateManager.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "Downloader.h"
#import "AppDelegate.h"
#import "CodePush.h"
#import "SSZipArchive.h"
#import "RCTBundleURLProvider.h"

@interface HotUpdateManager()

@end

#define SERVER_URL @"https://api.heyu.asia";
#define PATH_CHECKUPDATE @"/api/v1.0/app/get-lastest-update";
#define ACCESS_TOKEN @"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuaEBjb21wYXJlNTIuY29tIiwicGFzc3dvcmQiOiJzaGVlcDEyMzQ1NiIsImlhdCI6MTQ3NDg1NTM5Nn0.KQdfmvxl96SrPsQpy1_J_gkGOZkoVQvGA1FZ6RK1_BE";
@implementation HotUpdateManager

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;
// constants
int const UPDATE_NOT_YET = 0;
int const UPDATE_CHECKING = 1;
int const UPDATE_READY = 2;
int const UPDATE_NO_NEED = 3;
int const UPDATE_ERROR = 4;
// end-constants

long long _hybridVersionGet = 0;
NSString* _path = @"";
NSNumber* _contentLength = 0;
int statusUpdate = UPDATE_NOT_YET;
NSError* errorUpdate = nil;
static HotUpdateManager* _instance;

// Singleton instance
+(HotUpdateManager *)getInstance {
  static HotUpdateManager *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [[HotUpdateManager alloc] init];
  });
  return sharedInstance;
}


-(BOOL)checkUpdate {
  NSLog(@"Start check update");
  BOOL needUpdate = false;
  NSString* serverUrl = SERVER_URL;
  NSString* path = PATH_CHECKUPDATE;
  NSString* accessToken = ACCESS_TOKEN;
  long long nativeVersion = [self getNativeVersion];
  NSLog(@"Native version: %lld", nativeVersion);
  
  NSString* stringUrl = [NSString stringWithFormat:@"%@%@", serverUrl, path];
  NSLog(@"URL: %@", stringUrl);
  
  NSString *post = [NSString stringWithFormat:@"{\"platform\":\"ios\",\"nativeVersion\":%lld}", nativeVersion];
  NSLog(@"postData: %@", post);
  NSData *postData = [post dataUsingEncoding:NSUTF8StringEncoding allowLossyConversion:YES];
  NSString *postLength = [NSString stringWithFormat:@"%lu",(unsigned long)[postData length]];
  NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
  request.timeoutInterval = 10;
  [request setURL:[NSURL URLWithString: stringUrl]];
  [request setHTTPMethod:@"POST"];
  [request setValue:postLength forHTTPHeaderField:@"Content-Length"];
  [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
  [request setValue:accessToken forHTTPHeaderField:@"x-access-token"];
  [request setHTTPBody:postData];
  
  NSURLResponse *response=nil;
  NSError *error;
  NSData* data = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&error];
  
  if (response && !error) {
    NSDictionary *results = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments  error:&error];
    if(!error || (int)results[@"code"] != 200) {
      _hybridVersionGet = [results[@"created_time"] longLongValue]*1000;
      _path = results[@"bundle"];
      
      if([self shouldUpdate]) {
        needUpdate = true;
        [self downloadFileUpdate];
      }
    } else {
//      [self setStatusUpdate:UPDATE_ERROR error: error];
    }
  } else {
//    [self setStatusUpdate:UPDATE_ERROR error: error];
  }
  
  return needUpdate;
}

-(BOOL) shouldUpdate {
  BOOL update = false;
  long long currentHybridVersion = [self getHybridVersion];
  NSLog(@"Current hybrid version: %lld", currentHybridVersion);
  NSLog(@"New hybrid version: %lld", _hybridVersionGet);
  
  if(currentHybridVersion < _hybridVersionGet) {
    NSLog(@"Need update");
    update = true;
  } else {
    NSLog(@"No need update");
  }
  
  return update;
}

-(void) downloadFileUpdate {
  DownloadParams* params = [DownloadParams alloc];
  params.fromUrl = [self getNewHybridVersionUrl];
  NSLog(@"HOT UPDATE: URL DOWNLOAD: %@", params.fromUrl);
  
  NSString *filePath = [self getPathDownload];
  
  params.toFile = filePath;
  params.background = true;
  
  params.completeCallback = ^(NSNumber* statusCode, NSNumber* bytesWritten) {
    NSLog(@"Download file update complete");
    [self processFile];
  };
  
  params.errorCallback = ^(NSError* error) {
    NSLog(@"Download file update error: %@",[error localizedDescription]);
    [self setStatusUpdate: UPDATE_ERROR error:error];
  };
  
  params.beginCallback = ^(NSNumber* statusCode, NSNumber* contentLength, NSDictionary* headers) {
    NSLog(@"Start download file update: %@", contentLength);
  };
  
  params.progressCallback = ^(NSNumber* contentLength, NSNumber* bytesWritten) {
    NSLog(@"Download progress: %@", bytesWritten);
  };
  
  Downloader* downloader = [Downloader alloc];
  
  [downloader downloadFile:params];
}

// HANDLE FILE DOWNLOAD
- (void) processFile {
  NSLog(@"Start process file download");
  [self unzipFile];
}

- (void) unzipFile {
  NSLog(@"Start unzip file");
  NSError * error = nil;
  NSString *pathBundle = [self getPathBundleTempFile];
  NSString *filePath = [self getPathDownload];
  NSString *fileZip = [self getPathUnzip];
  
  [SSZipArchive
   unzipFileAtPath:filePath
   toDestination:fileZip
   overwrite: true
   password: NULL
   error: &error];
  
  if(!error) {
    NSLog(@"Unzip file success");
    // check exist resource
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSString *assetsPath = [fileZip stringByAppendingPathComponent:@"assets"];
    NSString *mainBundlePath = [fileZip stringByAppendingPathComponent:@"main.jsbundle"];
    BOOL isDirectory;
    
    if ([fileManager fileExistsAtPath:assetsPath isDirectory:&isDirectory] && isDirectory && [fileManager fileExistsAtPath:mainBundlePath]) {
      NSLog(@"Resource ok");
      NSString *dest = [pathBundle stringByAppendingPathComponent:@"assets/assets"];
      [self copyAssets: assetsPath dest:dest];
    } else {
      [self showContent];
      NSLog(@"Resource need to have: assets folder, main.jsbundle file");
      [self setStatusUpdate:UPDATE_ERROR error:error];
    }
  } else {
    NSLog(@"Unzip file fail %@", [error localizedDescription]);
    [self setStatusUpdate:UPDATE_ERROR error:error];
  }
}

- (void) copyAssets: (NSString *) source dest:(NSString *) dest {
  NSLog(@"Start copy assets");
  NSLog(@"Source: %@", source);
  NSLog(@"Dest: %@", dest);
  
  NSError *error = [CodePush copyDirectory:source dest:dest];
  if(!error) {
    NSLog(@"Copy success");
    NSString *fileSource = [[self getPathUnzip] stringByAppendingPathComponent:@"main.jsbundle"];
    NSString* fileDest=[NSString stringWithFormat:@"%@/%lld.jsbundle", [self getPathBundleTempFile], _hybridVersionGet];
    
    [self moveMainBundle: fileSource fileDest: fileDest];
  } else {
    NSLog(@"Copy fail");
    [self setStatusUpdate:UPDATE_ERROR error:error];
  }
}

- (void) moveMainBundle: (NSString *) fileSource fileDest: (NSString *) fileDest {
  NSLog(@"Start move jsbundle file");
  NSFileManager * fm = [[NSFileManager alloc] init];
  NSLog(@"Source: %@", fileSource);
  NSLog(@"Dest: %@", fileDest);
  NSError* error = nil;
  
  BOOL isSuccess = [fm moveItemAtPath:fileSource toPath:fileDest error:&error];
  if(isSuccess) {
    NSLog(@"Move main jsbundle success");
    [self setStatusUpdate: UPDATE_READY error:error];
  } else {
    NSLog(@"Move main jsbundle fail");
    [self setStatusUpdate: UPDATE_ERROR error:error];
  }
}

- (NSString *) getPathDownload {
  NSString *pathBundle = [self getPathBundleTempFile];
  return  [pathBundle stringByAppendingPathComponent:@"temp"];
}

- (NSString *) getPathUnzip {
  NSString *pathBundle = [self getPathBundleTempFile];
  return  [pathBundle stringByAppendingPathComponent:@"tempUnzip"];
}

- (void) setStatusUpdate: (int) value error: (NSError *) error{
  statusUpdate = value;
  errorUpdate = error;
  NSLog(@"Update status: %d, error: %@", value, [error localizedDescription]);
  // Just reload bundle whatever
  NSURL *jsCodeLocation;
  #ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"src/index.ios" fallbackResource:nil];
  #else
    jsCodeLocation = [CodePush bundleURL];
  #endif
  
  [(AppDelegate *)[[UIApplication sharedApplication] delegate] reloadBundleFromUrl: jsCodeLocation];
  [self clearDataHasProcess];
}

- (void) clearDataHasProcess {
  [self removeOldBundle];
  [self removeFileDownAndUnzip];
  [self showContent];
}

- (void) removeOldBundle {
  NSString *directory = [self getPathBundleTempFile];
  NSError* error = nil;
  long long newestHybridVersion = [self getHybridVersion];
  NSArray *paths = [[NSFileManager defaultManager] contentsOfDirectoryAtPath:directory  error:&error];
  
  if(!error) {
    for (NSString *path in paths) {
      if ([path rangeOfString:@"jsbundle"].location != NSNotFound) {
        NSArray *arrName = [path componentsSeparatedByString:@"."];
        long long temp = [arrName[0] longLongValue];
        NSLog(@"%lld %lld", temp, newestHybridVersion);
        if (temp < newestHybridVersion) {
          [self removeFileExist: [[self getPathBundleTempFile] stringByAppendingPathComponent:path]];
        }
      }
    }
  }
}

- (void) removeFileDownAndUnzip {
  NSString* fileDownloadPath = [self getPathDownload];
  NSString* fileUnzipPath = [self getPathUnzip];
  [self removeFileExist:fileDownloadPath];
  [self removeFileExist:fileUnzipPath];
}

-(BOOL)removeFileExist:(NSString*)filePath{
  NSLog(@"Delete: %@", filePath);
  NSFileManager *fileManager = [NSFileManager defaultManager];
  //  NSString *filePath = [[self getPathBundleTempFile] stringByAppendingPathComponent:fileName];
  NSError *error;
  BOOL success = [fileManager removeItemAtPath:filePath error:&error];
  if (success) {
    return true;
  }
  NSLog(@"Error delete file: %@", [error localizedDescription]);
  return false;
}

- (void) showContent {
  NSString *directory = [self getPathBundleTempFile];
  NSError* error = nil;
  NSArray *paths = [[NSFileManager defaultManager] contentsOfDirectoryAtPath:directory  error:&error];
  
  if(!error) {
    for (NSString *path in paths) {
      NSLog(@"File: %@", path);
    }
  }
}

//================================================================================================================================

-(NSString*)getPathBundleTempFile{
  NSArray       *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString  *documentDirPath = [paths objectAtIndex:0];
  return documentDirPath;
}

-(long long)getNativeVersion{
  NSString *build = [[NSBundle mainBundle] objectForInfoDictionaryKey: (NSString *)kCFBundleVersionKey];
  long long version = [build longLongValue];
  return version;
}

//================================================================================================================================

-(long long)getHybridVersion {
  long long lastestBundle = 0;
  NSError *error;
  NSString *direction = [NSString stringWithFormat:@"%@",[self getPathBundleTempFile]];
  NSArray *paths = [[NSFileManager defaultManager] contentsOfDirectoryAtPath:direction  error:&error];
  if(!error) {
    for (NSString *path in paths) {
      if ([path rangeOfString:@"jsbundle"].location != NSNotFound) {
        NSArray *arrName = [path componentsSeparatedByString:@"."];
        long long temp = [arrName[0] longLongValue];
        if (temp > lastestBundle) {
          lastestBundle = temp;
        }
      }
    }
  } else {
    lastestBundle = [self getCurrentTimeMiliseconds];
  }
  return lastestBundle;
}

//================================================================================================================================

-(long long)getCurrentTimeMiliseconds{
  NSString *dateStr = [NSString stringWithFormat:@"%@ %@", [NSString stringWithUTF8String:__DATE__], [NSString stringWithUTF8String:__TIME__]];
  // Convert to date
  NSDateFormatter *dateFormat = [[NSDateFormatter alloc] init];
  [dateFormat setDateFormat:@"LLL d yyyy HH:mm:ss"];
  NSLocale *usLocale = [[NSLocale alloc] initWithLocaleIdentifier:@"en_US"];
  [dateFormat setLocale:usLocale];
  NSDate *date = [dateFormat dateFromString:dateStr];
  // Convert Date to milliseconds
  return (long long)([date timeIntervalSince1970] * 1000.0);
}

//================================================================================================================================

-(NSString*)getNewestFileName {
  NSString *fileName = nil;
  
  long long lastestBundle = 0;
  NSError *error;
  NSString *direction = [NSString stringWithFormat:@"%@",[self getPathBundleTempFile]];
  NSArray *paths = [[NSFileManager defaultManager] contentsOfDirectoryAtPath:direction  error:&error];
  
  if(!error) {
    for (NSString *path in paths) {
      if ([path rangeOfString:@"jsbundle"].location != NSNotFound) {
        NSArray *arrName = [path componentsSeparatedByString:@"."];
        long long temp = [arrName[0] longLongValue];
        if (temp > lastestBundle) {
          lastestBundle = temp;
        }
      }
    }
    
    if(lastestBundle != 0) {
      fileName = [NSString stringWithFormat:@"%lld.jsbundle", lastestBundle];
    }
  }
  
  return fileName;
}

//================================================================================================================================

-(long long)getNewHybridVersion {
  return _hybridVersionGet;
}

-(NSString *)getNewHybridVersionUrl{
  NSString* serverUrl = SERVER_URL;
  NSString* downloadUrl = [NSString stringWithFormat:@"%@%@", serverUrl, _path];
  return downloadUrl;
}

-(int) getStatusUpdate {
  return statusUpdate;
}
-(NSError *) getErrorUpdate {
  return errorUpdate;
}
//================================================================================================================================

@end

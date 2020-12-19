

#import "CodePush.h"
//#import "HotUpdateManager.h"
#import "React/RCTBundleURLProvider.h"


static NSString *bundleResourceExtension = @"jsbundle";
static NSString *bundleResourceName = @"main";

@implementation CodePush


//===============================================================================================================

+ (NSURL *)binaryBundleURL
{
  return [[NSBundle mainBundle] URLForResource:bundleResourceName withExtension:bundleResourceExtension];
}

//===============================================================================================================

+ (NSURL *)bundleURL
{
//  NSLog(@"Determine bundle URL");
//  NSArray       *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
//  NSString  *documentsDirectory = [paths objectAtIndex:0];
//
//  NSString  *fileName = [[HotUpdateManager getInstance] getNewestFileName];
//
//  if (fileName!=nil) {
//    NSLog(@"Has bundle in custom folder: %@", fileName);
//    NSString *filePath =[NSString stringWithFormat:@"%@/%@", documentsDirectory, fileName];
//    NSURL *packageUrl = [[NSURL alloc] initFileURLWithPath:filePath];
//    return packageUrl;
//  }

  NSLog(@"Use default bundle file");
  return [CodePush binaryBundleURL];
}
//===============================================================================================================

+(void)copyDirectory:(NSString*)directory{
  NSFileManager *fileManager = [NSFileManager defaultManager];
  NSError *error;
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *documentsDirectory = [paths objectAtIndex:0];
  NSString *documentDBFolderPath = [documentsDirectory stringByAppendingPathComponent:directory];
  NSString *resourceDBFolderPath = [[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent:directory];

  if (![fileManager fileExistsAtPath:documentDBFolderPath]) {
    //Create Directory!
    [fileManager createDirectoryAtPath:documentDBFolderPath withIntermediateDirectories:YES attributes:nil error:&error];
  }
  NSArray *fileList = [fileManager contentsOfDirectoryAtPath:resourceDBFolderPath error:&error];
  for (NSString *s in fileList) {
    NSString *newFilePath = [documentDBFolderPath stringByAppendingPathComponent:s];
    NSString *oldFilePath = [resourceDBFolderPath stringByAppendingPathComponent:s];
    if (![fileManager fileExistsAtPath:newFilePath]) {
      //File does not exist, copy it
      [fileManager copyItemAtPath:oldFilePath toPath:newFilePath error:&error];
    }
  }
}

+(NSError *)copyDirectory:(NSString*)source dest:(NSString*) dest{
  NSFileManager *fileManager = [NSFileManager defaultManager];

  NSError *error;

  if (![fileManager fileExistsAtPath:dest]) {
    //Create Directory!
    NSLog(@"folder not exist: %@", dest);
    [fileManager createDirectoryAtPath:dest withIntermediateDirectories:YES attributes:nil error:&error];
    if(error) {
      return error;
    }
  } else {
    NSLog(@"folder exist: %@", dest);
  }

  NSArray *fileList = [fileManager contentsOfDirectoryAtPath:source error:&error];
  for (NSString *file in fileList) {
    NSLog(@"Process file: %@", file);
    NSString *newFilePath = [dest stringByAppendingPathComponent:file];
    NSString *oldFilePath = [source stringByAppendingPathComponent:file];

    if ([[NSFileManager defaultManager] fileExistsAtPath:newFilePath])
      [[NSFileManager defaultManager] removeItemAtPath:newFilePath error:nil];

    [fileManager copyItemAtPath:oldFilePath toPath:newFilePath error:&error];
    if(error) {
      return error;
    } else {
      NSLog(@"Copy success %@", file);
    }
    //    BOOL isDirectory;
    //    if ([fileManager fileExistsAtPath:oldFilePath isDirectory:&isDirectory]) {
    //      //File does not exist, copy it
    //      if(isDirectory) {
    //        NSLog(@"Folder: %@", file);
    //        error = [CodePush copyDirectory:oldFilePath dest:newFilePath];
    //      } else {
    //        NSLog(@"File: %@", file);
    ////        if(![fileManager fileExistsAtPath:newFilePath]) {
    //          [fileManager copyItemAtPath:oldFilePath toPath:newFilePath error:&error];
    ////        }
    //      }
    //      if(error) {
    //        return error;
    //      }
    //    }
  }

  return nil;
}

//===============================================================================================================

+(void)copyDirectory{
  NSString *directory =@"/assets/assets";
  NSFileManager *fileManager = [NSFileManager defaultManager];
  NSError *error;
  NSString *resourceDBFolderPath = [[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent:directory];
  NSArray *fileList = [fileManager contentsOfDirectoryAtPath:resourceDBFolderPath error:&error];
  for ( NSString *s in fileList) {
    NSString *newDirectory = [NSString stringWithFormat:@"%@/%@", directory,s];
    [self copyDirectory:newDirectory];
  }
}

@end

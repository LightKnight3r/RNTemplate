
#import <Foundation/Foundation.h>

@interface CodePush : NSObject
+ (NSURL *)binaryBundleURL;
+ (NSURL *)bundleURL;
+(void)copyDirectory:(NSString*)directory;
+(void)copyDirectory;
+(NSError *)copyDirectory:(NSString*)source dest:(NSString*) dest;
@end

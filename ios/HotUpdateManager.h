/*
 * created by tuanhm
 */

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"
#import "RCTLog.h"
#import "RCTRootView.h"

@interface HotUpdateManager : NSObject<RCTBridgeModule>

extern int const UPDATE_NOT_YET;
extern int const UPDATE_CHECKING;
extern int const UPDATE_READY;
extern int const UPDATE_NO_NEED;
extern int const UPDATE_ERROR;

-(BOOL)checkUpdate;
+(HotUpdateManager*) getInstance;
-(long long)getHybridVersion;
-(long long)getNewHybridVersion;
-(NSString*)getNewHybridVersionUrl;
-(NSString*)getNewestFileName;
-(int) getStatusUpdate;
-(NSError *) getErrorUpdate;
@end

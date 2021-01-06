//
//  UtilNative.m
//  SCTVFilms
//
//  Created by tool on 9/21/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "React/RCTLog.h"
#import "AppDelegate.h"
#import <Foundation/Foundation.h>
#import "Util.h"
//#import "CodePush.h"
//#import <GoogleMaps/GoogleMaps.h>

@implementation Util

RCT_EXPORT_MODULE();


//RCT_EXPORT_METHOD(reloadBundle) {
//  [(AppDelegate *)[[UIApplication sharedApplication] delegate] reloadBundleFromUrl: [CodePush bundleURL]];
//}


RCT_EXPORT_METHOD(setApiKeyGoogleMap:(NSString *) apiKey) {
//  [GMSServices provideAPIKey:@"AIzaSyBIidO3qxiwdjdX_GT1fLRvfGM8E8D4WIc"];
//  NSLog(@"haha set api key ne");
//  [GMSServices provideAPIKey:apiKey];
}

@end


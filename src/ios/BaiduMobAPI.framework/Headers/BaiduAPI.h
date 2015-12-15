//
//  BaiduAPI.h
//  BaiduAdPlugin
//
//  Created by baidu on 14-6-9.
//  Copyright (c) 2014年 baidu. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WebPluginDelegate.h"

@interface BaiduAPI : NSObject
//@property(nonatomic, retain) BaiduMobAdView *bannerView;
//@property(nonatomic, retain) BaiduMobAdInterstitial *interstitial;
@property(nonatomic,retain) id<WebPluginDelegate> plugin;
-(void) fireEvent:(NSString*) eventType withEventData:(NSString*) jsonString;

- (void)baiduHideBanner;
- (void)baiduShowBannerAbsolute:(int) x withY:(int) y;
- (void)baiduShowBanner:(int) position;
- (void)baiduInitBanner:(NSString *)adid withKey:(NSString*)key ;
- (void)baiduInitInterstitial:(NSString *)adid withKey:(NSString*)key ;
- (BOOL)baiduIsInterstitialReady ;
- (void)baiduShowInterstitial;
- (void)baiduCacheInterstitial;
//- (NSString*)  baiduURL;
//- (void) updateBaiduKey;
@end

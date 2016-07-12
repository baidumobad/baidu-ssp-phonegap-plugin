//
//  BaiduAdPlugin.h
//  hello
//
//  Created by baidu on 14-6-7.
//
//

#import "Cordova/CDV.h"
#import <BaiduMobAPI/BaiduAPI.h>

@interface BaiduAdPlugin : CDVPlugin <WebPluginDelegate>
@property (nonatomic,strong) BaiduAPI *baiduAPI;
- (void)baiduHideBanner:(CDVInvokedUrlCommand *)command;
- (void)baiduShowBannerAbsolute:(CDVInvokedUrlCommand *)command;
- (void)baiduShowBanner:(CDVInvokedUrlCommand *)command;
- (void)baiduIsInterstitialReady:(CDVInvokedUrlCommand *)command ;
- (void)baiduShowInterstitial:(CDVInvokedUrlCommand *)command;
- (void)baiduCacheInterstitial:(CDVInvokedUrlCommand *)command;
- (void)baiduShowSplash:(CDVInvokedUrlCommand *)command;
@end

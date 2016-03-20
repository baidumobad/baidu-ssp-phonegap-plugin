
#import "BaiduAdPlugin.h"

@implementation BaiduAdPlugin
@synthesize baiduAPI;
#pragma mark   private util Function------------------
-(void) fireEvent:(NSString*) eventType withEventData:(NSString*) jsonData{
    NSString *json=[NSString stringWithFormat:@"cordova.fireDocumentEvent('%@','{data:%@}',false);",eventType,jsonData];
    [[self commandDelegate]evalJs:json];
   // [self writeJavascript:json];
}
#pragma mark   CDVPlugin Function------------------
- (void)pluginInitialize
{
    baiduAPI=[[BaiduAPI alloc] init];
    baiduAPI.plugin=self;
}
#pragma mark   Cordova API Function------------------
- (void)baiduHideBanner:(CDVInvokedUrlCommand *)command {
    [baiduAPI baiduHideBanner];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}
- (void)baiduShowBannerAbsolute:(CDVInvokedUrlCommand *)command {
    NSDictionary *params = [command argumentAtIndex:0];
    int adx=[[params objectForKey:@"x"] intValue ];
    int ady=[[params objectForKey:@"y"] intValue];
    [baiduAPI baiduShowBannerAbsolute:adx withY:ady];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}
- (void)baiduShowBanner:(CDVInvokedUrlCommand *)command {
    int position= (int)[[command argumentAtIndex:0] integerValue];
    [baiduAPI baiduShowBanner:position];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}
- (void)baiduInitBanner:(CDVInvokedUrlCommand *)command {
    NSDictionary *params = [command argumentAtIndex:0];
    NSString *adid=[params objectForKey:@"appID"];
    NSString *key=[params objectForKey:@"bannerID"];
    [baiduAPI baiduInitBanner:adid withKey:key];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}
- (void)baiduInitInterstitial:(CDVInvokedUrlCommand *)command {
    NSDictionary *params = [command argumentAtIndex:0];
    NSString *adid=[params objectForKey:@"appID"];
    NSString *key=[params objectForKey:@"fullID"];
    [baiduAPI baiduInitInterstitial:adid withKey:key];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}
- (void)baiduIsInterstitialReady:(CDVInvokedUrlCommand *)command {
    BOOL isready=[baiduAPI baiduIsInterstitialReady];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:isready] callbackId:command.callbackId];
}
- (void)baiduShowInterstitial:(CDVInvokedUrlCommand *)command {
    [baiduAPI baiduShowInterstitial];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}
- (void)baiduCacheInterstitial:(CDVInvokedUrlCommand *)command {
    [baiduAPI baiduCacheInterstitial];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}
@end

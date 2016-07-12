
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
    NSString* bname=[command argumentAtIndex:0];
    [baiduAPI baiduHideBanner:bname];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}
- (void)baiduShowBannerAbsolute:(CDVInvokedUrlCommand *)command {
    NSDictionary *params = [command argumentAtIndex:0];
    int adx=[[params objectForKey:@"x"] intValue ];
    int ady=[[params objectForKey:@"y"] intValue];
    NSString* appID=[params objectForKey:@"appID"];
    NSString* bannerID=[params objectForKey:@"bannerID"];
    NSString* bannerName=[params objectForKey:@"bannerName"];
    [baiduAPI baiduShowBannerAbsolute:adx withY:ady appID:appID bannerID:bannerID bannerName:bannerName];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}
- (void)baiduShowBanner:(CDVInvokedUrlCommand *)command {
    NSDictionary *params = [command argumentAtIndex:0];
    int adx=[[params objectForKey:@"position"] intValue ];
    int ady=[[params objectForKey:@"marginY"] intValue];
    NSString* appID=[params objectForKey:@"appID"];
    NSString* bannerID=[params objectForKey:@"bannerID"];
    NSString* bannerName=[params objectForKey:@"bannerName"];
    [baiduAPI baiduShowBanner:adx marginY:ady appID:appID bannerID:bannerID bannerName:bannerName];
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
    NSDictionary *params = [command argumentAtIndex:0];
    NSString* appID=[params objectForKey:@"appID"];
    NSString* bannerID=[params objectForKey:@"interstitialID"];
    [baiduAPI baiduCacheInterstitial:appID interstitialID:bannerID];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}
- (void)baiduShowSplash:(CDVInvokedUrlCommand *)command{
    NSDictionary *params = [command argumentAtIndex:0];
    NSString* appID=[params objectForKey:@"appID"];
    NSString* bannerID=[params objectForKey:@"splashID"];
    [baiduAPI baiduShowSplash:appID interstitialID:bannerID];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}
@end

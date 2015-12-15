//
//  WebPluginDelegate.h
//  BaiduAdPlugin
//
//  Created by baidu on 14-6-9.
//  Copyright (c) 2014年 baidu. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol WebPluginDelegate <NSObject>
@required
-(void) fireEvent:(NSString*) eventType withEventData:(NSString*) jsonString;
@end

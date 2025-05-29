import { config as baseConfig } from './wdio.shared.conf';

export const config: WebdriverIO.Config = {
    ...baseConfig,
    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': 'iPhone 16 Pro',
        'appium:platformVersion': '18.2',
        'appium:automationName': 'XCUITest',
        'appium:app': '/Users/anahisvalenzuela/Library/Developer/Xcode/DerivedData/RNPracticeApp-cofbhtnlxbbqjafvehxkgqueynxs/build/products/Debug-iphonesimulator/RNPracticeApp.app'
    }]
};

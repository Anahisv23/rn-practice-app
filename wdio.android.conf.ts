import { config as baseConfig } from './wdio.shared.conf';

export const config: WebdriverIO.Config = {
    ...baseConfig,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Pixel 9 API 36',
        'appium:platformVersion': '16',
        'appium:automationName': 'UiAutomator2',
        'appium:app': '/Users/anahisvalenzuela/RNPracticeApp/android/app/build/outputs/apk/debug/app-debug.apk'
    }]
};

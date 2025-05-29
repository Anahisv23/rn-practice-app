export default class Base {
    async scroll(ele1: WebdriverIO.Element | ChainablePromiseElement){
        await ele1.scrollIntoView()
        // just scroll the ele2 container page until ele1 is avaiable 
     }

     async waitForIsShown(e: WebdriverIO.Element | ChainablePromiseElement) {
        return await e.waitForDisplayed({ timeout: 5000 });
     }

     async clickEle(e: WebdriverIO.Element | ChainablePromiseElement) {
        await e.waitForDisplayed();
        await e.click();
     }
}

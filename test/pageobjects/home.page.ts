import {$} from '@wdio/globals';
import Base from './base';

class HomePage extends Base {
  public singleEventContainer(itemId: number) {
    return $(`~event-container-${itemId}`);
  }

  private get events() {
    return $('~events-screen');
  }

  private get aboutButton() {
    return $('~about-button');
  }

  private get aboutScreen() {
    return $('~about-screen');
  }

  private event(eventID: number) {
    return $(`~event-container-${eventID}`);
  }

  async navigateToAbout() {
    await this.clickEle(this.aboutButton);
  }

  async isAboutButtonDisplayed() {
    const aboutButton = this.aboutButton;
    if (!aboutButton) {
      throw new Error(`Element not displayed`);
    }

    return await this.waitForIsShown(aboutButton);
  }

  async isAboutScreenDisplayed() {
    const aboutScreen = this.aboutScreen;
    if (!aboutScreen) {
      throw new Error(`Element not displayed`);
    }

    return await this.waitForIsShown(aboutScreen);
  }

  async getRandomVisibleEventElements() {
    const randomNum = Math.floor(Math.random() * 8) + 1;
    const event = await this.event(randomNum);
    await this.scroll(event)
    const eventImage = await event.$('~event-image');
    const eventTitle = await event.$('~event-title');
    const eventLocationTime = await event.$('~event-location-time');

    return {eventImage, eventTitle, eventLocationTime};

  }
}

export default new HomePage();

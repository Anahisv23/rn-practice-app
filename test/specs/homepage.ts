import {expect} from '@wdio/globals';
import HomePage from '../pageobjects/home.page';

describe('Home Page', async () => {
  it('should display about button', async () => {
    expect(await HomePage.isAboutButtonDisplayed()).toEqual(true);
  });
  it('should navigate to about screen when about button is clicked', async () => {
    await HomePage.isAboutButtonDisplayed()
    await HomePage.navigateToAbout();
    expect(await HomePage.isAboutScreenDisplayed()).toEqual(true);
  });
  it('should display event image, title, and location/time for a single event', async () => {
      const {eventImage, eventTitle, eventLocationTime} = await HomePage.getRandomVisibleEventElements();
      expect(await HomePage.waitForIsShown(eventImage)).toBe(true)
      expect(await HomePage.waitForIsShown(eventTitle)).toBe(true)
      expect(await HomePage.waitForIsShown(eventLocationTime)).toBe(true)
  });
});


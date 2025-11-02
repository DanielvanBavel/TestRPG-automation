import { test } from '@playwright/test';
import { CharacterPage } from '../pages/CharacterPage';
import { AdventurePage } from '../pages/AdventurePage';

let adventure: AdventurePage;

test.beforeEach(async ({ page }) => {
  const character = new CharacterPage(page);

  await page.goto('/play');
  await character.setCharacterName('Testheld');
  await character.selectBuild('Brigadier');
  await character.clickStart();

  adventure = new AdventurePage(page); 
});

test('Complete adventure tasks', async () => {
  await test.step('Click the button five times', async () => {
    await adventure.clickButtonFiveTimes();
  });

  await test.step('Upload a dummy file', async () => {
    await adventure.uploadDummyFile();
  });

  await test.step('Type the required phrase', async () => {
    await adventure.typeLoremIpsum();
  });

  await test.step('Slide to the maximum value', async () => {
    await adventure.slideToMaximum();
  });

  await test.step('Verify expert level reached', async () => {
    await adventure.expertLevelReached();
  });
});
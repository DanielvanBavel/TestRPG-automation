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

  adventure = new AdventurePage(page); // pas na clickStart
});

test('Voltooi adventure taken', async ({ page }) => {
  await adventure.clickButtonFiveTimes();
  await adventure.uploadDummyFile();
  await adventure.typeLoremIpsum();
  await adventure.slideToRight();

  await adventure.expertLevelReached();
});

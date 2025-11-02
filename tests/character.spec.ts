import { test } from '@playwright/test';
import { CharacterPage } from '../pages/CharacterPage';
import { getRandomCharacter } from './utils/testUtils';

test('Create character with name and build', async ({ page }) => {
    const characterPage = new CharacterPage(page);
    const character     = getRandomCharacter();

    await test.step('Navigate to play', async () => {
        await page.goto('/play');
    });

    await test.step('Enter character name', async () => {
        await characterPage.setCharacterName('Daniël de testkoning');
    });

    await test.step('Select build and start', async () => {
        await characterPage.selectBuild(character);
        await characterPage.clickStart();
    });

    await test.step('Verify character title contains build', async () => {
        await characterPage.expectCharacterTitleToContain("A level 1 " + character.toLowerCase());
    });
});
import { test } from '@playwright/test';
import { CharacterPage } from '../pages/CharacterPage';
import { getRandomCharacter } from './utils/testUtils';

test('Karakter aanmaken met naam en build', async ({ page }) => {
    const characterPage = new CharacterPage(page);

    await page.goto('/play');

    const character = getRandomCharacter();

    await characterPage.setCharacterName('Daniël de testkoning');
    
    //Thief - knight - mage - brigadier
    await characterPage.selectBuild(character); 
    await characterPage.clickStart();
    await characterPage.expectCharacterTitleToContain("A level 1 "+ character.toLowerCase());
});
// tests/e2e-happy-path.spec.ts
import { test, expect } from '@playwright/test';
import { AuthManager } from '../pages/AuthManager';
import { CharacterPage } from '../pages/CharacterPage';
import { AdventurePage } from '../pages/AdventurePage';
import { getRandomUser, getRandomCharacter} from './utils/testUtils';

test.describe('Happy Path E2E', () => {
    test('login → choose character → play adventure → highest level → logout', async ({ page }) => {
    	const authManager = new AuthManager(page);
    	const characterPage = new CharacterPage(page);
    	const adventurePage = new AdventurePage(page);

		const { email, password } = getRandomUser();
		const character = getRandomCharacter();

		await page.goto('/play');

        await test.step('Login', async () => {
			await authManager.loginUser(email, password);
		});

        await test.step('Choose character and start', async () => {
            await characterPage.setCharacterName('E2E Hero');
            await characterPage.selectBuild(character);
            await characterPage.clickStart();
        });

        await test.step('Play adventure and reach highest level', async () => {
			await adventurePage.clickButtonFiveTimes();
			await adventurePage.uploadDummyFile();
			await adventurePage.typeLoremIpsum();
            await adventurePage.slideToMaximum();
			await adventurePage.expertLevelReached();
		});

        await test.step('Logout', async () => {
            await authManager.clickLogoutButton();
            await expect(page.getByTestId('login-button')).toBeVisible();
        });
  });
});
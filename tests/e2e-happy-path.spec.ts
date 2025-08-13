// tests/e2e-happy-path.spec.ts
import { test } from '@playwright/test';
import { AuthManager } from '../pages/AuthManager';
import { CharacterPage } from '../pages/CharacterPage';
import { AdventurePage } from '../pages/AdventurePage';
import { getRandomUser, getRandomCharacter} from './utils/testUtils';

test.describe('Happy Path E2E', () => {
	test('login → character → adventure → highest level → logout', async ({ page }) => {
    	const authManager = new AuthManager(page);
    	const characterPage = new CharacterPage(page);
    	const adventurePage = new AdventurePage(page);

		const { email, password } = getRandomUser();
		const character = getRandomCharacter();

		await page.goto('/play');

		await test.step('Login', async () => {
			await authManager.OpenLoginModal();
			await authManager.setEmail(email);
			await authManager.setPassword(password);
			await authManager.ClickLoginButton();
		});

		await test.step('Character kiezen', async () => {
			await characterPage.setCharacterName('E2E Hero');
			await characterPage.selectBuild(character);   // of random
			await characterPage.clickStart();
		});

		await test.step('Adventure spelen', async () => {
			await adventurePage.clickButtonFiveTimes();
			await adventurePage.uploadDummyFile();
			await adventurePage.typeLoremIpsum();
			await adventurePage.slideToRight(); // jouw definitieve 100%-versie
			await adventurePage.expertLevelReached();
		});

		await test.step('Logout', async () => {
			await authManager.ClickLogoutButton();
		});
  });
});
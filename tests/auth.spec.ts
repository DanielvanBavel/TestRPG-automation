import { test } from '@playwright/test';
import { AuthManager } from '../pages/AuthManager';
import { getRandomUser } from './utils/testUtils';

test('Login', async ({ page }) => {

	const authManager = new AuthManager(page)
	const { email, password } = getRandomUser();
	
	await page.goto('/play');

  	await authManager.OpenLoginModal();
	await authManager.setEmail(email);
	await authManager.setPassword(password);
	await authManager.ClickLoginButton();
});

test('Logout', async ({ page }) => {

	const authManager = new AuthManager(page)
	const { email, password } = getRandomUser();
	
	await page.goto('/play');

  	await authManager.OpenLoginModal();
	await authManager.setEmail(email);
	await authManager.setPassword(password);
	await authManager.ClickLoginButton();

	await authManager.ClickLogoutButton();
});
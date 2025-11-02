import { test, expect } from '@playwright/test';
import { AuthManager } from '../pages/AuthManager';
import { getRandomUser } from './utils/testUtils';

test('Login', async ({ page }) => {
	const authManager = new AuthManager(page)
	const { email, password } = getRandomUser();

	await test.step('Navigate to play', async () => {
		await page.goto('/play');
	});

	await test.step('Login with valid user', async () => {
		await authManager.loginUser(email, password);
	});

	await test.step('Verify logged in state', async () => {
		await expect(page.getByTestId('logout-button')).toBeVisible();
	});
});
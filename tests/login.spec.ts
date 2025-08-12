import { test } from '@playwright/test';
import { LoginModal } from '../pages/LoginModal';
import { getRandomUser } from './utils/testUtils';

// Aanpassen naar of een before-Each of storageState

test('Login', async ({ page }) => {

	const login = new LoginModal(page)
	const { email, password } = getRandomUser();
	
	await page.goto('/play');

  	await login.clickLoginButtonToPopupLoginModal();

	// fill form and submit
	await login.setEmail(email);
	await login.setPassword(password);
	await login.submitLogin();

});
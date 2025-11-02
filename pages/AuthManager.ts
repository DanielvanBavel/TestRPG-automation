import { Page, Locator, expect } from '@playwright/test';

export class AuthManager {
    private readonly loginButton: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly submitButton: Locator;
    private readonly LogoutButton: Locator;

    constructor(page: Page) {
        this.loginButton    = page.getByTestId('login-button');
        this.emailInput     = page.getByRole('textbox', { name: 'email' });
        this.passwordInput  = page.getByLabel('Password');
        this.submitButton   = page.getByRole('button', { name: 'Login' });
        this.LogoutButton   = page.getByTestId('logout-button');
    }

    async loginUser(email: string, password: string) {
        await expect(this.loginButton).toBeVisible();
        await this.loginButton.click();

        await expect(this.emailInput).toBeVisible();
        await this.emailInput.fill(email);

        await expect(this.passwordInput).toBeVisible();
        await this.passwordInput.fill(password);

        await expect(this.submitButton).toBeVisible();
        await this.submitButton.click();

        await expect(this.LogoutButton).toBeVisible();
    }

    async clickLogoutButton() {
        await expect(this.LogoutButton).toBeVisible();
        await this.LogoutButton.click();

        await expect(this.loginButton).toBeVisible();
    }
}
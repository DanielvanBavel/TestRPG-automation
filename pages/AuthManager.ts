import { Page, Locator, expect } from '@playwright/test';

export class AuthManager {
    private loginButton: Locator;
    private emailInput: Locator;
    private passwordInput: Locator;
    private submitButton: Locator;
    private LogoutButton: Locator;

    constructor(page: Page) {
        this.loginButton = page.getByTestId('login-button');
        this.emailInput = page.getByRole('textbox', { name: 'email' });
        this.passwordInput = page.getByLabel('Password');
        this.submitButton = page.getByRole('button', { name: 'Login' });
        this.LogoutButton = page.getByTestId('logout-button');
    }

    async OpenLoginModal() {
        await this.loginButton.click();
    }

    async setEmail(email: string) {
        await expect(this.emailInput).toBeVisible();
        await this.emailInput.fill(email);
    }

    async setPassword(password: string) {
        await expect(this.passwordInput).toBeVisible();
        await this.passwordInput.fill(password);
    }

    async ClickLoginButton() {
        await expect(this.submitButton).toBeVisible();
        await this.submitButton.click();
    }

    async ClickLogoutButton() {
        expect(this.LogoutButton).toBeVisible();
        await this.LogoutButton.click();
    }
}
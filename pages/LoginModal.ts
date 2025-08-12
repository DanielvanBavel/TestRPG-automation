import { Page, expect, Locator } from '@playwright/test'


export class LoginModal {
    private loginButton: Locator;
    private emailInput: Locator;
    private passwordInput: Locator;
    private submitButton: Locator;
    private LogoutButton: Locator;

    constructor(private page: Page) {
        this.loginButton = page.getByTestId('login-button');
        this.emailInput = page.getByRole('textbox', { name: 'email' });
        this.passwordInput = page.getByLabel('Password');
        this.submitButton = page.getByRole('button', { name: 'Login' });
        this.LogoutButton = page.getByTestId('logout-button');
    }

    async clickLoginButtonToPopupLoginModal() {
        await this.loginButton.click();
    }

    async checkEmailFieldVisible(){
        await expect(this.emailInput).toBeVisible();
    }

    async checkPasswordFieldVisible() {
        await expect(this.passwordInput).toBeVisible()
    }

    async checkSubmitButtonVisible() {
        await expect(this.submitButton).toBeVisible()
    }

    async setEmail(email: string) {
        this.checkPasswordFieldVisible();
        await this.emailInput.fill(email)
    }

    async setPassword(password: string) {
        this.checkPasswordFieldVisible();
        await this.passwordInput.fill(password);
    }

    async submitLogin() {
        this.checkSubmitButtonVisible();
        await this.submitButton.click()
    }

    async VerifyLogoutButton() {
        expect(this.LogoutButton).toBeVisible(); 
    }
}
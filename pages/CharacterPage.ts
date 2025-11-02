import { Page, Locator, expect } from '@playwright/test';

export class CharacterPage {
	private readonly nameInput: Locator;
  	private readonly buildDropdownButton : Locator;
  	private readonly startButton: Locator;
  	private readonly characterTitle: Locator;

  	constructor(private readonly page: Page) {
    	this.nameInput 				= page.getByPlaceholder('Galactic space lord');
    	this.buildDropdownButton  	= page.getByRole('combobox');
		this.startButton 			= page.getByRole('button', { name: 'Start!' });
    	this.characterTitle 		= page.locator('text=A level');
  	}

	async setCharacterName(name: string) {
		await expect(this.nameInput).toBeVisible();
    	await this.nameInput.fill(name);
  	}

	async selectBuild(buildValue: string) {
		await expect(this.buildDropdownButton).toBeVisible();
		await this.buildDropdownButton.click();

		await expect(this.page.getByRole('option', { name: buildValue })).toBeVisible();
		await this.page.getByRole('option', { name: buildValue }).click();
  	}

  	async clickStart() {
    	await this.startButton.click();
  	}

  	async expectCharacterTitleToContain(buildName: string) {
    	await expect(this.characterTitle).toContainText(buildName);
  	}
}
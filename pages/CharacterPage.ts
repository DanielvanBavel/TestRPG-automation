import { Page, Locator, expect } from '@playwright/test';

export class CharacterPage {
	private nameInput: Locator;
  	private buildDropdownButton : Locator;
  	private startButton: Locator;
  	private characterTitle: Locator;

  	constructor(private page: Page) {
    	this.nameInput 				= page.getByPlaceholder('Galactic space lord');
    	this.buildDropdownButton  	= page.getByRole('combobox');
		this.startButton 			= page.getByRole('button', { name: 'Start!' });
    	this.characterTitle 		= page.locator('text=A level');
  	}

	async setCharacterName(name: string) {
		await this.nameInput.isVisible();
    	await this.nameInput.fill(name);
  	}

	async selectBuild(buildValue: string) {
		await this.buildDropdownButton.click();

		// Valideer dat dropdown open is obv option visible
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
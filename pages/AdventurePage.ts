import { Page, Locator, expect } from '@playwright/test';
import path from 'node:path';

export class AdventurePage {
	private readonly clickerButton: Locator;
	private readonly uploadInput: Locator;
	private readonly typeInput: Locator;
	private readonly slider: Locator;


  	constructor(private readonly page: Page) {
		this.clickerButton	= page.getByRole('button', {name: 'click me'})
		this.uploadInput 	= page.locator('[data-testid="adventure-uploader"] input[type="file"]');
		this.typeInput 		= page.locator('[data-testid="adventure-typer"] input');
		this.slider 		= page.locator('[data-testid="adventure-slider"] [role="slider"]');
  	}

  	async clickButtonFiveTimes() {
    	for (let i = 0; i < 5; i++) {
      		const button = this.clickerButton;
      		await button.click();
    	}

		await expect(this.page.getByText("Great job! You levelled up")).toBeVisible();
  	}

 	async uploadDummyFile() {
		const filePath = path.resolve(__dirname, '../fixtures/dummy.txt');
		await this.uploadInput.setInputFiles(filePath);
		
		await expect(this.page.getByText("File selected, level up!")).toBeVisible();
	}

	async typeLoremIpsum() {
		await this.typeInput.fill('Lorem Ipsum');
		await expect(this.page.getByText("Dolar sit amet!")).toBeVisible();
	}

	async slideToMaximum() {
		await this.page.locator('.absolute.h-full').click();

		// Validatie: controleer of de waarde nu echt 100 is
		await expect(this.slider).toHaveAttribute('aria-valuenow', '100');

		await expect(this.page.getByText("Slid to the next level!")).toBeVisible();
	}

	async expertLevelReached() {
		await Promise.all([
			expect(this.page.getByText("You've reached the highest level!")).toBeVisible(),
			expect(this.page.getByText("A level 5")).toBeVisible()
		]);
	}
}
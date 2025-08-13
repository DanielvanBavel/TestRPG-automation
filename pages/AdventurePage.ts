import { Page, Locator, expect } from '@playwright/test';
import path from 'path';

export class AdventurePage {
	private uploadInput: Locator;
	private typeInput: Locator;
	private slider: Locator;

  	constructor(private page: Page) {
		this.uploadInput 	= page.locator('[data-testid="adventure-uploader"] input[type="file"]');
		this.typeInput 		= page.locator('[data-testid="adventure-typer"] input');
		this.slider 		= page.locator('[data-testid="adventure-slider"] [role="slider"]');
  	}

  	async clickButtonFiveTimes() {
    	for (let i = 0; i < 5; i++) {
      		const button = this.page.getByRole('button', { name: new RegExp(`click me`, 'i') });
      		await button.click();
    	}		
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

	async slideToRight() {
		const box = await this.slider.boundingBox();
		if (!box) throw new Error('Slider thumb not found');

		const startX = box.x + box.width / 2;
		const startY = box.y + box.height / 2;

		// Sleep het bolletje precies 487 pixels naar rechts
		await this.page.mouse.move(startX, startY);
		await this.page.mouse.down();
		await this.page.mouse.move(startX + 487, startY, { steps: 10 });
		await this.page.mouse.up();

		// Validatie: controleer of de waarde nu echt 100 is
		await expect(this.slider).toHaveAttribute('aria-valuenow', '100');
	}

	async expertLevelReached() {
		await Promise.all([
			expect(this.page.getByText("You've reached the highest level!")).toBeVisible(),
			expect(this.page.getByText("A level 5")).toBeVisible()
		]);
	}
}
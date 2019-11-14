import { browser } from 'protractor';

export class BasePage {
	url: string = `${browser.baseUrl}`;

	public async open(pageName: string): Promise<void> {
		await browser.get(`${this.url}${pageName || ''}`);
	}
}
module.exports = BasePage;

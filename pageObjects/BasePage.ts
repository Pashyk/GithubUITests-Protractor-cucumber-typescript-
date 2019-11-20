import { browser } from 'protractor';

export class BasePage {
	private url: string = `${browser.baseUrl}`;

	public async open(pageName: string): Promise<void> {
		await browser.get(`${this.url}${pageName || ''}`);
	}
}
module.exports = BasePage;

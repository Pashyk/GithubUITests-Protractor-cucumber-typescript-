import { $, ElementFinder } from 'protractor';
const helper = new (require('../utils/helpers'))();
const basePage = new (require('../pageObjects/BasePage'))();

export class LoggedInPage {
	userProfileName: ElementFinder = $('.p-nickname');

	public async successLoginCheck(username: string): Promise<string | undefined> {
		let profileName;
		try {
			await basePage.open(username);
			profileName = await helper.getTextFromElement(this.userProfileName);
		} catch (error) {
			console.log(error);
		}
		return profileName;
	}
}
module.exports = LoggedInPage;

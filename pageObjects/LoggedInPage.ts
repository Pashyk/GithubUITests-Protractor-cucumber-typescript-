import { $, ElementFinder } from 'protractor';
const helper = new (require('../utils/helpers'))();
const basePage = new (require('../pageObjects/BasePage'))();

export class LoggedInPage {
	userProfileName: ElementFinder = $('.p-nickname');
	deleteRepositoryBtn: ElementFinder = $('.Box-row:nth-child(4) [role="button"]');
	deleteConfirmationField: ElementFinder = $('[aria-label*="delete this repository"]');
	deleteConfirmationBtn: ElementFinder = $('li:nth-child(4) button[type="submit"]');

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

	public async deleteRepository(repositoryName: string): Promise<void> {
		const repo = $(`[data-filterable-for="dashboard-repos-filter-left"] [title="${repositoryName}"]`);
		const settingsBtn = $(`[href*="${repositoryName}/settings"]`);
		try {
			await helper.clickOnElement(repo);
			await helper.clickOnElement(settingsBtn);
			await helper.clickOnElement(this.deleteRepositoryBtn);
			await helper.inputText(this.deleteConfirmationField, repositoryName);
			await helper.waitTillClickable(this.deleteConfirmationBtn);
			await helper.clickOnElement(this.deleteConfirmationBtn);
		} catch (error) {
			console.log(error);
		}
	}

	public async checkRepositoryDeletion(repositoryName: string): Promise<boolean | undefined> {
		const repo = $(`[data-filterable-for="dashboard-repos-filter-left"] [title="${repositoryName}"]`);
		let result;
		try {
			result = await repo.isPresent();
		} catch (error) {
			console.log(error);
		}
		return result;
	}
}
module.exports = LoggedInPage;

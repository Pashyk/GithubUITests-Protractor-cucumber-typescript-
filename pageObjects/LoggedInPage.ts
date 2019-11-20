import { $, ElementFinder } from 'protractor';
const helper = new (require('../utils/helpers'))();
const basePage = new (require('../pageObjects/BasePage'))();

class LoggedInPage {
	private userProfileName: ElementFinder = $('.p-nickname');
	private deleteRepositoryBtn: ElementFinder = $('.Box-row:nth-child(4) [role="button"]');
	private deleteConfirmationField: ElementFinder = $('[aria-label*="delete this repository"]');
	private deleteConfirmationBtn: ElementFinder = $('li:nth-child(4) button[type="submit"]');

	private static repoLink(repositoryName: string): ElementFinder {
		return $(`[data-filterable-for="dashboard-repos-filter-left"] [title="${repositoryName}"]`);
	}

	private static repoSettings(repositoryName: string): ElementFinder {
		return $(`[href*="${repositoryName}/settings"]`);
	}

	public async successLoginCheck(username: string): Promise<string | undefined> {
		let profileName;
		try {
			await basePage.open(username);
			profileName = await helper.getTextFromElement(this.userProfileName);
			if (profileName === username) console.log(`User "${username}" logged in successfully`);
		} catch (error) {
			console.log(error, `\nLogin as user '${username}' was unsuccessful`);
		}
		return profileName;
	}

	public async deleteRepository(repositoryName: string): Promise<void> {
		try {
			await helper.clickOnElement(LoggedInPage.repoLink(repositoryName));
			await helper.clickOnElement(LoggedInPage.repoSettings(repositoryName));
			await helper.clickOnElement(this.deleteRepositoryBtn);
			await helper.inputText(this.deleteConfirmationField, repositoryName);
			await helper.waitTillClickable(this.deleteConfirmationBtn);
			await helper.clickOnElement(this.deleteConfirmationBtn);
		} catch (error) {
			console.log(error, `\nCan't delete repository "${repositoryName}"`);
		}
	}

	public async checkRepositoryDeletion(repositoryName: string): Promise<boolean> {
		const status = await LoggedInPage.repoLink(repositoryName).isPresent();
		status
			? console.log(`Repository "${repositoryName}" was not deleted`)
			: console.log(`Repository "${repositoryName}" successfully deleted`);
		return status;
	}
}
module.exports = LoggedInPage;

import { $, ElementFinder } from 'protractor';
const helper = new (require('../utils/helpers'))();
const basePage = new (require('../pageObjects/BasePage'))();

export class RepositoryPage {
	page: string = 'new';
	repositoryNameField: ElementFinder = $('#repository_name');
	readmeInitCheckbox: ElementFinder = $('#repository_auto_init');
	createRepositoryButton: ElementFinder = $('#new_repository button[type="submit"]');
	readmeFile: ElementFinder = $('tbody [title="README.md"]');

	public async create(repositoryName: string): Promise<void> {
		try {
			await basePage.open(this.page);
			await helper.inputText(this.repositoryNameField, repositoryName);
			await helper.clickOnElement(this.readmeInitCheckbox);
			await helper.waitTillClickable(this.createRepositoryButton);
			await helper.clickOnElement(this.createRepositoryButton);
			await console.log(`Repository "${repositoryName}" was created`);
		} catch (error) {
			console.log(error, `\nRepository ${repositoryName} was not created`);
		}
	}

	public async readmeFilePresence(): Promise<Boolean> {
		const status = await this.readmeFile.isPresent();
		status ? console.log(`File "README.MD" was created`) : console.log('File "README.MD" was not created');
		return status;
	}
}
module.exports = RepositoryPage;

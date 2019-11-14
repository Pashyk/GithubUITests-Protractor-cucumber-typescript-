import { $, ElementFinder } from 'protractor';
const helper = new (require('../utils/helpers'))();
const basePage = new (require('../pageObjects/BasePage'))();

export class RepositoryPage {
	page: string = 'new';
	repositoryName: ElementFinder = $('#repository_name');
	readmeInitCheckbox: ElementFinder = $('#repository_auto_init');
	createRepositoryButton: ElementFinder = $('#new_repository button[type="submit"]');
	readmeFile: ElementFinder = $('tbody [title="README.md"]');

	public async create(info: string): Promise<void> {
		try {
			await basePage.open(this.page);
			await helper.inputText(this.repositoryName, info);
			await helper.clickOnElement(this.readmeInitCheckbox);
			await helper.waitTillClickable(this.createRepositoryButton);
			await helper.clickOnElement(this.createRepositoryButton);
		} catch (error) {
			console.log(error);
		}
	}

	public async readmeFilePresence(): Promise<Boolean> {
		return this.readmeFile.isPresent();
	}
}
module.exports = RepositoryPage;

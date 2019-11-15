import { Given, When, Then } from 'cucumber';
import { expect } from 'chai';

const helper = new (require('../utils/helpers'))();
const basePage = new (require('../pageObjects/BasePage'))();
const productionPage = new (require('../pageObjects/LoggedInPage'))();
const repository = new (require('../pageObjects/RepositoryPage'))();

Given('I open web-page', () => basePage.open());
When('I enter e-mail {string} and password {string}', async (email, pass) => await helper.login(email, pass));
Then('I see username {string} on the page', async username => {
	const profileName = await productionPage.successLoginCheck(username);
	expect(profileName).to.equal(username);
});

When('I create new repository {string}', async repoName => repository.create(repoName));
Then('I check readme.md file was created', async () => {
	const readmePresence = await repository.readmeFilePresence();
	expect(readmePresence).to.be.true;
});

When('I delete repository {string}', async repo => productionPage.deleteRepository(repo));
Then('I check repository {string} was deleted', async repo => {
	const repoPresence = await productionPage.checkRepositoryDeletion(repo);
	expect(repoPresence).to.be.false;
});

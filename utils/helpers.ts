import { $, browser, ElementFinder, ExpectedConditions as EC } from 'protractor';
const basePage = new (require('../pageObjects/BasePage'))();

export class Helpers {
	password: ElementFinder = $('#password');
	email: ElementFinder = $('#login_field');
	singIn: ElementFinder = $('input[type="submit"]');

	public async clickOnElement(element: ElementFinder, timeout: number = 10000): Promise<void> {
		try {
			await this.waitForElement(element, timeout);
		} catch (error) {
			console.log(error);
		}
		return element.click();
	}

	public async getTextFromElement(element: ElementFinder): Promise<string | undefined | void> {
		let text;
		try {
			text = await element.getText();
		} catch (error) {
			console.log(error);
		}
		return text;
	}

	public async inputText(element: ElementFinder, text: string, timeout: number = 10000): Promise<void> {
		try {
			this.waitForElement(element, timeout);
		} catch (error) {
			console.log(error);
		}
		return element.sendKeys(text);
	}

	public async login(email: string, password: string): Promise<void> {
		try {
			await basePage.open('login');
			await this.inputText(this.email, email);
			await this.inputText(this.password, password);
		} catch (error) {
			console.log(error);
		}
		return this.clickOnElement(this.singIn);
	}

	public async waitTillClickable(element: ElementFinder, timeout: number = 10000): Promise<ElementFinder> {
		try {
			await browser.wait(EC.elementToBeClickable(element), timeout);
		} catch (error) {
			console.log(error);
		}
		return element;
	}

	public async waitForElement(element: ElementFinder, timeout: number = 10000): Promise<ElementFinder> {
		try {
			await browser.wait(EC.visibilityOf(element), timeout);
		} catch (error) {
			console.log(error);
		}
		return element;
	}
}

module.exports = Helpers;

import { $, browser, ElementFinder, ExpectedConditions as EC } from 'protractor';
const basePage = new (require('../pageObjects/BasePage'))();

export class Helpers {
	private password: ElementFinder = $('#password');
	private email: ElementFinder = $('#login_field');
	private singIn: ElementFinder = $('input[type="submit"]');

	public async clickOnElement(element: ElementFinder, timeout: number = 10000): Promise<void> {
		try {
			await this.waitForElement(element, timeout);
			await element.click();
		} catch (error) {
			console.log(error, `Can't find an element ${element}`);
		}
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
			await this.waitForElement(element, timeout);
			await element.sendKeys(text);
		} catch (error) {
			console.log(error);
		}
	}

	public async login(email: string, password: string): Promise<void> {
		try {
			await basePage.open('login');
			await this.inputText(this.email, email);
			await this.inputText(this.password, password);
			await this.clickOnElement(this.singIn);
		} catch (error) {
			console.log(error);
		}
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

import { browser, Config } from 'protractor';

export const config: Config = {
	baseUrl: 'https://github.com/',
	capabilities: {
		browserName: 'chrome',
		chromeOptions: {
			args: ['--no-sandbox', '--headless'],
		},
	},
	cucumberOpts: {
		require: ['./steps/*.js'],
	},
	SELENIUM_PROMISE_MANAGER: false,
	waitForAngularEnabled: false,
	framework: 'custom',
	frameworkPath: require.resolve('protractor-cucumber-framework'),
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['../features/*.feature'],
	async onPrepare() {
		await browser.waitForAngularEnabled(false);
	},
};

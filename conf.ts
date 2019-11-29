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
		format: ['json:.tmp/results.json'],
		require: ['./steps/*.js', './features/support/*.js'],
	},
	plugins: [{
		package: 'protractor-multiple-cucumber-html-reporter-plugin',
		options:{
			automaticallyGenerateReport: true,
			removeExistingJsonReportFile: true,
			displayDuration:true,
			displayLog:true,
			removeOriginalJsonReportFile: true
		}
	}],
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

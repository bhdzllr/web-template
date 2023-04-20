// import { addServiceWorker } from './lib/utils/service-worker';
import { default as langStrings } from './lang.json';
import { getRootLocale, getLangStrings } from './lib/utils/i18n';
import { AnalyticsOptOut, addAnalyticsCode } from './lib/modules/Analytics';

document.addEventListener('DOMContentLoaded', async function (e) {

	const locale = getRootLocale();
	const i18n = getLangStrings(locale, langStrings);

	// addServiceWorker('/sw.js');

	if (document.querySelector('.js-analytics-opt-out')) {
		new AnalyticsOptOut({
			button: document.querySelector('.js-analytics-opt-out'),
			i18n,
		});	
	}

	addAnalyticsCode(function () {
		// Analytics Code to inject
		// Don't forget to make global variables available because of uglify, e. g. with:
		// window['_paq'] = _paq;
	});

});

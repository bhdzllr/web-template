// import { addServiceWorker } from './lib/utils/service-worker';
import { AnalyticsOptOut, addAnalyticsCode } from './lib/modules/Analytics.js';

document.addEventListener('DOMContentLoaded', async function (e) {

	document.documentElement.classList.add('js');

	// addServiceWorker('/sw.js');

	if (document.querySelector('.js-analytics-opt-out')) {
		new AnalyticsOptOut(document.querySelector('.js-analytics-opt-out'));
	}

	addAnalyticsCode(function () {
		// Analytics Code to inject
		// Don't forget to make global variables available because of uglify, e. g. with:
		// window['_paq'] = _paq;
		//
		// loadScript('https://www.bhdzllr.com/js/main-analytics.js?t=202408012200', 'js-minilytics', () => {
		// 	Minilytics.initOptOutButton();
		// }, {
		// 	async: false,
		// 	defer: false,
		// 	'data-url': 'https://www.bhdzllr.com/server/api.php',
		// 	'data-id': 'siteId',
		// });
	});

});

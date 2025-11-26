import { addAnalyticsCode, initAnalyticsOptOut } from './lib/modules/Analytics.js';

document.addEventListener('DOMContentLoaded', async function (e) {

	document.documentElement.classList.add('js');

	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function () {
			navigator.serviceWorker.register('/sw.js');
		});
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

	initAnalyticsOptOut(document.querySelector('.js-analytics-opt-out'));

});

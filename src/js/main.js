import { default as de } from './lang/de.json';

import I18n from './lib/I18n';
import { AnalyticsOptOut, addAnalyticsCode } from './lib/Analytics';
// import { loadFonts } from './lib/font-loading';
import {
	lazyLoadImages,
	addOutlineHandler,
	addRoleButtonListener,
	beautifyFileInputs,
} from './lib/utils';

document.addEventListener('DOMContentLoaded', function (e) {

	const currentLang = document.documentElement.getAttribute('lang') ? document.documentElement.getAttribute('lang') : 'en';
	const i18n = new I18n(currentLang, de);

	// addServiceWorker('/sw.js');
	// loadFonts([
	// 	{ 'Font Name': { weight: 400 } },
	// 	{ 'Font Name': { weight: 700 } },
	// ]);
	lazyLoadImages();
	addOutlineHandler();
	addRoleButtonListener();
	beautifyFileInputs(i18n);

	if (document.querySelector('.js-analytics-opt-out')) {
		new AnalyticsOptOut(document.querySelector('.js-analytics-opt-out'), i18n);	
	}

	addAnalyticsCode(function () {
		// Analytics Code to inject
		// Don't forget to make global variables available because of uglify, e. g. with:
		// window['_paq'] = _paq;
	});

});

import I18n from './I18n';
import { default as de } from './lang/de.json';
import Elevator from './Elevator';
import AnalyticsOptOut from './AnalyticsOptOut';
import { lazyLoadImages, addOutlineHandler, addRoleButtonListener, beautifyFileInputs, addAnalyticsCode, isFormValid } from './utils';

// import 'es6-promise';
// import FontFaceObserver from 'fontfaceobserver-es'; // Also import ES6 promise

document.addEventListener('DOMContentLoaded', function (e) {

	const currentLang = document.documentElement.getAttribute('lang') ? document.documentElement.getAttribute('lang') : 'en';
	const i18n = new I18n(currentLang, {
		'de': de
	});

	// addServiceWorker('/sw.js');
	// loadFonts([
	// 	{ 'WebFontName': { weight: 400, style: 'normal' } },
	// ]);
	lazyLoadImages();
	addOutlineHandler();
	addRoleButtonListener();
	beautifyFileInputs(i18n);

	if (document.querySelector('.js-scroll-top')) {
		new Elevator(document.querySelector('.js-scroll-top'));
	}

	if (document.querySelector('.js-analytics-opt-out')) {
		new AnalyticsOptOut(document.querySelector('.js-analytics-opt-out'), i18n);	
	}

	addAnalyticsCode(function () {
		// Analytics Code to inject
	});

});

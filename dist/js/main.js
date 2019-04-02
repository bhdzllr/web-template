/**
 * Main module
 *
 * Basic interface functions.
 */
var NAMESPACE = NAMESPACE || {};
NAMESPACE.Main = (function () {
	'use strict';

	/** Private */

	

	/**
	 * Prepare DOM.
	 * Hide and show different containers at startup.
	 */
	function initDOM() {
		/** FOIT */
		var fontPrimary = new FontFaceObserver('Font Family', {
			weight: 300,
			style: 'normal'
		});
		fontPrimary.load().then(function () {
			document.documentElement.className += ' fonts-loaded';
		});
	}

	/**
	 * Setup up event listeners.
	 */
	function initListeners() {
		document.querySelector('.js-scroll-top').addEventListener('click', scrollToTop, false);
	}

	/**
	 * Scroll page to top.
	 *
	 * @param {Object} Event object
	 */
	function scrollToTop(e) {
		e.preventDefault();

		window.scrollTo(0, 0);
	}

	/** Public */
	
	return {
		/**
		 * Initialize.
		 * Call DOM preparation and call event listener setup.
		 */
		init: function () {
			initDOM();
			initListeners();
		}
	}
})();

/**
 * Startup
 */
document.addEventListener('DOMContentLoaded', function (e) {
	NAMESPACE.Main.init();
});

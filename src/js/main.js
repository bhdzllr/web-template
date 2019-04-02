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

	//removeIf(production) 
	/**
	 * Title (optional)
	 *
	 * Description.
	 *
	 * @author  Author (http://example.com/)
	 * @see     {@link http://example.com/}
	 * @todo    todo
	 *
	 * @param {Object} name Description.
	 * @param {Array}  name Description.
	 * @param {string} name Description.
	 * @param {number} name Description.
	 *
	 * @returns {boolean} Description.
	 *
	 * @deprecated
	 */
	function exampleComments() {
		// code ...
	}
	//EndRemoveIf(production) 

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

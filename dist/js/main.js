/**
 * Main module
 *
 * Basic interface functions.
 *
 * @author       bhdzllr
 * @link         http://github.com/bhdzllr
 * @copyright    (c) 2015
 * @license	     -
 * @dependencies jQuery
 * @version      1.0.0
 * @todo         -
 */
var NAMESPACE = NAMESPACE || {};
NAMESPACE.Main = (function($) {
	'use strict';
	
	/** Private */

	/**
	 * Prepare DOM.
	 * Hide and show different containers at startup.
	 */
	function initDOM() {
		/** FOUC */
		$('html').removeClass('no-js');

		/** FOIT */
		var observer = new FontFaceObserver('Font Family');
		observer.check().then(function () {
			document.documentElement.className += ' js-fonts-loaded';
		});
	}

	/**
	 * Setup up event listeners.
	 */
	function initListeners() {
		// $('[href="#site-header"]').click(scrollToTop);
	}

	/**
	 * Scroll page to top.
	 *
	 * @returns {Boolean} False (prevent default event)
	 */
	function scrollToTop() {
		var body = $('html, body');

		body.animate({
			scrollTop: 0
		}, '500', 'swing');

		return false;
	}

	/** Public */
	
	return {
		/**
		 * Initialize.
		 * Call DOM preparation and call event listener setup.
		 */
		init: function() {
			initDOM();
			initListeners();
		}
	}
}(jQuery));

/**
 * On document ready ...
 */
$(function() {
	NAMESPACE.Main.init();
});

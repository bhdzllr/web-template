"use strict";

/**
 * Main module
 *
 * Basic interface functions.
 *
 * @author       bhdzllr
 * @link         http://github.com/bhdzllr
 * @copyright    (c) 2016
 * @license	     -
 * @dependencies jQuery
 * @version      1.0.0
 * @todo         -
 */
var NAMESPACE = NAMESPACE || {};
NAMESPACE.Main = (function ($) {
	/** Private */

	

	/**
	 * Prepare DOM.
	 * Hide and show different containers at startup.
	 */
	function initDOM() {
		/** FOIT */
		var observer = new FontFaceObserver('Font Family');
		observer.load().then(function () {
			document.documentElement.className += ' js-fonts-loaded';
		});
	}

	/**
	 * Setup up event listeners.
	 */
	function initListeners() {
		$('.js-scroll-top').click(scrollToTop);
		$('[href="#site-header"]').click(scrollToTop);
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
	 * @param   {Object}  name Description
	 * @param   {Array}   name Description
	 * @param   {string}  name Description
	 * @param   {number}  name Description
	 *
	 * @returns {boolean} Description
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

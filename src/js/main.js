/**
 * File description
 *
 * @author       bhdzllr
 * @link         http://example.com/
 * @copyright    (c) JJJJ
 * @license	     license
 * @dependencies Lib, Lib
 * @version      1.0
 * @todo         text
 */

/**
 * Main module
 *
 * Basic interface functions
 *
 * @dependencies Lib, Lib
 * @version      1.0
 * @todo         text
 */
var NAMESPACE = NAMESPACE || {};
NAMESPACE.Main = (function($) {
	'use strict';
	
	/** Private */

	var x        = 0;      // Window x width
	var xBound   = 850;    // Bound for x
	var xElement = '#nav'; // Selector for element to hide/show

	/**
	 * Prepare DOM
	 * Hide and show different containers at startup
	 */
	function initDOM() {
		$('html').removeClass('no-js');
	}

	/**
	 * Setup up event listeners
	 */
	function initListeners() {
		$(window).resize(resizeFallback);
		$('[href="#site-header"]').click(scrollToTop);
	}

	/**
	 * Fallback, if window gets resized
	 */
	function resizeFallback() {
		x = jQ(window).width();

		if (x > xBound) {
			jQ(xElement).show();
		}	
	}

	/**
	 * Scroll page to top
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

	/**
	 * Description
	 *
	 * @author  Bergi (http://stackoverflow.com/users/1048572/bergi)
	 * @see     {@link http://stackoverflow.com/questions/15298912/javascript-generating-combinations-from-n-arrays-with-m-elements}
	 * @todo    todo
	 *
	 * @param   {Object}  name Description
	 * @param   {Array}   name Description
	 * @param   {string}  name Description
	 * @param   {number}  name Description
	 * @returns {boolean}      Description
	 *
	 * @deprecated
	 */
	function exampleComments() {
		// code ...
	}

	/** Public */
	
	return {
		/**
		 * Initialize
		 * Call DOM preparation and call event listener setup
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

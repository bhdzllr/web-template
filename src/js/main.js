//removeIf(production) 
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
//EndRemoveIf(production) 

/**
 * Main module
 *
 * Basic interface functions
 *
 * @author       bhdzllr
 * @link         http://github.com/bhdzllr
 * @copyright    (c) 2015
 * @license	     -
 * @dependencies jQuery
 * @version      1.0
 * @todo         -
 */
var NAMESPACE = NAMESPACE || {};
NAMESPACE.Main = (function($) {
	'use strict';
	
	/** Private */

	//removeIf(production) 
	var x        = 0;      // Window x width
	var xBound   = 850;    // Bound for x
	var xElement = '#nav'; // Selector for element to hide/show
	//EndRemoveIf(production) 

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
		//removeIf(production) 
		$(window).resize(resizeFallback);
		$('[href="#site-header"]').click(scrollToTop);
		//EndRemoveIf(production) 
		// $('[href="#site-header"]').click(scrollToTop);
	}

	//removeIf(production) 
	/**
	 * Fallback, if window gets resized
	 */
	function resizeFallback() {
		x = $(window).width();

		if (x > xBound) {
			$(xElement).show();
		}	
	}
	//EndRemoveIf(production) 

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

	//removeIf(production) 
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
	//EndRemoveIf(production) 

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

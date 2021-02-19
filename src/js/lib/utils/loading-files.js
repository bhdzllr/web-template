/**
 * Style loading
 */
export function loadStyle(href, media = 'all', id) {
	if (id && document.querySelector(`#${id}`)) return;

	const style = document.createElement('link');

	style.rel = 'stylesheet';
	style.href = href;
	style.media = media;

	document.getElementByTagNAme('head')[0].appendChild(style);
}

/**
 * Script loading global object with "LazyScripts" namespace.
 */
window.LazyScripts = {
	/**
	 * Script loading callback Stack.
	 * Object with "id" and "callback".
	 */
	scriptCallbackStack: [],
	/**
	 * Switch to know if callback stack has been executed.
	 * If the script is already on the page and a class need it later
	 * the callback should be executed therefore we need to know if the
	 * callbacks from the stack have been executed.
	 */
	hasScriptCallbackStackBeenExecuted: false,
};
/**
 * Load a JavaScript file
 *
 * The callback stack is used to collect all callback functions
 * and call it at the same time to avoid callbacks too early.
 * Example: Creating three PoiMap Objects on the same page. Every Object tries to load Leaflet
 * but because of the used ID Leaflet is included only once (multiple Leaflet scripts would not make sense).
 * But every PoiMap needs to know when Leaflet is ready, therefore all callbacks are collected and called after
 * the load event of the script.
 *
 * @param {string} src Path to script
 * @param {string} id (Optional) ID for the script to prevent multiple scripts.
 * @param {Function} onLoadCallback (Optional) Required "id" parameter. Callack when script is loaded.
 */
export function loadScript(src, id, onLoadCallback) {
	if (id && document.querySelector(`#${id}`)) {
		if (onLoadCallback && !window.LazyScripts.hasScriptCallbackStackBeenExecuted) {
			window.LazyScripts.scriptCallbackStack.push({
				id: id,
				callback: onLoadCallback
			});
		} else if (onLoadCallback) {
			onLoadCallback();
		}

		return;
	}

	const script = document.createElement('script');

	script.src = src;
	script.async = true;
	script.defer = true;
	if (id) script.id = id;

	script.addEventListener('load', function () {
		if (id && onLoadCallback) {
			window.LazyScripts.scriptCallbackStack.push({
				id: id,
				callback: onLoadCallback
			});
		}

		if (window.LazyScripts.scriptCallbackStack.length) {
			for (const callbackObject of window.LazyScripts.scriptCallbackStack) {
				if (callbackObject.id == this.id) {
					callbackObject.callback();
				}
			}

			window.LazyScripts.hasScriptCallbackStackBeenExecuted = true;
		} else {
			if (onLoadCallback) onLoadCallback();
		}
	});

	document.body.appendChild(script);
}

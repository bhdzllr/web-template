export function checkJS() {
	document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/, 'js');
}

export function addServiceWorker(file) {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function () {
			navigator.serviceWorker.register(file);
		});
	}
}

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

export function lazyLoadImages(className = 'js-lazy-image', rootMargin = '-50px') {
	const images = document.querySelectorAll('.' + className);

	// Fallback for loading all images
	const fallback = function (images) {
		for (let i = 0; i < images.length; i++) {
			const image = images[i];

			if (image.dataset.src) image.src = image.dataset.src;
			if (image.dataset.srcset) image.srcset = image.dataset.srcset;
		}
	};

	// Loading if printing
	let isPrinting = false;
	const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	if (!isSafari) {
		window.onbeforeprint = function() {
			isPrinting = true;
			fallback(images);
		};
	} else {
		window.matchMedia('print').addListener(() => {
			isPrinting = true;
			fallback(images);
		});
	}
	if (isPrinting) return;

	// Lazy Loading
	if (
		'IntersectionObserver' in window
		&& 'IntersectionObserverEntry' in window
		&& 'intersectionRatio' in (window).IntersectionObserverEntry.prototype
		&& 'isIntersecting' in (window).IntersectionObserverEntry.prototype
	) {
		const intersectionObserver = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					const image = entry.target;

					intersectionObserver.unobserve(image);

					if (image.dataset.src) image.src = image.dataset.src;
					if (image.dataset.srcset) image.srcset = image.dataset.srcset;

					image.classList.remove(className);
				}
			});
		}, { rootMargin: rootMargin });

		for (let i = 0; i < images.length; i++) {
			intersectionObserver.observe(images[i]);
		}
	} else {
		// Fallback, just load all images
		fallback(images);
	}
}

export function addOutlineHandler(className = 'is-tabbing') {
	document.addEventListener('mousedown', function () {
		document.documentElement.classList.remove(className);
	});

	document.addEventListener('keydown', function (e) {
		if (e.keyCode !== 9) return;

		document.documentElement.classList.add(className);
	});
}

export function addRoleButtonListener() {
	let buttons = document.querySelectorAll('[role="button"]');

	for (let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('keydown', function (e) {
			if (e.keyCode === 13 || e.keyCode === 32) {
				e.preventDefault();
				buttons[i].click();
			}
		});
	}
}

export function beautifyFileInputs(i18n) {
	const fileInputs = document.querySelectorAll('[type="file"]');

	for (let i = 0; i < fileInputs.length; i++) {
		const caption = document.createElement('span');
		const label = document.createElement('label');

		caption.textContent = fileInputs[i].hasAttribute('multiple') ? i18n.get('files.choose', 'Choose files ...') : i18n.get('file.choose', 'Choose file ...'); 
		caption.style.cssText = `
			vertical-align: middle;

			display: inline-block;
			width: calc(100% - 100px - 2em);
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		`;
	
		label.setAttribute('for', fileInputs[i].id);
		label.setAttribute('role', 'button');
		label.setAttribute('data-caption-button', i18n.get('file.browse', 'Browse'));
		label.appendChild(caption);

		fileInputs[i].parentElement.appendChild(label);

		fileInputs[i].addEventListener('change', function (e) {
			let captionText;

			if (this.files && this.files.length == 1) {
				captionText = this.files[0].name;
			} else if (this.files && this.files.length > 1)  {
				captionText = this.files.length + ' ' + i18n.get('files.selected', 'Files selected');
			} else {
				captionText = e.target.value.split( '\\' ).pop();
			}

			caption.textContent = captionText;
		});
	}
}

export function addAnalyticsCode(codeCallback) {
	const doNotTrack = (navigator.doNotTrack && (navigator.doNotTrack == '1' || navigator.doNotTrack == 'yes')) || (window.doNotTrack && (window.doNotTrack == '1')) || (navigator.msDoNotTrack && (navigator.msDoNotTrack == '1'));
	const disableStr = 'disable-analytics';

	if (doNotTrack || document.cookie.indexOf(disableStr + '=true') > -1 || document.cookie.indexOf(disableStr + '=true') > -1) {
		window[disableStr] = true;
	} else {
		codeCallback();
	}
}

export function disableAnalytics() {
	const disableStr = 'disable-analytics';

	document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
	window[disableStr] = true;
}

export function isFocusable(element) {
	if (element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) return true;

	if (element.disabled) return false;

	switch (element.nodeName) {
		case 'A':
			return !!element.href && element.rel != 'ignore';
		case 'INPUT':
			return element.type != 'hidden' && element.type != 'file';
		case 'BUTTON':
		case 'SELECT':
		case 'TEXTAREA':
			return true;
		default:
			return false;
	}
}

export function loadClosestPolyfill() {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	if (!Element.prototype.closest) {
		Element.prototype.closest = function(s) {
			var el = this;

			do {
				if (Element.prototype.matches.call(el, s)) return el;
				el = el.parentElement || el.parentNode;
			} while (el !== null && el.nodeType === 1);

			return null;
		};
	}
}

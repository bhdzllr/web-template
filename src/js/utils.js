export function checkJS() {
	document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/, 'js');
}

export function lazyLoadImages(className = 'js-lazy-image', rootMargin = '300px') {
	const images = document.querySelectorAll('.' + className);

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
		for (let i = 0; i < images.length; i++) {
			const image = images[i];

			if (image.dataset.src) image.src = image.dataset.src;
			if (image.dataset.srcset) image.srcset = image.dataset.srcset;
		}
	}
}

export function isFormValid(form, classNameValidated = 'form-validated') {
	if (form.checkValidity() === true) return true;

	form.classList.add(classNameValidated);

	return false
}

export function addAnalyticsCode(codeCallback) {
	var doNotTrack = (navigator.doNotTrack && (navigator.doNotTrack == '1' || navigator.doNotTrack == 'yes')) || (window.doNotTrack && (window.doNotTrack == '1')) || (navigator.msDoNotTrack && (navigator.msDoNotTrack == '1'));
	var disableStr = 'disable-analytics';

	if (doNotTrack || document.cookie.indexOf(disableStr + '=true') > -1 || document.cookie.indexOf(disableStr + '=true') > -1) {
		window[disableStr] = true;
	} else {
		codeCallback();
	}
}

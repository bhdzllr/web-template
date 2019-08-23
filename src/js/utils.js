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

		caption.textContent = fileInputs[i].hasAttribute('multiple') ? i18n.get('files.choose', 'Choose files ...') : i18n.get('file.choose', 'Choose file ...');  // @todo i18n / multiple
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

// Don't forget using "novalidate" attribute on form that is validated manually
export function isFormValid(form, classNameValidated = 'form--validated') {
	if (typeof document.createElement('input').checkValidity == 'function') {
		if (form.checkValidity() === true) return true;

		form.classList.add(classNameValidated);

		return false;
	}

	return true; // Return true if browser doesn't support `checkValidty()`, we need to check on server anyway. 
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

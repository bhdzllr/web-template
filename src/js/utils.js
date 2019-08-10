export function checkJS() {
	document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/, 'js');
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

export function isFormValid(form, validatedClass = 'form-validated') {
	if (form.checkValidity() === true) return true;

	form.classList.add(validatedClass);

	return false
}

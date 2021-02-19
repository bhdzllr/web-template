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

export default class AnalyticsOptOut {

	constructor(button, i18n) {
		this.button = button;
		this.i18n = i18n;

		this.init();
	}

	init(e) {
		const doNotTrack = (navigator.doNotTrack && (navigator.doNotTrack == '1' || navigator.doNotTrack == 'yes')) || (window.doNotTrack && (window.doNotTrack == '1')) || (navigator.msDoNotTrack && (navigator.msDoNotTrack == '1'));
		const gaProperty = 'UA-131811899-1';
		const gaDisableStr = 'ga-disable-' + gaProperty;
		const fbDisableStr = 'fb-disable';

		if (doNotTrack || document.cookie.indexOf(gaDisableStr + '=true') > -1 || document.cookie.indexOf(fbDisableStr + '=true') > -1) {
			window[gaDisableStr] = true;
			window[fbDisableStr] = true;
			this.button.disabled = true;
			this.button.textContent = this.i18n.get('analyticsOptOut.alreadyDeactivated', 'Analysis already disabled');
		} else {
			this.button.addEventListener('click', () => {
				document.cookie = gaDisableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
				document.cookie = fbDisableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
				window[gaDisableStr] = true;
				window[fbDisableStr] = true;
				this.button.disabled = true;
				this.button.textContent = this.i18n.get('analyticsOptOut.alreadyDeactivated', 'Analysis already disabled');
				alert(this.i18n.get('analyticsOptOut.deactivated', 'Tracking has been disabled in this browser for this site.'));
			}, false);
		}
	}

}

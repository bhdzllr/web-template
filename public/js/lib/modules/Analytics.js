export const doNotTrack = (navigator.doNotTrack && (navigator.doNotTrack == '1' || navigator.doNotTrack == 'yes')) || (window.doNotTrack && (window.doNotTrack == '1')) || (navigator.msDoNotTrack && (navigator.msDoNotTrack == '1'));

export class AnalyticsOptOut {

	constructor({
		button,
		i18n = {
			'analytics.deactivated.now': 'Tracking has been disabled in this browser for this site.',
			'analytics.deactivated.already': 'Analysis already disabled',
		},
		disableString = 'disable-analytics'
	} = {}) {
		this.button = button;
		this.i18n = i18n;
		this.disableString = disableString;

		this.init();
	}

	init() {
		if (doNotTrack || document.cookie.indexOf(this.disableString + '=true') > -1) {
			window[this.disableString] = true;

			this.button.disabled = true;
			this.button.textContent = this.i18n['analytics.deactivated.already'];
			this.button.setAttribute('aria-pressed', 'true');
		} else {
			this.button.disabled = false;
			this.button.setAttribute('aria-pressed', 'false');
			this.button.addEventListener('click', () => {
				disableAnalytics(this.disableString);

				this.button.disabled = true;
				this.button.textContent = this.i18n['analytics.deactivated.already'];

				alert(this.i18n['analytics.deactivated.now']);
			}, false);
		}
	}

}

export function addAnalyticsCode(codeCallback, disableString = 'disable-analytics') {
	if (doNotTrack || document.cookie.indexOf(disableString + '=true') > -1) {
		window[disableString] = true;
	} else {
		codeCallback();
	}
}

export function disableAnalytics(disableString = 'disable-analytics') {
	document.cookie = disableString + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
	window[disableString] = true;
}

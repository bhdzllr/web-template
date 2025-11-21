/**
 * Analytics Opt Out
 * 
 * This class helps to initialize the analytics opt out button.
 * 
 * @example
 * <button
 * 	class="js-analytics-opt-out"
 * 	data-text-disable="Disable Analytics"
 * 	data-text-disable-alert="Tracking has been disabled in this browser for this site."
 * 	data-text-disabled="Analysis already disabled"
 * 	disabled
 * >
 * 	Analyse bereits deaktiviert
 * </button>
 * <script>
 * 	AnalyticsOptOut.disableString = 'disable-analytics'; // Optional
 * 	new AnalyticsOptOut(document.querySelector('.js-analytics-opt-out'));
 * </script>
 */
export class AnalyticsOptOut {

	static disableString = 'disable-analytics';

	#button;

	constructor(button) {
		this.#button = button;

		this.#initDom();
		this.#initListeners();
	}

	#initDom() {
		if (isOptOutActive()) {
			window[AnalyticsOptOut.disableString] = true;

			this.#button.disabled = true;
			this.#button.textContent = this.#button.dataset.textDisabled;
			this.#button.setAttribute('aria-pressed', 'true');
		} else {
			this.#button.disabled = false;
			this.#button.textContent = this.#button.dataset.textDisable;
			this.#button.setAttribute('aria-pressed', 'false');
		}
	}

	#initListeners() {
		if (isOptOutActive()) return;

		this.#button.addEventListener('click', () => {
			disableAnalytics();

			this.#button.disabled = true;
			this.#button.textContent = this.#button.dataset.textDisabled;

			alert(this.#button.dataset.textDisableAlert);
		}, false);
}

}

export function isDoNotTrackActive() {
	return (
		navigator.doNotTrack && (navigator.doNotTrack == '1' || navigator.doNotTrack == 'yes')
	) || (
		window.doNotTrack && (window.doNotTrack == '1')
	) || (
		navigator.msDoNotTrack && (navigator.msDoNotTrack == '1')
	);
}

export function isOptOutActive() {
	return isDoNotTrackActive()
		|| window[AnalyticsOptOut.disableString] === true
		|| document.cookie.includes(`${AnalyticsOptOut.disableString}=true`);
}

export function addAnalyticsCode(codeCallback) {
	if (isOptOutActive()) {
		window[AnalyticsOptOut.disableString] = true;
	} else {
		codeCallback();
	}
}

export function disableAnalytics() {
	window[AnalyticsOptOut.disableString] = true;
	document.cookie = AnalyticsOptOut.disableString + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/; SameSite=Lax; Secure';
}

export function getRootLocale() {
	return document.documentElement.getAttribute('lang') ? document.documentElement.getAttribute('lang') : 'en';
}

export function findLocale(element, fallbackLocale = 'en') {
	const closestElement = element.closest('[lang]');
	if (closestElement) return closestElement.lang
	if (document.body.lang) return document.body.lang;
	if (document.documentElement.lang) return document.documentElement.lang;

	return fallbackLocale;
}

/**
 * Create i18n lang string array.
 * 
 * @example
 * import langStrings from './lang.js';
 * 
 * const locale = getRootLocale();
 * const i18n = getLangStrings(locale, langStrings);
 * console.log(i18n['general.close']);
 */
export function getLangStrings(locale, langStrings) {
	if (langStrings[locale]) return langStrings[locale];
}

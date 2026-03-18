/**
 * Get locale form root lang attribute.
 * 
 * @example
 * import langStrings from './lang.js';
 * 
 * const locale = getRootLocale();
 * const i18n = langStrings[locale] ?? {};
 * console.log(i18n['general.close']);
 */
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

export function getI18nData(element, attributeName = 'message') {
	const lowerFirst = text => text.charAt(0).toLowerCase() + text.slice(1);
	const messages = {};
	for (const name in element.dataset) {
		if (name.startsWith(attributeName)) {
			const key = name.replace(attributeName, '');
			messages[lowerFirst(key)] = element.dataset[name];
		}
	}
	return messages;
}

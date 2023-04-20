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

export function getLangStrings(locale, langStrings) {
	if (langStrings[locale]) return langStrings[locale];
}

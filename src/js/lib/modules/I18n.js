export class I18n {
	
	constructor(currentLang = 'en', langStrings) {
		this.currentLang = currentLang;
		this.langStrings = {};
		this.langStrings[currentLang] = langStrings;
		this.prefix;
	}

	setLang(lang) {
		this.currentLang = lang;
	}

	getLang() {
		return this.currentLang;
	}

	setPrefix(prefix) {
		this.prefix = prefix;
	}

	getPrefix() {
		return this.prefix;
	}

	add(lang, langStrings) {
		if (!this.langStrings[lang]) this.langStrings[lang] = {};

		Object.assign(this.langStrings[lang], langStrings);
	}

	get(langString, fallbackString = null, ...values) {
		const langStringPrefixed = this.prefix ? this.prefix + langString : langString;
		let output;

		if (!this.langStrings[this.currentLang]) {
			output = this.getFallbackString(langStringPrefixed, fallbackString);
		} else if (!this.langStrings[this.currentLang][langStringPrefixed]) {
			output = this.getFallbackString(langStringPrefixed, fallbackString);
		} else {
			output = this.langStrings[this.currentLang][langStringPrefixed];
		}

		if (values && values.length) {
			values.forEach((value, i) => {
				output = output.replace(`{}`, value);
			});
		}

		return output;
	}

	getStrings() {
		return this.langStrings;
	}

	getFallbackString(langString, fallbackString) {
		if (!fallbackString) return langString;
		return fallbackString;
	}

}

export function findLocale(element, fallbackLocale = 'en') {
	const closestElement = element.closest('[lang]');
	if (closestElement) return closestElement.lang
	if (document.body.lang) return document.body.lang;
	if (document.documentElement.lang) return document.documentElement.lang;

	return fallbackLocale;
}

export default class I18n {
	
	constructor(currentLang = 'en', langStrings) {
		this.currentLang = currentLang;
		this.langStrings = langStrings;
	}

	get(langString, fallbackString = null) {
		if (!this.langStrings[this.currentLang]) return this.getFallbackString(langString, fallbackString);
		if (!this.langStrings[this.currentLang][langString]) return this.getFallbackString(langString, fallbackString);

		return this.langStrings[this.currentLang][langString];
	}

	getFallbackString(langString, fallbackString) {
		if (!fallbackString) return langString;
		return fallbackString;
	}

}

export function checkJavaScriptSupport() {
	document.documentElement.classList.add('js');
}

export function hasModuleSupport() {
	return ('supports' in HTMLScriptElement)
		? HTMLScriptElement.supports('module')
		: ('noModule' in document.createElement('script'));
}

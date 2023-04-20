export function checkJavaScriptSupport() {
	document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/, 'js');
}

export function hasModuleSupport() {
	return ('supports' in HTMLScriptElement)
		? HTMLScriptElement.supports('module')
		: ('noModule' in document.createElement('script'));
}

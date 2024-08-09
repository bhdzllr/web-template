export function addRoleButtonListener(exceptions = []) {
	let buttons = document.querySelectorAll('[role="button"]');

	for (let i = 0; i < buttons.length; i++) {
		if (exceptions.indexOf(buttons[i].nodeName.toLowerCase()) > -1) continue;

		buttons[i].addEventListener('keydown', function (e) {
			const keyCode = e.which || e.keyCode;

			if (keyCode === 13 || keyCode === 32) {
				e.preventDefault();
				buttons[i].click();
			}
		});
	}
}

export function isFocusable(element) {
	if (element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) return true;

	if (element.disabled) return false;

	switch (element.nodeName) {
		case 'A':
			return !!element.href && element.rel != 'ignore';
		case 'INPUT':
			return element.type != 'hidden' && element.type != 'file';
		case 'BUTTON':
		case 'SELECT':
		case 'TEXTAREA':
			return true;
		default:
			return false;
	}
}

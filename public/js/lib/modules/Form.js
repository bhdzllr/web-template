/**
 * Helper class to set or get form values and manually validate form.
 * Manual validation needs `novalidate` on form element.
 */
export class Form {

	static classNameValidated = 'form--validated';

	#formElement;
	#submittedCallback;
	#initialClassList;
	
	constructor(formElement, submittedCallback) {
		this.#formElement = formElement;
		this.#submittedCallback = submittedCallback;
		this.#initialClassList = formElement.classList;

		this.#initListeners();
	}

	#initListeners() {
		this.#formElement.addEventListener('submit', (e) => {
			e.preventDefault();

			if (this.isValid()) {
				this.#submittedCallback();
			}
		});
	}

	setValues(values) {
		for (let key in values) {
			if (this.#formElement.querySelector(`[name="${key}"]`)) {
				this.#formElement.querySelector(`[name="${key}"]`).value = values[key];
			}
		}
	}

	getValues() {
		const formControls = this.#formElement.querySelectorAll('input, textarea, select');
		const values = [];

		for (let i = 0; i < formControls.length; i++) {
			const control = formControls[i];
			if (!control.name) continue;

			switch (control.getAttribute('type')) {
				case 'checkbox':
				case 'radio':
					if (control.checked) values.push({ name: encodeURIComponent(control.name), value: encodeURIComponent(control.value) });
					break;
				case 'file':
					break;
				default:
					if (control.nodeName == 'SELECT' && control.type == 'select-multiple') {
						for (let j = 0; j < control.options.length; j++) {
							if (control.options[j].selected) {
								values.push({ name: encodeURIComponent(control.name), value: encodeURIComponent(control.options[j].value) });
							}
						}
					} else {
						values.push({ name: encodeURIComponent(control.name), value: encodeURIComponent(control.value) });
					}
			}
		}

		return values;
	}

	serialize() {
		const values = [];

		this.getValues().forEach(function (c) {
			if (c.name.trim()) {
				values.push(c.name + '=' + c.value);
			}
		})

		return values.join('&');
	}

	isValid() {
		this.#formElement.classList.add(Form.classNameValidated);
		return this.#formElement.checkValidity() === true;
	}

	reset() {
		this.#formElement.reset();
		this.#formElement.classList = this.#initialClassList;
	}

}

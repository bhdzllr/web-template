export function beautifyFileInputs(i18n, selector = '[type="file"]') {
	if (!document.querySelector('#js-file-styles')) {
		const style = document.createElement('style');
		style.id = 'js-file-styles';

		style.innerHTML = `
			[type="file"] {
				position: absolute;

				display: inline-block;
				width: 100%;
				height: 0.1px;

				opacity: 0.00001;
			}

			[type="file"] + label {
				position: relative;

				display: inline-block;
				width: 300px;
				padding: 0 0.25em;
				box-sizing: border-box;

				border: 1px solid #999999;
				border-radius: 3px;
				cursor: pointer;

				color: #595959;
			}

			[type="file"] + label::after {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;

				content: attr(data-caption-button) '';
				display: inline-block;
				width: auto;
				max-width: 100px;
				margin: 0;
				padding: 0 0.5em;

				background-color: #e5e5e5;
				border-radius: 0;

				color: #000000;
				text-align: center;
			}

			[type="file"]:focus + label {
				outline: 1px dotted #000000;
			}

			[type="file"]:disabled + label {
				cursor: not-allowed;
			}
		`;

		document.head.appendChild(style);
	}

	const fileInputs = document.querySelectorAll(selector);

	for (let i = 0; i < fileInputs.length; i++) {
		const caption = document.createElement('span');
		caption.textContent = fileInputs[i].hasAttribute('multiple') ? i18n.get('files.choose', 'Choose files ...') : i18n.get('file.choose', 'Choose file ...'); 

		const label = document.createElement('label');
		label.setAttribute('for', fileInputs[i].id);
		label.setAttribute('role', 'button');
		label.setAttribute('data-caption-button', i18n.get('file.browse', 'Browse'));
		label.appendChild(caption);

		fileInputs[i].parentElement.appendChild(label);

		fileInputs[i].addEventListener('change', function (e) {
			let captionText;

			if (this.files && this.files.length == 1) {
				captionText = this.files[0].name;
			} else if (this.files && this.files.length > 1)  {
				captionText = this.files.length + ' ' + i18n.get('files.selected', 'Files selected');
			} else {
				captionText = e.target.value.split( '\\' ).pop();
			}

			caption.textContent = captionText;
		});
	}
}

export function beautifyFileInputs(i18n) {
	const fileInputs = document.querySelectorAll('[type="file"]');

	for (let i = 0; i < fileInputs.length; i++) {
		const caption = document.createElement('span');
		const label = document.createElement('label');

		caption.textContent = fileInputs[i].hasAttribute('multiple') ? i18n.get('files.choose', 'Choose files ...') : i18n.get('file.choose', 'Choose file ...'); 
		caption.style.cssText = `
			vertical-align: middle;

			display: inline-block;
			width: calc(100% - 100px - 2em);
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		`;
	
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

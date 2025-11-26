const initialStyles = {
	documentElement: {
		overflow: null,
		scrollbarGutter: null,
	},
	body: {
		overflow: null,
	},
};

function deactivateBodyScroll() {
	initialStyles.documentElement.overflow = document.documentElement.style.overflow;
	initialStyles.documentElement.scrollbarGutter = document.documentElement.style.scrollbarGutter;
	initialStyles.body.overflow = document.body.style.overflow;

	const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
	const hasScrollbar = document.body.scrollHeight > viewportHeight;
	if (hasScrollbar) document.documentElement.style.scrollbarGutter = 'stable';
	document.body.style.overflow = 'hidden';
}

function activateBodyScroll() {
	document.documentElement.style.overflow = initialStyles.documentElement.overflow || 'initial';
	document.documentElement.style.scrollbarGutter = initialStyles.documentElement.scrollbarGutter || 'initial';
	document.body.style.overflow = initialStyles.body.overflow || 'initial';
}

/**
 * Dialog Modal Helper to easily create modal dialogs.
 * 
 * The `initDialogs()` functions looks for dialogs with data attribute
 * "trigger" and uses the value as selector to initialize the trigger.
 * 
 * @example
 * <dialog closedby="any" aria-labelledby="id" data-trigger="[href='#dialog-1']">
 * 	<h1 id="id">Dialog Title</h1>
 * 	<form method="dialog">
 * 		<button autofocus>Close</button>
 * 	</form>
 * 	<div>
 * 		<p>Content</p>
 * 	</div>
 * </dialog>
 * <script>
 * 	initDialogsModal();
 * </script>
 */
export function initDialogsModal() {
	const dialogs = document.querySelectorAll('dialog[data-trigger]');
	dialogs.forEach(function (dialog) {
		const trigger = document.querySelector(dialog.dataset.trigger);
		if (trigger) {
			trigger.addEventListener('click', function (e) {
				e.preventDefault();
				deactivateBodyScroll();
				dialog.showModal();
			});
		} else {
			console.warn('Trigger for dialog not found.', dialog);
		}

		dialog.addEventListener('close', function () {
			activateBodyScroll();
		});
	})
}

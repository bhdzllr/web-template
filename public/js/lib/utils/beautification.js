export function addRangeSlidersProgressIndicator(selector = '.form [type="range"]') {
	if (!document.querySelector('#js-range-slider-styles')) {
		const style = document.createElement('style');

		style.id = 'js-range-slider-styles';

		style.innerHTML = `
			${selector} {
				--slider-progress: 0%;
				--slider-color-track: linear-gradient(to right, var(--color-primary) var(--slider-progress, 0%), var(--color-mono-30) var(--slider-progress, 0%));
			}

			${selector}:disabled {
				--slider-color-track: linear-gradient(to right, var(--color-mono-60) var(--slider-progress, 0%), var(--color-mono-30) var(--slider-progress, 0%));
			}
		`;

		document.head.appendChild(style);
	}

	const updateSliderProgress = function (slider, output) {
		const min = slider.min || 0;
		const max = slider.max || 100;
		const value = slider.value;
		const progress = ((value - min) / (max - min)) * 100;

		output.textContent = value;

		slider.style.setProperty('--slider-progress', progress + '%');
	} 

	const sliders = document.querySelectorAll(selector);
	sliders.forEach(function (slider) {
		const output = slider.parentElement.querySelector('output');
		updateSliderProgress(slider, output);

		slider.addEventListener('input', () => {
			updateSliderProgress(slider, output);
		});
	})
}

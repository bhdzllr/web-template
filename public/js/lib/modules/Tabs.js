const template = document.createElement('template');
template.innerHTML = `
	<style>
		:host {
			display: block;
		}

		:host([hidden]) {
			display: none;
		}
	</style>
	<div class="tabs">
		<div class="js-tablist" role="tablist">
			<slot id="tab" name="tab" class="js-tab"></slot>
		</div>

		<slot id="tabpanel" name="tabpanel" class="js-tabpanel"></slot>
	</div>
`;

export class Tabs extends HTMLElement {

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		this.tabList = this.shadowRoot.querySelector('.js-tablist');
		this.tabsSlot = this.shadowRoot.querySelector('.js-tab');
		this.tabPanelsSlot = this.shadowRoot.querySelector('.js-tabpanel');

		this.observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.attributeName === 'selected') {
					this.selectTab(mutation.target.dataset.index);
				}
			});
		});
	}

	connectedCallback() {
		if (!this.hasAttribute('wa-aria-label') && !this.hasAttribute('aria-labelledby')) {
			console.warn('[Tabs] No "wa-aria-label" or "aria-labelledby" attribute set to use for "aria-label".');
		}

		if (this.hasAttribute('wa-aria-label')) {
			this.tabList.setAttribute('aria-label', this.getAttribute('wa-aria-label'));
		}

		this.onSlotChangeHandler = this.onSlotChange.bind(this);
		this.onKeyDownHandler = this.onKeyDown.bind(this);

		this.tabsSlot.addEventListener('slotchange', this.onSlotChangeHandler);
		this.tabPanelsSlot.addEventListener('slotchange', this.onSlotChangeHandler);

		this.addEventListener('keydown', this.onKeyDownHandler);

		this.startSelectedObserver();
	}

	disconnectedCallback() {
		this.removeEventListener('keydown', this.onKeyDownHandler);

		this.stopSelectedObserver();
	}

	onSlotChange(e) {
		this.stopSelectedObserver();

		const tabs = this.getTabs();
		const tabPanels = this.getTabPanels();
		let isATabSelected = false;

		for (const [i, tab] of tabs.entries()) {
			let isTabSelected = tab.hasAttribute('selected') ? true : false;
			let tabId = tab.id ? tab.id : 'bhdzllr-tabs-tab-' + i;

			tab.hidden = false;
			tab.setAttribute('id', tabId);
			tab.setAttribute('role', 'tab');
			tab.setAttribute('aria-selected', `${isTabSelected}`);
			if (!tab.hasAttribute('aria-controls')) tab.setAttribute('aria-controls', 'bhdzllr-tabs-panel-' + i);
			tab.setAttribute('tabindex', `${isTabSelected ? '0' : '-1'}`);
			tab.dataset.index = i;
			tab.addEventListener('click', this.onTabClick);

			if (isTabSelected) {
				isATabSelected = true;
			}

			if (!tabPanels[i]) {
				console.warn('[Tabs] There are more tabs defined than panels.');
				break;
			}

			const tabPanel = tabPanels[i];
			tabPanel.setAttribute('id', tab.getAttribute('aria-controls'));
			tabPanel.setAttribute('role', 'tabpanel');
			tabPanel.setAttribute('aria-labelledby', tab.id);
			tabPanel.setAttribute('tabindex', '0');
			tabPanel.hidden = !isTabSelected;
		}

		if (!isATabSelected) {
			this.selectTab(0, false);
		}

		this.startSelectedObserver();
	}

	onKeyDown(e) {
		if (e.altKey) return;
		if (e.key === 'Tab') return;
		if (e.target.getAttribute('role') !== 'tab') return;

		const tabs = this.getTabs();
		let currentTab = 0;
		let newTab = 0;

		for (const [i, tab] of tabs.entries()) {
			if (tab.hasAttribute('selected')) {
				currentTab = i;
			}
		}

		switch (e.key) {
			case 'ArrowLeft':
			case 'ArrowUp':
				newTab = currentTab - 1;
				break;
			case 'ArrowRight':
			case 'ArrowDown':
				newTab = currentTab + 1;
				break;
			case 'Home':
				break;
			case 'End':
				newTab = tabs.length - 1;
				break;
			default:
				return;
		}

		if (newTab < 0) {
			newTab = tabs.length - 1;
		}

		if (newTab > (tabs.length - 1)) {
			newTab = 0;
		}

		this.selectTab(newTab);
	}

	onTabClick(e) {
		e.preventDefault();
		this.setAttribute('selected', '');
	}

	startSelectedObserver() {
		for (const tab of this.getTabs()) {
			this.observer.observe(tab, {
				attributes: true,
			});
		}
	}

	stopSelectedObserver() {
		this.observer.disconnect();
	}

	selectTab(index, withFocus = true) {
		const tabs = this.getTabs();
		const tabPanels = this.getTabPanels();

		this.stopSelectedObserver();

		for (const [i, tab] of tabs.entries()) {
			if (i != index) {
				tab.setAttribute('aria-selected', 'false');
				tab.setAttribute('tabindex', '-1');

				if (tab.hasAttribute('selected')) {
					tab.removeAttribute('selected');
				}

				continue;
			}

			tab.setAttribute('aria-selected', 'true');
			tab.setAttribute('tabindex', '0');

			if (!tab.hasAttribute('selected')) {
				tab.setAttribute('selected', '');
			}

			if (withFocus) {
				tab.focus();
			}
		}

		for (const [i, tabPanel] of tabPanels.entries()) {
			if (i != index) {
				tabPanel.hidden = true;
				continue;
			}

			tabPanel.hidden = false;
		}

		this.dispatchEvent(
			new CustomEvent('bhdzllr-tabs-selected', {
				bubbles: false,
				detail: {
					index: Number(index),
				},
			}),
		);

		this.startSelectedObserver();
	}

	getTabs() {
		return this.tabsSlot.assignedNodes();
	}

	getTabPanels() {
		return this.tabPanelsSlot.assignedNodes();
	}

}

customElements.define('bhdzllr-tabs', Tabs);

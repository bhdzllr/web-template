const KEYCODE = {
	TAB: 9,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39,
	UP: 38,
	HOME: 36,
	END: 35,
};

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

class Tabs extends HTMLElement {

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
		if (!this.hasAttribute('wa-aria-label')) console.warn('[Tabs] No "wa-aria-label" attribute set to use for "aria-label".');

		if (this.hasAttribute('wa-aria-label')) this.tabList.setAttribute('aria-label', this.getAttribute('wa-aria-label'));
	
		this.onSlotChangeHandler = this.onSlotChange.bind(this);
		this.onKeyDownHandler = this.onKeyDown.bind(this);

		this.tabsSlot.addEventListener('slotchange', this.onSlotChangeHandler);
		this.tabPanelsSlot.addEventListener('slotchange', this.onSlotChangeHandler);

		for (const [i, tab] of this.getTabs().entries()) {
			tab.addEventListener('click', (e) => {
				e.preventDefault();
				e.target.setAttribute('selected', '');
			});
		}

		this.addEventListener('keydown', this.onKeyDownHandler);

		this.startSelectedObserver();
	}

	disconnectedCallback() {
		this.removeEventListener('keydown', this.onKeyDownHandler);

		this.stopSelectedObserver();
	}

	onSlotChange(e) {
		const tabs = this.getTabs();
		const tabPanels = this.getTabPanels();
		let isATabSelected = false;

		for (const [i, tab] of tabs.entries()) {
			let isTabSelected = tab.hasAttribute('selected') ? true : false;
			let tabId = tab.id ? tab.id : 'bhdzllr-tabs-tab-' + i;

			tab.setAttribute('id', tabId);
			tab.setAttribute('role', 'tab');
			tab.setAttribute('aria-selected', `${isTabSelected}`);
			if (!tab.hasAttribute('aria-controls')) tab.setAttribute('aria-controls', 'bhdzllr-tabs-panel-' + i);
			tab.setAttribute('tabindex', `${isTabSelected ? '0' : '-1'}`);
			tab.dataset.index = i;

			if (isTabSelected) isATabSelected = true;

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
			this.selectTab(0);
		}
	}

	onKeyDown(e) {
		const keyCode = e.which || e.keyCode;

		if (e.altKey) return;
		if (keyCode == KEYCODE.TAB) return;
		if (e.target.getAttribute('role') !== 'tab') return;

		const tabs = this.getTabs();
		let currentTab = 0;
		let newTab = 0;

		for (const [i, tab] of tabs.entries()) {
			if (tab.hasAttribute('selected')) currentTab = i;
		}

		switch (keyCode) {
			case KEYCODE.LEFT:
			case KEYCODE.UP:
				newTab = currentTab - 1;
				break;
			case KEYCODE.RIGHT:
			case KEYCODE.DOWN:
				newTab = currentTab + 1;
				break;
			case KEYCODE.HOME:
				break;
			case KEYCODE.END: 
				newTab = tabs.length - 1;
			default:
				return;
		}

		if (newTab < 0) newTab = tabs.length - 1;
		if (newTab > (tabs.length - 1)) newTab = 0;

		this.selectTab(newTab);
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

	selectTab(index) {
		const tabs = this.getTabs();
		const tabPanels = this.getTabPanels();

		this.stopSelectedObserver();

		for (const [i, tab] of tabs.entries()) {
			if (i != index) {
				tab.setAttribute('aria-selected', 'false');
				tab.setAttribute('tabindex', '-1');
				if (tab.hasAttribute('selected')) tab.removeAttribute('selected');
				continue;
			}

			tab.setAttribute('aria-selected', 'true');
			tab.setAttribute('tabindex', '0');
			if (!tab.hasAttribute('selected')) tab.setAttribute('selected', '');

			tab.focus();
		}

      	for (const [i, tabPanel] of tabPanels.entries()) {
      		if (i != index) {
      			tabPanel.hidden = true;
      			continue;
      		}

      		tabPanel.hidden = false;
      	}

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

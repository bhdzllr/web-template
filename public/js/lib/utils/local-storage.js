/**
 * Adapter/Wrapper for easy local storage access
 */
export const localStorageAdapter = {

	set(key, value) {
		const insertValue = (value !== null && typeof value === 'object')
			? JSON.stringify(value)
			: value;

		localStorage.setItem(key, insertValue);
	},

	get(key) {
		const item = localStorage.getItem(key);
		if (item === null) return null;

		try {
			return JSON.parse(item);
		} catch (e) {
			return item;
		}
	},

	remove(key) {
		localStorage.removeItem(key);
	},

	push(key, value) {
		const current = this.get(key);

		if (!current) {
			current = [];
		} else if (!Array.isArray(current)) {
			throw new Error(`Can't push, [${key}] is not an array.`);
		}

		current.push(value);
		this.set(key, current);
	},

	splice(key, index, splice = 1) {
		const current = this.get(key);

		if (!Array.isArray(current)) {
			throw new Error(`Can't splice, [${key}] is not an array.`);
		}

		current.splice(index, splice);
		this.set(key, current);
	},

};

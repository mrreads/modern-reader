import Settings from './settings'

const Store = require('electron-store');

export default class RootStore {
	store = new Store();

	constructor() {
		this.settings = new Settings(this, this.store.get('settings'));
		//this.storage = window.localStorage;
	}
}
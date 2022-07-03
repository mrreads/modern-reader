import Settings from './settings';
import Library from './library';

const Store = require('electron-store');

export default class RootStore {
	store = new Store();

	constructor() {
		this.settings = new Settings(this, this.store.get('settings'));
		this.library = new Library(this, this.store.get('library'));
		//this.storage = window.localStorage;
	}
}
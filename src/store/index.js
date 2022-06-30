import Settings from './settings'

export default class RootStore {
	constructor() {
		this.settings = new Settings(this);
		//this.storage = window.localStorage;
	}
}
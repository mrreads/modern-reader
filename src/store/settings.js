import { makeAutoObservable } from 'mobx';
import i18next from "@/i18n";

const Store = require('electron-store');

export default class Setting {
	store = new Store();

	language = 'en'
	systemTitlebar = false;

	constructor(rootStore, object){
		makeAutoObservable(this);
		this.rootStore = rootStore;

		if (object !== undefined)
		{
			this.language = (object.language) ? object.language : this.language;
			this.systemTitlebar = (object.systemTitlebar) ? object.systemTitlebar : this.systemTitlebar;
		}

		i18next.changeLanguage(this.language);
	}

	changeLanguage = (lang) => {
		this.language = lang;
        i18next.changeLanguage(lang);

		this.saveSettings();
    }

	changeSystemTitlebar = (bool) => {
		this.systemTitlebar = bool;

		this.saveSettings();
	}

	saveSettings = () => {
		let settingsObject = {
			"language": this.language,
			"systemTitlebar": this.systemTitlebar
		}
		this.store.set('settings', settingsObject);
	}
}
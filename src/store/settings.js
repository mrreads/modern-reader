import { makeAutoObservable } from 'mobx';
import i18next from "@/i18n";

export default class Setting {
	language = 'en'
	systemTitlebar = false;

	constructor(rootStore){
		makeAutoObservable(this);
		this.rootStore = rootStore;

		i18next.changeLanguage(this.language);
	}

	changeLanguage = (lang) => {
		this.language = lang;
        i18next.changeLanguage(lang);
    }

	changeSystemTitlebar = (bool) => {
		console.log(bool)
		this.systemTitlebar = bool;
	}
}
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import languageEN from './locale/en-translation.json';
import languageRU from './locale/ru-translation.json';

import { getLanguage } from './../hooks/settingHooks';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: getLanguage(),

    resources: {
        en: languageEN,
        ru: languageRU
    },

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
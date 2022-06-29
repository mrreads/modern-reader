import i18next from "@/i18n";

import Select from '@/components/Select/Select';

const LanguageSelect = () => {

    const languages = [
        { name: "English", value: "en" },
        { name: "Русский", value: "ru" }
    ]

    const changeLanguage = (lang) => {
        i18next.changeLanguage(lang);
    }

    return (<Select defaltValue={languages[0]} data={languages} callback={changeLanguage} />)
}

export default LanguageSelect;
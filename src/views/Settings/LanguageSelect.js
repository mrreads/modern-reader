import Select from '@/components/Select';

const LanguageSelect = ({ startupLanguage, changeLanguage }) => {
    const languages = [
        { name: "English", value: "en" },
        { name: "Русский", value: "ru" }
    ]

    const handleLanguage = (lang) => {
        changeLanguage(lang);
    }

    return (<Select defaltValue={startupLanguage} data={languages} callback={handleLanguage} />)
}

export default LanguageSelect;
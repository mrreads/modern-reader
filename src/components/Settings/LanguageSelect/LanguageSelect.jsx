import React, { useState } from 'react';
import { Dropdown } from 'rsuite';

import i18next from "./../../../localization/i18n";

export default function(props)
{  
    const [getLanguage, setLanguage] = useState(
    {
        locale: i18next.language,
        name: i18next.getDataByLanguage(i18next.language).locale
    });

    const options = 
    [
        { value: 'en', label: 'English' },
        { value: 'ru', label: 'Русский' },
    ];
    

    const changeLanguage = (lang) =>
    {
        let languageInfo = 
        {
            locale: lang,
            name: i18next.getDataByLanguage(lang).locale
        }
        setLanguage(languageInfo);
        i18next.changeLanguage(lang);
    }

    return (
    <Dropdown title={ getLanguage.name }>
        { options.map((lang, i) => <Dropdown.Item eventKey={ lang.value } key={i} onSelect ={ changeLanguage } > { lang.label } </Dropdown.Item> ) }
    </Dropdown>);
}
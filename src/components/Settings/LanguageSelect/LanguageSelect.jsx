import React, { useState } from 'react';
import { SelectPicker } from 'rsuite';

import i18next from "./../../../localization/i18n";

const fs = window.require('fs');
const userPath = require('./../../../storage').userPath;

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

        let settings = {...props.getSetting };

        settings.language = lang;

        fs.writeFileSync(userPath.settings, JSON.stringify(settings));
    }

    return (
        <SelectPicker data={ options } defaultValue={ getLanguage.locale } searchable={ false } cleanable={ false } onSelect ={ changeLanguage } style={{ width: 300 }} />);
}
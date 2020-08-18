import React from 'react';
import LanguageSelect from './LanguageSelect/LanguageSelect';

import { useTranslation } from 'react-i18next';

export default function(props)
{
    const { t } = useTranslation('settings');

    return (
    <div id="content" className="settings">
        <div className="title">
            <p> { t('settings') } </p>
        </div>
        <hr/>

        <div className="setting">
            <p> { t('language') }:  </p>
            <LanguageSelect getSetting={ props.settings.getSetting } />
        </div>
    </div>);
}
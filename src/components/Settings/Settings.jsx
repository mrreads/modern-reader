import React from 'react';
import LanguageSelect from './LanguageSelect/LanguageSelect';
import DarkMode from './DarkMode/DarkMode';

import { Divider } from 'rsuite';

import { useTranslation } from 'react-i18next';

export default function(props)
{
    const { t } = useTranslation('settings');

    return (
    <div id="content">
        <div className="title">
            <h4> { t('settings') } </h4>
        </div>
        <Divider />
        
        <div className="settings">

            <div className="setting darkMode">
                <p> { t('darkMode') }:  </p>
                <DarkMode settings={ props.settings } />
            </div>

            <div className="setting">
                <p> { t('language') }:  </p>
                <LanguageSelect getSetting={ props.settings.getSetting } />
            </div>

        </div>
    </div>);
}
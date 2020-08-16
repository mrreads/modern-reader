import React from 'react';

import { useTranslation } from 'react-i18next';

export default function()
{
    const { t } = useTranslation('settings');

    return (
    <div id="content" className="settings">
        <div className="title">
            <p> { t('settings') } </p>
        </div>
        <hr/>
    </div>);
}
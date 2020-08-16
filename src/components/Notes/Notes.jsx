import React from 'react';

import { useTranslation } from 'react-i18next';

export default function()
{
    const { t } = useTranslation('notes');

    return (
    <div id="content" className="notes">
        <div className="title">
            <p> { t('notes') } </p>
        </div>
        <hr/>
    </div>);
}
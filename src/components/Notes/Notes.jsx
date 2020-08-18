import React from 'react';


import { Divider } from 'rsuite';

import { useTranslation } from 'react-i18next';

export default function()
{
    const { t } = useTranslation('notes');

    return (
    <div id="content" className="notes">
        <div className="title">
            <h4> { t('notes') } </h4>
        </div>
        <Divider />
    </div>);
}
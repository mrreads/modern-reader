import React from 'react';
import Note from './Note/Note';

import { Divider } from 'rsuite';

import { useTranslation } from 'react-i18next';

export default function(props)
{
    const { t } = useTranslation('notes');

    return (
    <div id="content">
        <div className="title">
            <h4> { t('notes') } </h4>
        </div>
        <Divider />
        { props.notes.getNotes.map((note, i) => <Note data={ note } key={i} /> ) }
    </div>);
}
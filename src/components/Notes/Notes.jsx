import React from 'react';
import Note from './Note/Note';

import { Divider, Alert } from 'rsuite';

import { useTranslation } from 'react-i18next';

const fs = window.require('fs');
const userPath = require('./../../storage').userPath;

export default function(props)
{
    const { t } = useTranslation('notes');

    const deleteNote = (e, text) =>
    {
        let allNotes = [...props.notes.getNotes];
        let forDelete = text;
        let newNotes = allNotes.filter(note => note !== forDelete);
        fs.writeFileSync(userPath.notes, JSON.stringify(newNotes));
        props.notes.setNotes(newNotes);
        Alert.info(t('delete'));
    }

    return (
    <div id="content">
        <div className="title">
            <h4> { t('notes') } </h4>
        </div>
        <Divider />
        <div className="notes">
            { props.notes.getNotes.map((note, i) => <Note delete={ deleteNote } data={ note } key={i} /> ) }
        </div>
    </div>);
}
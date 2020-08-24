import { useState } from 'react';

const fs = window.require('fs');
const userPath = require('./../storage').userPath;

export default function()
{
    const [getSelectedStatus, setSelectedStatus] = useState(false);

    const [getNotes, setNotes] = useState(JSON.parse(fs.readFileSync(userPath.notes, 'utf8')));

    return ({
        getSelectedStatus: getSelectedStatus,
        setSelectedStatus: setSelectedStatus,

        getNotes: getNotes,
        setNotes: setNotes,
    });
}
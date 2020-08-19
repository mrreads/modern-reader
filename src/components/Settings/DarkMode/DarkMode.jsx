import React from 'react';
import { Toggle } from 'rsuite';

const fs = window.require('fs');
const userPath = require('./../../../storage').userPath;

export default function(props)
{
    const changeTheme = (value) =>
    {
        props.settings.setDarkMode(value);

        let settings = {...props.settings.getSetting};
        settings.darkMode = value;
        fs.writeFileSync(userPath.settings, JSON.stringify(settings));
    }

    return (<Toggle defaultChecked={ props.settings.getDarkMode } onChange={ changeTheme } />);
}
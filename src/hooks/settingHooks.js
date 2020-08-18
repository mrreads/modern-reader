import { useState } from 'react';

const fs = window.require('fs');
const userPath = require('./../storage').userPath;

export default function()
{
    const [getSettingWindowStatus, setSettingWindowStatus] = useState(false);

    const [getSetting, setSetting] = useState(JSON.parse(fs.readFileSync(userPath.settings, 'utf8')));

    const [getPadding, setPadding] = useState(getSetting.padding);
    const [getFontSize, setFontSize] = useState(getSetting.fontSize);
    const [getLineHeight, setLineHeight] = useState(getSetting.lineHeight);

    const [getDarkMode, setDarkMode] = useState(getSetting.darkMode);


    return({
        getSettingWindowStatus: getSettingWindowStatus,
        setSettingWindowStatus: setSettingWindowStatus,

        getSetting: getSetting,
        setSetting: setSetting,

        getPadding: getPadding,
        setPadding: setPadding,

        getFontSize: getFontSize,
        setFontSize: setFontSize,

        getLineHeight: getLineHeight,
        setLineHeight: setLineHeight,

        getDarkMode: getDarkMode,
        setDarkMode: setDarkMode,
    });
}


export function getLanguage()
{
    const language = JSON.parse(fs.readFileSync(userPath.settings, 'utf8')).language;
    return language;
}
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

    const [getTheme, setTheme] = useState(getSetting.theme);

    let getStyles = { padding: getPadding, fontSize: getFontSize, lineHeight: getLineHeight, theme: getTheme };
    let setStyles = { padding: setPadding, fontSize: setFontSize, lineHeight: setLineHeight, theme: setTheme };

    if (getTheme === 'light')
    {
        document.documentElement.style.setProperty("--theme-main-color", "rgb(255, 255, 255)");
        document.documentElement.style.setProperty("--theme-second-color", "rgb(33, 38, 43)");
        document.documentElement.style.setProperty("--theme-three-color", "rgb(44, 62, 80)");
        document.documentElement.style.setProperty("--theme-four-color", "#e4e6e7");
    }
    if (getTheme === 'brown')
    {
        document.documentElement.style.setProperty("--theme-main-color", "#e1cd9c");
        document.documentElement.style.setProperty("--theme-second-color", "rgb(33, 38, 43)");
        document.documentElement.style.setProperty("--theme-three-color", "#625a47");
        document.documentElement.style.setProperty("--theme-four-color", "#c4b58f");
    }
    if (getTheme === 'dark')
    {
        document.documentElement.style.setProperty("--theme-main-color", "rgb(33, 38, 43)");
        document.documentElement.style.setProperty("--theme-second-color", "rgb(255, 255, 255)");
        document.documentElement.style.setProperty("--theme-three-color", "#979aa0");
        document.documentElement.style.setProperty("--theme-four-color", "#545659");
    }

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

        getTheme: getTheme,
        setTheme: setTheme,

        getStyles: getStyles,
        setStyles: setStyles
    });
}
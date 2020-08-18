import React from 'react';
import {NavLink, Route} from 'react-router-dom';

import { X, ArrowsDiagonal, ChevronDown, Dots, ArrowLeft } from 'tabler-icons-react';

const fs = window.require('fs');
const userPath = require('./../../storage').userPath;

class TitleBar extends React.Component
{
    componentDidMount()
    {
        const win = window.require('electron').remote.getCurrentWindow();
        document.onreadystatechange = (event) => 
        {
            if (document.readyState === "complete") 
            {
                handleWindowControls();
            }
        };
        window.onbeforeunload = (event) => 
        {
            win.removeAllListeners();
        }
        function handleWindowControls() 
        {
            document.getElementById('titleMinimize').addEventListener("click", event => {
                win.minimize();
            });

            document.getElementById('titleRestore').addEventListener("click", event => {
                if (win.isMaximized())
                {
                    win.unmaximize();
                }
                else
                {
                    win.maximize();
                }
            });

            document.getElementById('titleClose').addEventListener("click", event => {
                win.close();
            });
        }
    }

    toggleSettingWindow = () =>
    {
        this.props.settings.setSettingWindowStatus(!this.props.settings.getSettingWindowStatus);

        if (this.props.settings.getSettingWindowStatus === true)
        {
            this.updateSettingsFile();
        }
    }

    updateSettingsFile = () =>
    {
        let settings = {...this.props.settings.getSetting};



        settings.padding = this.props.settings.getPadding;
        settings.fontSize = this.props.settings.getFontSize;
        settings.lineHeight = this.props.settings.getLineHeight;
        settings.darkMode = this.props.settings.getDarkMode;

        fs.writeFileSync(userPath.settings, JSON.stringify(settings));
    }

    render()
    {
        return(
        <div id="titleBar">
            
            <Route exac path="/viewer" render={() => (
            <>
            <NavLink  to="/shelf/books"  id="titleBack" onClick={()=>{ this.updateSettingsFile(); this.props.settings.setSettingWindowStatus(false) }}>
                <ArrowLeft size={48} strokeWidth={2} color={'black'} />
            </NavLink>
            
            <div id="viewSetting" onClick={ this.toggleSettingWindow }>
                <Dots size={48} strokeWidth={2} color={'black'} />
            </div> </>)} />

            <p id="titleStatus"> </p>

            <div id="titleMinimize">
                <ChevronDown size={48} strokeWidth={2} color={'black'} />
            </div>

            <div id="titleRestore">
                <ArrowsDiagonal size={48} strokeWidth={2} color={'black'} />
            </div>

            <div id="titleClose">
                <X size={48} strokeWidth={2} color={'black'} />
            </div>
        </div>)
    }
}

export default TitleBar;
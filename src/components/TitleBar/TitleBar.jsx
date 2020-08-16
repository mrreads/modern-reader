import React from 'react';
import {NavLink, Route} from 'react-router-dom';

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
        settings.theme = this.props.settings.getTheme;

        fs.writeFileSync(userPath.settings, JSON.stringify(settings));
    }

    render()
    {
        return(
        <div id="titleBar">
            
            <Route exac path="/viewer" render={() => (
            <>
            <NavLink  to="/shelf/books"  id="titleBack" onClick={()=>{ this.updateSettingsFile(); this.props.settings.setSettingWindowStatus(false) }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" viewBox="0 0 24 24" stroke="#2c3e50" fill="none">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <line x1="5" y1="12" x2="11" y2="18" />
                    <line x1="5" y1="12" x2="11" y2="6" />
                </svg>
            </NavLink>
            
            <div id="viewSetting" onClick={ this.toggleSettingWindow }>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-dots" viewBox="0 0 24 24" stroke="#2c3e50" fill="none">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <circle cx="5" cy="12" r="1" />
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                </svg>
            </div> </>)} />

            <p id="titleStatus"> </p>

            <div id="titleMinimize">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-down-left"
                    viewBox="0 0 24 24" fill="none">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="17" y1="7" x2="7" y2="17" />
                    <polyline points="16 17 7 17 7 8" />
                </svg>
            </div>

            <div id="titleRestore">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrows-diagonal"
                    viewBox="0 0 24 24" fill="none">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="16 4 20 4 20 8" />
                    <line x1="14" y1="10" x2="20" y2="4" />
                    <polyline points="8 20 4 20 4 16" />
                    <line x1="4" y1="20" x2="10" y2="14" />
                </svg>
            </div>

            <div id="titleClose">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" viewBox="0 0 24 24" fill="none">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </div>
        </div>)
    }
}

export default TitleBar;
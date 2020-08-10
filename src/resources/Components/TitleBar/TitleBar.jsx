import React from 'react';

class TitleBar extends React.Component
{
    componentDidMount()
    {
        const remote = window.require('electron').remote;
        const win = remote.getCurrentWindow();
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

    render()
    {
        return(
        <div id="titleBar">
            <p id="titleStatus"></p>

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
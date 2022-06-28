import { useEffect } from 'react';

import { ReactComponent as Minimize } from '@/images/icons/minimize.svg';
import { ReactComponent as Resize } from '@/images/icons/resize.svg';
import { ReactComponent as Close } from '@/images/icons/close.svg';

import './index.scss';

const TitleBar = () => {

    const { ipcRenderer } = require("electron");
    
    useEffect(() => {
        window.onbeforeunload = () => ipcRenderer.send('clear');
        
        document.querySelector('#minimize').addEventListener("click", () => ipcRenderer.send('minimize'));
        document.querySelector('#resize').addEventListener("click", () => ipcRenderer.send('restore'));
        document.querySelector('#close').addEventListener("click", () => ipcRenderer.send('close'));
    })


    return (
        <div className='titlebar-wrapper'>

            <div className='titlebar-drag'></div>

            <div id="minimize" className='titlebar-element'>
                <Minimize fill='#FFFFFF' height={10} width={10} />
            </div>

            <div id="resize" className='titlebar-element'>
                <Resize fill='#FFFFFF' height={10} width={10} />
            </div>

            <div id="close" className='titlebar-element'>
                <Close fill='#FFFFFF' height={10} width={10} />
            </div>

        </div>
    );
};

export default TitleBar;
import { useEffect } from 'react';

import { ReactComponent as Minimize } from '@/images/icons/minimize.svg';
import { ReactComponent as Resize } from '@/images/icons/resize.svg';
import { ReactComponent as Close } from '@/images/icons/close.svg';

import { observer } from 'mobx-react-lite';
import useStore from '@/hooks/useStore'

import './index.scss';

const Store = require('electron-store');
const store = new Store();
const settings = store.get('settings')

const isSystemTitlebar = (settings) ? settings.systemTitlebar : false;

const TitleBar = observer(() => {
    const [ settingStore ] = useStore('settings');
    const { lightMode } = settingStore;

    const { ipcRenderer } = require("electron");
    
    useEffect(() => {
        window.onbeforeunload = () => ipcRenderer.send('clear');
        
        document.querySelector('#minimize').addEventListener("click", () => ipcRenderer.send('minimize'));
        document.querySelector('#resize').addEventListener("click", () => ipcRenderer.send('restore'));
        document.querySelector('#close').addEventListener("click", () => ipcRenderer.send('close'));
    })


    return (
        <div className={`titlebar-wrapper ${(isSystemTitlebar) ? 'system' : ''}`}>

            <div className='titlebar-drag'></div>

            <div id="minimize" className='titlebar-element'>
                <Minimize fill={(lightMode) ? '#292a2d' : '#FFFFFF'} height={10} width={10} />
            </div>

            <div id="resize" className='titlebar-element'>
                <Resize fill={(lightMode) ? '#292a2d' : '#FFFFFF'} height={10} width={10} />
            </div>

            <div id="close" className='titlebar-element'>
                <Close fill={(lightMode) ? '#292a2d' : '#FFFFFF'} height={10} width={10} />
            </div>

        </div>
    );
});

export default TitleBar;
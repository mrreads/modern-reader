import { useTranslation } from 'react-i18next';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import { observer } from 'mobx-react-lite';
import useStore from '@/hooks/useStore'

import Hr from '@/components/Hr';
import LanguageSelect from '@/components/LanguageSelect'
import Switch from '@/components/Switch';
import Tooltip from '@/components/Tooltip';

import './index.scss';
import React from 'react';

const Setting = observer(() => {
    const [ settingStore ] = useStore('settings');
    const { language, lightMode, systemTitlebar, changeLanguage, changeSystemTitlebar, changeLightMode } = settingStore;

    const { t } = useTranslation('setting');

    return (
        <SimpleBar className='content-wrapper'>
            <h1> { t('title') } </h1>
            
            <Hr />

            <Tooltip text={t('titlebar_tooltip')} align="right" noWordWrap>
                <div className='setting-element'> 
                    <p className='setting-element__text'>{t('titlebar')}:</p> <Switch defaultValue={systemTitlebar} callback={changeSystemTitlebar} /> 
                </div>
            </Tooltip>

            <div className='setting-element'> 
                <p className='setting-element__text'>{t('lightmode')}:</p> <Switch defaultValue={lightMode} callback={changeLightMode} /> 
            </div>


            <div className='setting-element'> 
                <p className='setting-element__text'>{t('language')}:</p> <LanguageSelect startupLanguage={language} changeLanguage={changeLanguage} />
            </div>    
        </SimpleBar>
    )
})

export default Setting;
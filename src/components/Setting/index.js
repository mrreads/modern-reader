import { useTranslation } from 'react-i18next';

import { observer } from 'mobx-react-lite';
import useStore from '@/hooks/useStore'

import Hr from '@/components/Hr';
import LanguageSelect from './LanguageSelect'
import Switch from '@/components/Switch';

import './index.scss';

const Setting = observer(() => {
    const [ settingStore ] = useStore('settings');
    const { language, systemTitlebar, changeLanguage, changeSystemTitlebar } = settingStore;

    const { t } = useTranslation('setting');

    return (
        <>

            <h1> { t('title') } </h1>
            
            <Hr />

            <div className='setting-element'> 
                <p className='setting-element__text'>{t('language')}:</p> <LanguageSelect startupLanguage={language} changeLanguage={changeLanguage} />
            </div>    

            <div className='setting-element'> 
                <p className='setting-element__text'>{t('titlebar')}:</p> <Switch defaultValue={systemTitlebar} callback={changeSystemTitlebar} /> 
            </div>   
        </>
    )
})

export default Setting;
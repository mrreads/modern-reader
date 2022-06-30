import { useTranslation } from 'react-i18next';

import Hr from '@/components/Hr';

import LanguageSelect from './LanguageSelect'

import Switch from '@/components/Switch';

import './index.scss';

const Setting = () => {

    const { t } = useTranslation('setting');

    return (
        <>

            <h1> { t('title') } </h1>
            
            <Hr />

            <div className='setting-element'> 
                <p className='setting-element__text'>{t('language')}:</p> <LanguageSelect /> 
            </div>    

            <div className='setting-element'> 
                <p className='setting-element__text'>{t('titlebar')}:</p> <Switch /> 
            </div>   
        </>
    )
}

export default Setting;
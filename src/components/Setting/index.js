import { useTranslation } from 'react-i18next';

import LanguageSelect from './LanguageSelect'

const Setting = () => {

    const { t } = useTranslation('setting');

    return (
        <>

            <h1> { t('title') } </h1>
            <hr />

            <LanguageSelect />

            <p> Привет hello </p>
            
        </>
    )
}

export default Setting;
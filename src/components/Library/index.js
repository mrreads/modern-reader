import React from 'react';
import { useTranslation } from 'react-i18next';

import Hr from '@/components/Hr';

const Library = () => {
    const { t } = useTranslation('library');

    return (
        <React.Fragment>
        
            <h1> { t('title') } </h1>
            
            <Hr />
        
        </React.Fragment>
    )
}

export default Library;
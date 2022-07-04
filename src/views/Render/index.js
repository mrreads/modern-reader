import React from 'react';
import { useTranslation } from 'react-i18next';

import { observer } from 'mobx-react-lite';
import useStore from '@/hooks/useStore'

import Hr from '@/components/Hr';

import './index.scss';

const Library = observer(() => {
    const [ libraryStore ] = useStore('library');
    const { getCurrentBook } = libraryStore;
    const { title, path } = getCurrentBook();
    
    return (
        <React.Fragment>
            <h1> { title } </h1>

            <Hr />

        </React.Fragment>
    )
})

export default Library;
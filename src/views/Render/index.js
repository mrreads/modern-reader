import React from 'react';

import { observer } from 'mobx-react-lite';
import useStore from '@/hooks/useStore'

import RenderTxt from '@/components/RenderBooks/txt'
import RenderFb2 from '@/components/RenderBooks/fb2'
import RenderEpub from '@/components/RenderBooks/epub'

import './index.scss';

const Render = observer(() => {
    const [ libraryStore ] = useStore('library');
    const { getCurrentBook } = libraryStore;
    const path = getCurrentBook().path
    
    const renderBook = () => {
        const extension = path.split('.').pop();

        switch(extension) {
            case 'txt':
                return (<RenderTxt path={path} />)
            case 'fb2':
                return (<RenderFb2 path={path} />)
            case 'epub':
                return (<RenderEpub path={path} />)
        }
    }

    return (
        <React.Fragment>
            { renderBook() }
        </React.Fragment>
    )
})

export default Render;
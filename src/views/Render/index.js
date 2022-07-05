import React from 'react';

import { observer } from 'mobx-react-lite';
import useStore from '@/hooks/useStore'

import RenderTxt from '@/components/RenderBooks/txt'

import './index.scss';

const Render = observer(() => {
    const [ libraryStore ] = useStore('library');
    const { getCurrentBook } = libraryStore;
    const path = getCurrentBook().path
    
    const renderBook = () => {
        const extension = path.split('.').pop();
        console.log(extension)
        switch(extension) {
            case 'txt':
                return (<RenderTxt path={path} />)
                
        }
    }

    return (
        <React.Fragment>
            { renderBook() }
        </React.Fragment>
    )
})

export default Render;
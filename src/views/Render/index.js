import React from 'react';

import { observer } from 'mobx-react-lite';
import useStore from '@/hooks/useStore'

import RenderTxt from '@/components/RenderBooks/txt'
import RenderFb2 from '@/components/RenderBooks/fb2'
import RenderEpub from '@/components/RenderBooks/epub'
import RenderPdf from '@/components/RenderBooks/pdf'

import './index.scss';

const Render = observer(() => {
    const [ libraryStore ] = useStore('library');
    const { getCurrentBook } = libraryStore;
    const { path, ext } = getCurrentBook()
    
    const renderBook = () => {

        switch(ext) {
            case 'txt':
                return (<RenderTxt book={getCurrentBook()} />)
            case 'fb2':
                return (<RenderFb2 book={getCurrentBook()} />)
            case 'epub':
                return (<RenderEpub book={getCurrentBook()} />)
            case 'pdf':
                return (<RenderPdf book={getCurrentBook()} />)
        }
    }

    return (
        <React.Fragment>
            { renderBook() }
        </React.Fragment>
    )
})

export default Render;
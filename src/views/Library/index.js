import React from 'react';
import { useTranslation } from 'react-i18next';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import { v4 as uuidv4, v4 } from 'uuid';
import { observer } from 'mobx-react-lite';
import useStore from '@/hooks/useStore'

import Button from '@/components/Button';
import Hr from '@/components/Hr';

import Books from '@/components/Books';

import './index.scss';

const path = window.require('path'); 

const Library = observer(() => {
    const [ libraryStore ] = useStore('library');
    const { getBooks, addBook, clearLibrary } = libraryStore;

    const { t } = useTranslation('library');
    const { ipcRenderer } = window.require('electron');

    const handleOpenModal = () => {

    }

    const handleAddBook = () => {
        ipcRenderer.invoke('open-file');
        ipcRenderer.once('send-file', (e, file) => {
            if (file.canceled) return;

            global.filepath = file.filePaths[0].toString();

            let bookObject = {
                id: v4(),
                title:  path.basename(global.filepath, path.extname(global.filepath)),
                ext: path.extname(global.filepath).replace('.', ''),
                path: global.filepath,
                progress: 0,
                scrollTop: 0,
            }
            addBook(bookObject);
        });
    }

    return (
        <SimpleBar className='content-wrapper'>
        
            <div className='library-page__wrapper'>
                <h1> { t('title') } </h1>
                <Button text={ t('add_book') } callback={ handleAddBook } />
            </div>

            
            <Hr />
        
            <Books data={getBooks()}/>

        </SimpleBar>
    )
})

export default Library;
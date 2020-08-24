import React from 'react';
import {NavLink, Route} from 'react-router-dom';

import { Alert } from 'rsuite';

import { X, ArrowsDiagonal, ChevronDown, Dots, ArrowLeft, Note } from 'tabler-icons-react';

import { useTranslation } from 'react-i18next';

const fs = window.require('fs');
const userPath = require('./../../storage').userPath;

export default function(props)
{

    const { t } = useTranslation('titlebar');

    const win = window.require('electron').remote.getCurrentWindow();
    document.onreadystatechange = (event) => 
    {
        if (document.readyState === "complete") 
        {
            handleWindowControls();
        }
    };
    window.onbeforeunload = (event) => 
    {
        win.removeAllListeners();
    }
    function handleWindowControls() 
    {
        document.getElementById('titleMinimize').addEventListener("click", event => {
            win.minimize();
        });

        document.getElementById('titleRestore').addEventListener("click", event => {
            if (win.isMaximized())
            {
                win.unmaximize();
            }
            else
            {
                win.maximize();
            }
        });

        document.getElementById('titleClose').addEventListener("click", event => {
            win.close();
        });
    }

    const toggleSettingWindow = () =>
    {
        props.settings.setSettingWindowStatus(!props.settings.getSettingWindowStatus);

        if (props.settings.getSettingWindowStatus === true)
        {
            updateSettingsFile();
        }
    }

    const updateSettingsFile = () =>
    {
        let settings = {...props.settings.getSetting};



        settings.padding = props.settings.getPadding;
        settings.fontSize = props.settings.getFontSize;
        settings.lineHeight = props.settings.getLineHeight;
        settings.darkMode = props.settings.getDarkMode;

        fs.writeFileSync(userPath.settings, JSON.stringify(settings));
    }

    const whenClickBack = () =>
    {
        updateSettingsFile(); 
        props.settings.setSettingWindowStatus(false);
        props.titlebar.setTitleStatus('');

        saveBookProgress();

    }
    
    const saveBookProgress = () =>
    {
        let oldBooks = [...props.progress.getBooks];
        let currentBook = {...props.progress.getCurrentBook};
        let progress = props.progress.getProgress;
        let newBooks = oldBooks.map((book) => 
        {
            if (book.path === currentBook.path)
                book.progress = progress;

            return book;
        });
        fs.writeFileSync(userPath.books, JSON.stringify(newBooks));
        props.progress.setBooks(JSON.parse(fs.readFileSync(userPath.books, 'utf8')));
    }

    const saveSelectedNote = () =>
    {
        if (props.notes.getSelectedStatus)
        {
            let allNotes = [...props.notes.getNotes];
            const newNote = window.getSelection().toString();
            allNotes.push(newNote);
            fs.writeFileSync(userPath.notes, JSON.stringify(allNotes));
            props.notes.setSelectedStatus(false);
            document.getSelection().removeAllRanges();
            props.notes.setNotes(allNotes);

            Alert.success(t('notes'));
        }
    }
    return(
    <div id="titleBar">
        
        <Route exac path="/viewer" render={() => 
        (<>
            <NavLink  to="/shelf/books"  id="titleBack" onClick={ whenClickBack }>
                <ArrowLeft size={48} strokeWidth={2} color={'black'} />
            </NavLink>
            
            <div id="viewSetting" onClick={ toggleSettingWindow }>
                <Dots size={48} strokeWidth={2} color={'black'} />
            </div> 

            <div id="notesSave" onClick={ saveSelectedNote } className={ (!props.notes.getSelectedStatus) ? "disabled" : "" }>
                <Note size={48} strokeWidth={2} color={'black'} />
            </div> 
        </> )} />

        <p id="titleStatus"> { props.titlebar.getTitleStatus } </p>

        <div id="titleMinimize">
            <ChevronDown size={48} strokeWidth={2} color={'black'} />
        </div>

        <div id="titleRestore">
            <ArrowsDiagonal size={48} strokeWidth={2} color={'black'} />
        </div>

        <div id="titleClose">
            <X size={48} strokeWidth={2} color={'black'} />
        </div>
    </div>)
}
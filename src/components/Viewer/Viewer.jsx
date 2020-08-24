import React, { useEffect } from 'react';
import { withRouter  } from 'react-router-dom';

import ViewTxt from './formats/ViewTxt';
import ViewFb2 from './formats/ViewFb2';
import ViewEpub from './formats/ViewEpub';

import { useTranslation } from 'react-i18next';

import { Slider, Toggle, Animation } from 'rsuite';

const { Collapse } = Animation;

const fs = window.require('fs');
const userPath = require('./../../storage.js').userPath;

function Viewer(props)
{
    const style =
    {
        padding: props.settings.getPadding + 'px',
        fontSize: props.settings.getFontSize + 'px',
        lineHeight: props.settings.getLineHeight 
    }

    let book;
    try { book = props.location.data.book; } catch { window.location = '/shelf/books'; }
    
    useEffect(() => 
    { 
        props.progress.setCurrentBook(props.location.data.book);
        props.progress.setProgress(props.location.data.book.progress);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    let view =  (book.ext === '.txt') ? <ViewTxt book={ book } style={ style } titlebar={ props.titlebar } progress={ props.progress } /> :
                (book.ext === '.fb2') ? <ViewFb2 book={ book } style={ style } titlebar={ props.titlebar } progress={ props.progress } /> :
                (book.ext === '.epub') ? <ViewEpub book={ book } style={ style } titlebar={ props.titlebar } progress={ props.progress } /> : null

    const { t } = useTranslation('viewer');

    const changeFontSize = value => props.settings.setFontSize(value);
    const changePadding = value => props.settings.setPadding(value);
    const changeLineHeight = value => props.settings.setLineHeight(value);

    const changeTheme = (value) =>
    {
        props.settings.setDarkMode(value);

        let settings = {...props.settings.getSetting};
        settings.darkMode = value;
        fs.writeFileSync(userPath.settings, JSON.stringify(settings));
    }

     return (
        <div id="content" className="view">
            
            <div id="viewer">

            <Collapse in={ props.settings.getSettingWindowStatus } exitedClassName='hide' > 
                
                <div className="settings">
                
                    <div className='setting darkMode'>
                        <p> { t('darkMode') }: </p>
                        <Toggle defaultChecked={ props.settings.getDarkMode } onChange={ changeTheme } />
                    </div>

                    <div className='setting'>
                        <p> { t('fontSize') }: { props.settings.getFontSize } </p>
                        <Slider
                            progress min={ 11 } max={ 46 }
                            defaultValue={ +props.settings.getFontSize }
                            onChange={ changeFontSize }
                        />
                    </div>

                    <div className='setting'>
                        <p> { t('padding') }: { props.settings.getPadding } </p>
                        <Slider
                            progress min={ 0 } max={ 50 }
                            defaultValue={ +props.settings.getPadding }
                            onChange={ changePadding }
                        />
                    </div>
                    
                    <div className='setting'>
                        <p> { t('lineHeight') }: { props.settings.getLineHeight } </p>
                        <Slider
                            progress min={ 0.5 } max={ 2 } step={ 0.1 }
                            defaultValue={ +props.settings.getLineHeight }
                            onChange={ changeLineHeight }
                        />
                    </div>

                </div>

            </Collapse>

                <h1> { props.location.data.path } </h1>

                { view }

            </div>

        </div>);
}

export default withRouter(Viewer);
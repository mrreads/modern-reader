import React, { useState} from 'react';
import { withRouter  } from 'react-router-dom';
import Parser from 'html-react-parser';


import { useTranslation } from 'react-i18next';

import { Slider, Toggle, Animation } from 'rsuite';

const { Collapse } = Animation;

const fs = window.require('fs');

function Viewer(props)
{
    const { t } = useTranslation('viewer');

    let book, textBook;
    try
    {
        book = props.location.data.book;
    }
    catch
    {
        window.location = '/shelf/books'
    }
    
    
    if (book.ext === '.txt')
    {
        textBook = fs.readFileSync(book.path, 'utf8');
    } 
    else if (book.ext === '.fb2')
    {
        let fb2data = fs.readFileSync(book.path, 'utf8');
        const FB2HTML = require('fb2html');
        const fb2book = new FB2HTML(fb2data);
        textBook = fb2book.getBody();
    }

    const [content] = useState(textBook);

    const changeFontSize = (value) =>
    {
        props.settings.setFontSize(value);
    }
    
    const changePadding = (value) =>
    {
        props.settings.setPadding(value);
    }

    const changeLineHeight = (value) =>
    {
        props.settings.setLineHeight(value);
    }

    const changeTheme = (value) =>
    {
        props.settings.setDarkMode(value);
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

                <div className="content" 
                    style={{
                        padding: props.settings.getPadding + 'px',
                        fontSize: props.settings.getFontSize + 'px',
                        lineHeight: props.settings.getLineHeight }}> { Parser(content) } </div>

            </div>

        </div>);
}

export default withRouter(Viewer);
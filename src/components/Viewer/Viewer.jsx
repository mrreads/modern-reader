import React, { useState} from 'react';
import { withRouter  } from 'react-router-dom';
import Parser from 'html-react-parser';

const fs = window.require('fs');

function Viewer(props)
{
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

    const checkValue = (e) =>
    {
        if (e.target.dataset.type === 'fontSize')
           props.settings.setFontSize(e.target.value);

        if (e.target.dataset.type === 'padding')
            props.settings.setPadding(e.target.value);

        if (e.target.dataset.type === 'lineHeight')
           props.settings.setLineHeight(e.target.value);
    }
    
    const changeTheme = (e) =>
    {
        props.settings.setTheme(e.target.dataset.theme);
    }


     return (
        <div id="content" className="view">
            
            <div id="viewer">

                <div className={(props.settings.getSettingWindowStatus) ? "settings" : "settings hide" }>
                
                    <div className="theme">
                        <p> Theme: <span>{ props.settings.getTheme }</span></p>
                        
                        <div className="themes">
                            <div className="type" data-theme="light" onClick={changeTheme} />
                            <div className="type" data-theme="brown" onClick={changeTheme} />
                            <div className="type" data-theme="dark" onClick={changeTheme} />
                        </div>
                    </div>

                    <div className="hr"/>

                    
                    <div className="inputNumberWrapper font-size">
                        <p> Font-Size: <span>{ props.settings.getFontSize }</span></p>
                        <input type="range" min="11" max="46" value={ props.settings.getFontSize } onChange={checkValue} data-type="fontSize" />
                    </div>

                    <div className="hr"/>

                    <div className="inputNumberWrapper padding">
                        <p> Padding: <span>{ props.settings.getPadding }</span></p>
                        <input type="range" min="0" max="50" value={ props.settings.getPadding } onChange={checkValue} data-type="padding" />
                    </div>

                    <div className="hr"/>

                    <div className="inputNumberWrapper line-height">
                        <p> Line-height: <span>{ props.settings.getLineHeight }</span></p>
                        <input type="range" min="0.5" max="2" step="0.1" value={ props.settings.getLineHeight } onChange={checkValue} data-type="lineHeight" />
                    </div>

                </div>

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
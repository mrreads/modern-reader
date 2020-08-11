import React, { useState} from 'react';
import { withRouter  } from 'react-router-dom';

const fs = window.require('fs');

function Viewer(props)
{
    let book;
    let textBook;
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
    const [content, updateContent] = useState(textBook)

     return (
        <div id="content" className="view">
            
            <div id="viewer">

                <div className={(props.toggle) ? "settings" : "settings hide" }>
                    <div className="theme">
                        <div className="light"></div>
                        <div className="dark"></div>
                    </div>

                    <div className="hr"></div>

                    
                    <div className="inputNumberWrapper font-size">
                        <p> Font-Size: <span></span></p>
                        <input type="range" min="11" max="46" />
                    </div>

                    <div className="hr"></div>

                    <div className="inputNumberWrapper padding">
                        <p> Padding: <span></span></p>
                        <input type="range" min="0" max="50" />
                    </div>

                    <div className="hr"></div>

                    <div className="inputNumberWrapper line-height">
                        <p> Line-height: <span></span></p>
                        <input type="range" min="0.5" max="2" step="0.1" />
                    </div>

                </div>

                <h1> { props.location.data.path } </h1>

                <div className="content"> { content }</div>

            </div>

        </div>);
}

export default withRouter(Viewer);
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
                <h1> { props.location.data.path } </h1>
                <div className="content"> { content }</div>

            </div>
        </div>);
}

export default withRouter(Viewer);
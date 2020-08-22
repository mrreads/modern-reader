import React from 'react';

import RenderTxt from './formats/RenderTxt';
import RenderFb2 from './formats/RenderFb2';
import RenderEpub from './formats/RenderEpub';

function Book(props)
{
    let book;
    book =  (props.data.ext === '.txt') ? <RenderTxt data={props.data} /> :
            (props.data.ext === '.fb2') ? <RenderFb2 data={props.data} /> :
            (props.data.ext === '.epub') ? <RenderEpub data={props.data} /> : null
    
    return (book);
}

export default Book;
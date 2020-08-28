import React from 'react';

import RenderTxt from './formats/RenderTxt';
import RenderFb2 from './formats/RenderFb2';

function Book(props)
{
    let book;
    book =  (props.data.ext === '.txt') ? <RenderTxt data={props.data} delete={ props.delete } /> :
            (props.data.ext === '.fb2') ? <RenderFb2 data={props.data} delete={ props.delete } /> : null
    
    return (book);
}

export default Book;
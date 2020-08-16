import React from 'react';
import RenderTxt from './formats/RenderTxt';
import RenderFb2 from './formats/RenderFb2';

function Book(props)
{
    let render;
    if (props.data.ext === '.txt') { render = <RenderTxt data={props.data} /> }
    if (props.data.ext === '.fb2') { render = <RenderFb2 data={props.data} /> }
    
    return (render);
}

export default Book;
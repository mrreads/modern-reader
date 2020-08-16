import React from 'react';
import { Link } from "react-router-dom";

const fs = window.require('fs');

function RenderTxt(props)
{
    const fileIsExist = (fs.existsSync( props.data.path));

    const onClick = (e) =>
    {
        if (!fileIsExist)
            e.preventDefault();
    }

    let extClass = props.data.ext.replace(/\./g, ''); 

    return (
    <Link to={{ pathname: "/viewer", data: { book: props.data } }}
          className={(fileIsExist) ? `book ${extClass}` : `book ${extClass} error` }
          onClick={onClick} >

        <p className="name"> <strong> {props.data.name} </strong> </p>

        <div className="info">
            <p className="format">Format: <i> { props.data.ext} </i> </p>
            <p>Strings: <i> { props.data.strings} </i> </p>
        </div>
    </Link>);
}

export default RenderTxt;
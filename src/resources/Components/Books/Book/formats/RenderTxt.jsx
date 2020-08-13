import React from 'react';
import { Link } from "react-router-dom";

const fs = window.require('fs');

function RenderTxt(props)
{
    console.log(props)
    let extClass = props.data.ext.replace(/\./g, ''); 

    return (
    <Link to={{ pathname: "/viewer", data: { book: props.data } }} className={`book ${extClass}`}>
        <p className={(fs.existsSync( props.data.path)) ? "name" : "name error" }> <strong> {props.data.name} </strong> </p>

        <div className="info">
            <p className="format">Format: <i> { props.data.ext} </i> </p>
            <p>Strings: <i> { props.data.strings} </i> </p>
        </div>
    </Link>);
}

export default RenderTxt;
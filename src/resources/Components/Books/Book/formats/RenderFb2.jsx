import React from 'react';
import { Link } from "react-router-dom";

const fs = window.require('fs');

function RenderFb2(props)
{
    let fb2data;

    let extClass = props.data.ext.replace(/\./g, '');
     
    fb2data = fs.readFileSync(props.data.path, 'utf8');
    const FB2HTML = require('fb2html');
    const fb2book = new FB2HTML(fb2data);
    const bookData = 
    {
        title: fb2book.getTitle(),
        image: fb2book.getCover(),
        author: fb2book.getAuthors(),
    }
    return (
    <Link to={{ pathname: "/viewer", data: { book: props.data } }} className={`book ${extClass}`}>
        <img src={bookData.image} />
        
        <div className="wrapper">
            <div className="mainInfo">
                <p className={(fs.existsSync( props.data.path)) ? "name" : "name error" }> <strong> {props.data.name} </strong> </p>
                <p className="title"> {bookData.title} </p>
                <p className="author"> {bookData.author} </p>
           </div>

            <div className="info">
                <p className="format">Format: <i> { props.data.ext} </i> </p>
                <p>Strings: <i> { props.data.strings} </i> </p>
            </div>
        </div>

    </Link>);
}

export default RenderFb2;
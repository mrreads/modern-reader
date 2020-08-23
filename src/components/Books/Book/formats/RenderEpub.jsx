import React from 'react';
import { Link } from "react-router-dom";

import { useTranslation } from 'react-i18next';

const fs = window.require('fs');

export default function(props)
{
    const { t } = useTranslation('books');

    const fileIsExist = (fs.existsSync(props.data.path));
    
    const onClick = (e) =>
    {
        if (!fileIsExist)
            e.preventDefault();
    }

    let extClass = props.data.ext.replace(/\./g, '');

    const bookData = 
    {
        title: 't',
        image: 'i',
        author: 'a',
    }
    return (
    <Link to={{ pathname: "/viewer", data: { book: props.data } }}
          className={(fileIsExist) ? `book ${extClass}` : `book ${extClass} error` }
          onClick={ onClick } >

        <img src={bookData.image} alt="Book cover" />
        
        <div className="wrapper">
            <div className="mainInfo">
                <p className={(fileIsExist) ? "name" : "name error" }> <strong> {props.data.name} </strong> </p>
                <p className="title"> {bookData.title} </p>
                <p className="author"> {bookData.author} </p>
           </div>

            <div className="info">
                <p className="format"> { t('format') }: <i> { props.data.ext} </i> </p>
                <p> { t('strings') }: <i> { props.data.strings} </i> </p>
                <p> { t('progress') }: <i> { props.data.progress}% </i> </p>
            </div>
        </div>

    </Link>);
}
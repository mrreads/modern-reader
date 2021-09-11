import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { useTranslation } from 'react-i18next';
import { IconButton, Icon, ButtonToolbar } from 'rsuite';

const fs = window.require('fs');
const EPub = require("epub2").EPub;

export default function(props)
{
    const [getLanguage, setLanguage] = useState(0);
    const [getCreator, setCreator] = useState(0);
    const [getTitle, setTitle] = useState(0);
    
    const { t } = useTranslation('books');

    const fileIsExist = (fs.existsSync( props.data.path));

    const onClick = (e) =>
    {
        if (!fileIsExist)
            e.preventDefault();
    }

    let extClass = props.data.ext.replace(/\./g, ''); 

    let language, creator, title;
    EPub.createAsync(props.data.path, "/imagewebroot/", "/articlewebroot/")
	.then(function (epub)
	{
        setLanguage(epub.metadata.language);
        setTitle(epub.metadata.title);
        setCreator(epub.metadata.creator);
	});

    return (
        
    <Link to={{ pathname: "/viewer", data: { book: props.data } }}
          className={(fileIsExist) ? `book ${extClass}` : `book ${extClass} error` }
          onClick={onClick} >

        <p className="name"> 
            <strong> {props.data.name} </strong>
            <p className="title"> {getTitle} </p> 
        </p>

        <div className="info">
            <ButtonToolbar className="delete" onClick={ e => props.delete(e, props.data) }>
                <IconButton icon={ <Icon icon="trash"/> } /> 
            </ButtonToolbar>

            <p className="format"> { t('format') }: <i> { props.data.ext} </i> </p>
            <p> { t('strings') }: <i> { props.data.strings} </i> </p>
            <p> { t('language') } <i> { getLanguage } </i> </p>
            <p> { t('author') } <i> { getCreator } </i> </p>
        </div>
    </Link>);
}
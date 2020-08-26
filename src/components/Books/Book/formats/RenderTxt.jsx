import React from 'react';
import { Link } from "react-router-dom";

import { useTranslation } from 'react-i18next';
import { IconButton, Icon, ButtonToolbar } from 'rsuite';

const fs = window.require('fs');

export default function(props)
{
    const { t } = useTranslation('books');

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
            <ButtonToolbar className="delete" onClick={ e => props.delete(e, props.data) }>
                <IconButton icon={ <Icon icon="trash"/> } /> 
            </ButtonToolbar>

            <p className="format"> { t('format') }: <i> { props.data.ext} </i> </p>
            <p> { t('strings') }: <i> { props.data.strings} </i> </p>
            <p> { t('progress') }: <i> { props.data.progress}% </i> </p>
        </div>
    </Link>);
}
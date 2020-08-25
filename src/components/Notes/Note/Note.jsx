import React from 'react';

import { IconButton, ButtonToolbar, Icon } from 'rsuite';

export default function(props)
{
    return (
    <div className="note"> 
        <p> { props.data } </p>
        <ButtonToolbar className="delete" onClick={ e => props.delete(e, props.data) }>
            <IconButton icon={ <Icon icon="trash"/> } /> 
        </ButtonToolbar>
    </div> );
}
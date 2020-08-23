import React, { useState, useRef, useEffect } from 'react';
import { withRouter  } from 'react-router-dom';

import Parser from 'html-react-parser';

const fs = window.require('fs');

function Viewer(props)
{
    const ref = useRef()
    useEffect(() => { handleScroll(ref.current) });

    let fullHeight, currentScroll;
    const handleScroll = (element) => 
    {
        currentScroll = element.clientHeight + element.scrollTop + parseInt(props.style.padding);
        fullHeight = ref.current.scrollHeight + parseInt(props.style.padding);
        props.titlebar.setTitleStatus((currentScroll * 100 /fullHeight).toFixed(0) + '% / 100%');
    }
    
    let textBook;
    textBook = fs.readFileSync(props.book.path, 'utf8');

    const [content] = useState(textBook);

    return (<div className="content" style={ props.style } ref={ ref } onScroll={ e => handleScroll(e.target) }>
                { content }
            </div>);
}

export default withRouter(Viewer);
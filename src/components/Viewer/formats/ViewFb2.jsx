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
    let fb2data = fs.readFileSync(props.book.path, 'utf8');
    const FB2HTML = require('fb2html');
    const fb2book = new FB2HTML(fb2data);
    textBook = fb2book.getBody();
    textBook = Parser(textBook);

    const [content] = useState(textBook);

    return (<div className="content" style={ props.style } ref={ ref } onScroll={ e => handleScroll(e.target) }>
                { content }
            </div>);
}

export default withRouter(Viewer);
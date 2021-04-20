import React, { useState, useRef, useEffect } from 'react';
import { withRouter  } from 'react-router-dom';

import Parser from 'html-react-parser';

const fs = window.require('fs');

function Viewer(props)
{
    const ref = useRef()
    useEffect(() => {
        props.titlebar.setTitleStatus(props.book.name);
        ref.current.scrollTop = ((+ref.current.scrollHeight + parseInt(props.style.padding)) * (props.book.progress * 0.01) - ref.current.clientHeight).toFixed(1);
    }, []);

    let fullHeight, currentScroll, currProgress;
    const handleScroll = (element) => 
    {
        currentScroll = element.clientHeight + element.scrollTop + parseInt(props.style.padding);
        fullHeight = ref.current.scrollHeight + parseInt(props.style.padding);
        currProgress = (currentScroll * 100 / fullHeight).toFixed(0);
        props.progress.setProgress(currProgress);
        props.titlebar.setTitleStatus(props.book.name + ', ' + currProgress + '% / 100%');
    }
    
    let textBook;
    textBook = fs.readFileSync(props.book.path, 'utf8');
    textBook = Parser(textBook);
    
    const [content] = useState(textBook);

    const statusNote = () =>
    {
        if (window.getSelection().toString() !== '')
            props.notes.setSelectedStatus(true);
        else
            props.notes.setSelectedStatus(false);
    }

    return (<div className="content" style={ props.style } ref={ ref } onScroll={ e => handleScroll(e.target) } onClick={ statusNote } >
                { content }
            </div>);
}

export default withRouter(Viewer);
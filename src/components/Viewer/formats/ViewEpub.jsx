import React, { useState, useRef, useEffect } from 'react';
import { withRouter  } from 'react-router-dom';

import Parser from 'html-react-parser';

function Viewer(props)
{
    const ref = useRef()
    useEffect(() => { 
        ref.current.scrollTop = ((+ref.current.scrollHeight + parseInt(props.style.padding)) * (props.book.progress * 0.01) - ref.current.clientHeight).toFixed(1);
    }, []);

    let fullHeight, currentScroll;
    const handleScroll = (element) => 
    {
        currentScroll = element.clientHeight + element.scrollTop + parseInt(props.style.padding);
        fullHeight = ref.current.scrollHeight + parseInt(props.style.padding);
        props.titlebar.setTitleStatus((currentScroll * 100 /fullHeight).toFixed(0) + '% / 100%');
    }

    let textBook;
    textBook = 'epub';
    textBook = Parser(textBook);
    
    const [content] = useState(textBook);

    return(<div className="content" style={ props.style } ref={ ref } onScroll={ e => handleScroll(e.target) }>
                { content }
            </div>);
}

export default withRouter(Viewer);
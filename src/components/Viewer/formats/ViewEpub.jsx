import React, { useState, useRef, useEffect } from 'react';
import { withRouter  } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Parser from 'html-react-parser';

import { AlignRight } from 'tabler-icons-react';

const fs = window.require('fs');

const EPub = window.require("epub2/node");

function Viewer(props)
{
    console.log('a');

    const { t } = useTranslation('viewer');

    const [getCharaptersList, setCharaptersList] = useState(0);
    const [getContent, setContent] = useState(0);

    let textBook;

    const ref = useRef()
    useEffect(() => {


        EPub.createAsync(props.book.path, "/imagewebroot/", "/articlewebroot/")
        .then(function (epub)
        {
            setCharaptersList(epub.spine.contents);
    
            epub.spine.contents.map((charapter, i) => {     
                epub.getChapter(charapter.id, (error, text) => {
                    textBook += text;
    
                    if ((i + 1) == (epub.spine.contents.length))
                        setContent(Parser(textBook));

                });
            });
    
        });

        ref.current.scrollTop = ((+ref.current.scrollHeight + parseInt(props.style.padding)) * (props.book.progress * 0.01) - ref.current.clientHeight).toFixed(1);
    }, []);

    let fullHeight, currentScroll, currProgress;
    const handleScroll = (element) => 
    {
        currentScroll = element.clientHeight + element.scrollTop + parseInt(props.style.padding);
        fullHeight = ref.current.scrollHeight + parseInt(props.style.padding);
        currProgress = (currentScroll * 100 / fullHeight).toFixed(0);
        props.progress.setProgress(currProgress);
        props.titlebar.setTitleStatus(currProgress + '% / 100%');
    }

   


    const statusNote = () =>
    {
        if (window.getSelection().toString() !== '')
            props.notes.setSelectedStatus(true);
        else
            props.notes.setSelectedStatus(false);
    }

    return (<>
    
            <div className="charapters">    
                    <h3> { t('content') } </h3>
                    {    !getCharaptersList.length ? null : getCharaptersList.map((charapter, i) => {     
                            return (<p className="charapter" key={i}> { charapter.id } </p>); 
                        })
                    }
            </div>

            <div className="content epub" style={ props.style } ref={ ref } onScroll={ e => handleScroll(e.target) } onClick={ statusNote } >  
                <AlignRight size={48} strokeWidth={1} color={'#575757'} className="contentHide" />
                { getContent }
            </div>
            
            </>);
}

export default withRouter(Viewer);
import React, { useState, useRef, useEffect } from 'react';
import { withRouter  } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Parser from 'html-react-parser';

import { AlignRight } from 'tabler-icons-react';

import { Animation  } from 'rsuite';

const { Slide } = Animation;

const fs = window.require('fs');

const EPub = window.require("epub2/node");

function Viewer(props)
{
    const { t } = useTranslation('viewer');

    const [getCharapterHide, setCharapterHide] = useState(true);

    const [getCharaptersList, setCharaptersList] = useState(0);
    const [getContent, setContent] = useState(0);

    const [getAllCharapter, setAllCharapter] = useState(0);

    const [getActiveCharapter, setActiveCharapter] = useState(0);

    let textBook = [];

    const ref = useRef()
    useEffect(() => {


        EPub.createAsync(props.book.path, "/imagewebroot/", "/articlewebroot/")
        .then(function (epub)
        {
            console.log(epub);

            setCharaptersList(epub.toc);
    
            epub.spine.contents.map((charapter, i) => {     
                epub.getChapter(charapter.id, (error, text) => {
                    
                    textBook.push(text);
    
                    if ((i + 1) == (epub.spine.contents.length))
                        setAllCharapter(textBook);

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

    const toggleCharapter = () =>
    {
        setCharapterHide(!getCharapterHide);
    }

    const loadCharapter = (i) =>
    {
        setContent(Parser(getAllCharapter[i]))
        setActiveCharapter(i);
    }

    const statusNote = () =>
    {
        if (window.getSelection().toString() !== '')
            props.notes.setSelectedStatus(true);
        else
            props.notes.setSelectedStatus(false);
    }

    const readAll = () =>
    {
        let temp;
        getAllCharapter.map((text) => {     
            temp += text;
            });

        setContent(Parser(getAllCharapter));
        setActiveCharapter('all');
    }

    return (<>
    
            <Slide in={ getCharapterHide } exitedClassName='hide' placement='left' > 
                
                <div className="charapters">
                    <p className={getActiveCharapter == 'all' ? 'charapter active' : 'charapter'} onClick={readAll} > Читать всё </p>
                    <h3> { t('content') } </h3>
                    {    !getCharaptersList.length ? null : getCharaptersList.map((charapter, i) => {     
                            return (
                                (getActiveCharapter ==  i) ?
                                <p className="charapter active" key={i} onClick={()=>loadCharapter(i)} > { charapter.title } </p> :
                                <p className="charapter" key={i} onClick={()=>loadCharapter(i)} > { charapter.title } </p>
                                ) 
                        })
                    }
                </div>
            
            </Slide>
        
            <div className="content epub" style={ props.style } ref={ ref } onScroll={ e => handleScroll(e.target) } onClick={ statusNote } >  
                <AlignRight size={48} strokeWidth={1} color={'#575757'} className="contentHide" onClick={toggleCharapter} />
                { getContent }
            </div>
            
            </>);
}

export default withRouter(Viewer);
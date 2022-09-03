import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';

import { observer } from 'mobx-react-lite';
import useStore from '@/hooks/useStore'

import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

import './index.scss';

import { ReactReader, ReactReaderStyle } from "react-reader"
const fs = window.require('fs');

const RenderEpub = observer(({ book }) => {    
    const { path } = book;

    const { t } = useTranslation('render');

    const [ libraryStore ] = useStore('library');
    const { updateProgress } = libraryStore;

    const epubStyles = 
    { ...ReactReaderStyle,
        readerArea: {
            ...ReactReaderStyle.readerArea,
            backgroundColor: '#161616',
        },
        titleArea: {
            ...ReactReaderStyle.titleArea,
            color: '#FFFFFF'
        },
        arrow: {
            ...ReactReaderStyle.arrow,
            color: '#adadad',
            display: 'none'
        }, 
        arrowHover: {
            ...ReactReaderStyle.arrowHover,
            color: '#FFFFFF'
        }, 
        tocAreaButton: {
            ...ReactReaderStyle.tocAreaButton,
            color: '#adadad'
        }, 
        loadingView: {
            ...ReactReaderStyle.loadingView,
            color: '#adadad'
        }, 
    }

    const renditionRef = useRef();
    const tocRef = useRef();

    const [navigation, setNavigation] = useState({ curr: null, prev: null, next: null });
    const [location, setLocation] = useState(book.scrollTop ?? null);
    const locationChanged = (epubcifi) => {
        if (tocRef.current && renditionRef.current) {
            const { displayed, href } = renditionRef.current.location.start
            const currentIndex = tocRef.current.findIndex((item) => item.href.indexOf(href) > -1 );
            setNavigation({
                curr: { ...tocRef.current[currentIndex], index: currentIndex } ,
                prev: (currentIndex > 0) ? { ...tocRef.current[currentIndex - 1], index: currentIndex - 1 } : null,
                next: (tocRef.current.length === currentIndex + 1) ? null : { ...tocRef.current[currentIndex + 1], index: currentIndex + 1 }
            });
        }

        setLocation(epubcifi);
        updateProgress(book, location, navigation.curr?.label ?? null);
    }
    
    useEffect(() => {
        if (renditionRef.current)
        {
            renditionRef.current.on("relocated", (location) => {
                updateProgress(book, location.start.cfi, navigation.curr?.label ?? null);
            });
        }
    }, [renditionRef.current, tocRef.current]);
    
    useEffect(() => {
        return() => {
            updateProgress(book, location, navigation.curr?.label ?? null);
        }
    });

    const nextPage = () => {
        renditionRef.current.next();
    }

    const prevPage = () => {
        renditionRef.current.prev();
    }

    return(
    <div className='viewer epub' style={{ position: "relative", height: "100%" }}>

        <div className='epub-controls'>
            <div className='epub-nav'>
                <p className='epub-nav__button' onClick={prevPage}> { navigation.prev?.label ?? t('prev') } </p>
                <p className='epub-nav__button' onClick={nextPage}> { navigation.next?.label ?? t('next') } </p>
            </div>
        </div>
        
        <ReactReader 
            url={path}
            
            epubOptions={{
                flow: "scrolled-doc"
            }}

            getRendition={(rendition) => { 
                rendition.themes.register("dark",
                {
                    "body": { "background-color": "#161616", "color": "#adadad" },
                    "a": { "color": "inherit", "text-decoration": "none", "-webkit-text-fill-color": "inherit" },
                    "a:link": { "color": `#adadad5A`, "text-decoration": "none", "-webkit-text-fill-color": `#adadad5A` }
                });
                rendition.themes.select('dark');

                renditionRef.current = rendition;
            }}
            
            tocChanged={ toc => tocRef.current = toc }

            location={location}
            locationChanged={locationChanged}

            styles={epubStyles}
            showToc={false}
        />
    </div>)
});

export default RenderEpub;
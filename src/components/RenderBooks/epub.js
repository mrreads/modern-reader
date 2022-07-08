import { useEffect, useRef, useState } from 'react'

import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

import './index.scss';

import { ReactReader, ReactReaderStyle } from "react-reader"
const fs = window.require('fs');

const RenderEpub = ({ path }) => {    
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

    const [location, setLocation] = useState(null)
    const locationChanged = (epubcifi) => {
      // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
      setLocation(epubcifi)
    }
    
    return(
    <div className='viewer epub' style={{ position: "relative", height: "100%" }}>
        <ReactReader 
            url={path}
            
            epubOptions={{
                flow: "scrolled",
                manager: "continuous"
            }}

            getRendition={rendition => {
                rendition.themes.register("dark",
                {
                    "body": { "background-color": "#161616", "color": "#adadad" },
                    "a": { "color": "inherit", "text-decoration": "none", "-webkit-text-fill-color": "inherit" },
                    "a:link": { "color": `#adadad5A`, "text-decoration": "none", "-webkit-text-fill-color": `#adadad5A` }
                });
                rendition.themes.select('dark')
            }}

            location={location}
            locationChanged={locationChanged}

            styles={epubStyles}
            showToc={false}
        />
    </div>)
};

export default RenderEpub;
import { useRef, useState } from 'react'

import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import './index.scss';

import { ReactReader, ReactReaderStyle } from "react-reader"
const fs = window.require('fs');

const RenderEpub = ({ path }) => {    
    const epubStyles = { ...ReactReaderStyle }

    const [location, setLocation] = useState(null)
    const locationChanged = (epubcifi) => {
      // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
      setLocation(epubcifi)
    }

    return(
    <div className='viewer epub' style={{ position: "relative", height: "100%" }}>
        <ReactReader 
            url={path}
            
            location={location}
            locationChanged={locationChanged}

            styles={epubStyles}
        />
    </div>)
};

export default RenderEpub;
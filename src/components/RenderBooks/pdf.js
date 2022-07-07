import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import './index.scss';


import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const RenderTxt = ({ path }) => {
    const { t } = useTranslation('render');

    const [zoom, setZoom] = useState(3);

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    const nextPage = () => {
        let value = pageNumber;
        if (value + 1 <= numPages)
            setPageNumber(value + 1)
    }

    const prevPage = () => {
        let value = pageNumber;
        if (value - 1 >= 1)
            setPageNumber(value - 1)
    }

    const zoomOut = () => {
        let value = zoom;
        if (value - 1 >= 1)
            setZoom(value - 1)
    }
    const zoomIn = () => {
        let value = zoom;
        if (value + 1 <= 5)
            setZoom(value + 1)
    }

    const handleMouseWheel = (e) => {
        if(e.ctrlKey === true)
        {
            let dir = Math.sign(e.deltaY);
            if (dir != 0)
            {
                if (dir < 0)
                    zoomIn();
                if (dir > 0)
                    zoomOut();
            }
        }  
    }

    const debounce = (f, ms) => {
        let isCooldown = false;

        return function() {
          if (isCooldown) return;

          f.apply(this, arguments);
          isCooldown = true;
          setTimeout(() => isCooldown = false, ms);
        };
    }

    useEffect(() => {
        window.addEventListener("wheel", handleMouseWheel);
        return () => window.removeEventListener("wheel", handleMouseWheel);
    }, [zoom]);
    
    return(
    <SimpleBar className={`viewer pdf size-${zoom}`}>
        <div className='pdf-controls'>
            <div className='pdf-pages'>
                <p> {t('pages')} <span>{pageNumber}</span> {t('of')} <span>{numPages}</span> </p>
            </div>
            
            <div className='pdf-size'>
                <p className='pdf-size__button' onClick={zoomOut}> - </p>
                <p className='pdf-size__button' onClick={zoomIn}> + </p>
            </div>

            <div className='pdf-nav'>
                <p className='pdf-nav__button' onClick={prevPage}> {t('prev')} </p>
                <p className='pdf-nav__button' onClick={nextPage}> {t('next')} </p>
            </div>
        </div>

        <Document file={path} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
        </Document>
    </SimpleBar>)
};

export default RenderTxt;
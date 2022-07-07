import { useState } from 'react';
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
        if (value - 1 >= 0)
            setPageNumber(value - 1)
    }

    const zoomOut = () => {

    }

    const zoomIn = () => {

    }

    return(
    <SimpleBar className='viewer pdf'>
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
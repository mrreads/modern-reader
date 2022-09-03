import { ReactComponent as Trash } from '@/images/icons/trash.svg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';

import Tooltip from '@/components/Tooltip';

import useStore from '@/hooks/useStore'

import './index.scss';

import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const BookPdf = ({ book, extension }) => {
    const navigate = useNavigate();

    const [numPages, setNumPages] = useState(null);
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    const [ libraryStore ] = useStore('library');
    const { setCurrentBook, deleteBook } = libraryStore;

    const { t } = useTranslation('library');
    const handleClick = (id) => {
        setCurrentBook(id);
        navigate("/render");
    }
    const handleDelete = (obj, e) => {
        e.stopPropagation();
        deleteBook(obj);
    }

    return(
    <div className={`book ${extension}`} onClick={() => handleClick(book.id)}>

        <div className='book-cover pdf'>
            <Document file={book.path} onLoadSuccess={onDocumentLoadSuccess}>
                <Page height={100} pageNumber={1} />
            </Document>
        </div>


        <div className='book-info'>
            <p className='book-info__title'> { book.title } </p>
            <p className='book-info__subtitle percent'> {t('progress')}: { book.progress ?? '0' } {`/ ${numPages}`} </p>
        </div>

        <Tooltip text={t('delete_book')} customStyles={{ marginLeft: 'auto' }} align="left" noWordWrap>
            <div className='book-icon' onClick={(e) => handleDelete(book, e)}>
                <Trash fill='#FFFFFF' height={28} width={28} />
            </div>
        </Tooltip>
    </div>)
};

export default BookPdf;
import { useEffect, useState } from 'react';

import { ReactComponent as Trash } from '@/images/icons/trash.svg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';

import Tooltip from '@/components/Tooltip';

import useStore from '@/hooks/useStore'

const EPub = require("epub");
const fs = window.require('fs');

const BookEpub = ({ book, extension }) => {
    const navigate = useNavigate();

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

    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(null);
    const [cover, setCover] = useState(null);



    useEffect(() => {
        let epub = new EPub(book.path);
        epub.on("end", function(){
            setTitle(epub.metadata.title ? epub.metadata.title : book.title);
            setAuthor(epub.metadata.creator ? epub.metadata.creator : null);

            let coverImage = epub.metadata.cover;
            epub.getImage(coverImage, (error, img, mimeType) => {
                setCover(mimeType ? `data:${mimeType};base64, ${img.toString('base64')}` : null);
            });
        });
        epub.parse();
    }, []);

      


    return(
    <div className={`book ${extension}`} onClick={() => handleClick(book.id)}>

        { cover != null ? <img className='book-cover' src={cover} onError={(e) => e.target.style.display = 'none' } /> : null }

        <div className='book-info'>
            { author != null ? <p className='book-info__subtitle'> { author } </p> : null }
            <p className='book-info__title'> { title } </p>
            { book.progress ? <p className='book-info__subtitle percent'> { book.progress } </p> : null }
        </div>

        <Tooltip text={t('delete_book')} customStyles={{ marginLeft: 'auto' }} align="left" noWordWrap>
            <div className='book-icon' onClick={(e) => handleDelete(book, e)}>
                <Trash fill='#FFFFFF' height={28} width={28} />
            </div>
        </Tooltip>
    </div>)
};

export default BookEpub;
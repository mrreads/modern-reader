import { useState } from 'react';

import { ReactComponent as Trash } from '@/images/icons/trash.svg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';

import Tooltip from '@/components/Tooltip';

import useStore from '@/hooks/useStore'

import './index.scss';

import { parseEpub } from 'epub-parser-simple'
const fs = window.require('fs');

const Books = ({ book, extension }) => {
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
    (async () => {
        const parsed = await parseEpub(book.path);
        console.log(parsed)
        setTitle(parsed.title ? parsed.title : book.title);
        setAuthor(parsed.author ? parsed.author : null);
        setCover(parsed.cover ? parsed.cover.parsed_data[0].base64 : null);
    })();

    return(
    <div className={`book ${extension}`} onClick={() => handleClick(book.id)}>

        { cover != null ? <img className='book-cover' src={cover} onError={(e) => e.target.style.display = 'none' } /> : null }

        <div className='book-info'>
            <p className='book-info__title'> { title } </p>
            { author != null ? <p className='book-info__subtitle'> { author } </p> : null }
        </div>

        <Tooltip text={t('delete_book')} customStyles={{ marginLeft: 'auto' }} align="left" noWordWrap>
            <div className='book-icon' onClick={(e) => handleDelete(book, e)}>
                <Trash fill='#FFFFFF' height={28} width={28} />
            </div>
        </Tooltip>
    </div>)
};

export default Books;
import { ReactComponent as Trash } from '@/images/icons/trash.svg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';

import Tooltip from '@/components/Tooltip';

import useStore from '@/hooks/useStore'

import './index.scss';

const fs = window.require('fs');
const FB2HTML = require('fb2html');

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

    const fb2data = fs.readFileSync(book.path, 'utf8');
    const fb2book = new FB2HTML(fb2data, { hyphenate: true });
    const title = (fb2book.getTitle()) ? fb2book.getTitle() : book.title;
    const authors = (fb2book.getAuthors()) ? fb2book.getAuthors() : null;
    const cover = (fb2book.getCover()) ? fb2book.getCover() : null;

    return(
    <div className={`book ${extension}`} onClick={() => handleClick(book.id)}>

        { cover != null ? <img className='book-cover' src={cover} /> : null }

        <div className='book-info'>
            <p className='book-info__title'> { title } </p>
            { authors != null ? <p className='book-info__subtitle'> { authors } </p> : null }
        </div>

        <Tooltip text={t('delete_book')} customStyles={{ marginLeft: 'auto' }} align="left" noWordWrap>
            <div className='book-icon' onClick={(e) => handleDelete(book, e)}>
                <Trash fill='#FFFFFF' height={28} width={28} />
            </div>
        </Tooltip>
    </div>)
};

export default Books;
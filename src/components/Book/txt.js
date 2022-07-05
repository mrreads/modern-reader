import { ReactComponent as Trash } from '@/images/icons/trash.svg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';

import Tooltip from '@/components/Tooltip';

import useStore from '@/hooks/useStore'

import './index.scss';

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

    return(
    <div className={`book ${extension}`} onClick={() => handleClick(book.id)}>
        <p> {book.title} </p>
            <Tooltip text={t('delete_book')} customStyles={{ marginLeft: 'auto' }} align="left" noWordWrap>
                <div className='book-icon' onClick={(e) => handleDelete(book, e)}>
                    <Trash fill='#FFFFFF' height={28} width={28} />
                </div>
            </Tooltip>
    </div>)
};

export default Books;
import PropTypes from 'prop-types';

import Tooltip from '@/components/Tooltip';

import useStore from '@/hooks/useStore'

import './index.scss';

const Books = ({ book }) => {
    const [ libraryStore ] = useStore('library');
    const { setCurrentBook, deleteBook } = libraryStore;

    const handleClick = (id) => {
        setCurrentBook(id);
    }
    const handleDelete = (obj) => {
        deleteBook(obj);
    }

    return(
    <div className='book' onClick={() => handleClick(book.id)}>
        <Tooltip text={book.path} noWordWrap> 
            <p> {book.title} </p>
        </Tooltip>
    </div>)
};

export default Books;
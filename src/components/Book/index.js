import PropTypes from 'prop-types';

import Tooltip from '@/components/Tooltip';

import useStore from '@/hooks/useStore'

import './index.scss';

const Books = ({ book }) => {
    const [ libraryStore ] = useStore('library');
    const { setCurrentBook } = libraryStore;

    const handleClick = (path) => {
        setCurrentBook(path);
    }

    return(
    <div className='book' onClick={() => handleClick(book.path)}>
        <Tooltip text={book.path} noWordWrap> 
            <p> {book.title} </p>
        </Tooltip>
    </div>)
};

export default Books;
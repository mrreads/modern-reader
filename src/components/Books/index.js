import PropTypes from 'prop-types';

import Book from '@/components/Book'
import './index.scss';

const Books = ({ data }) => {

    console.log(data);

    return (
        <div className='books'>
            {
                data.map(book => {
                    return (<Book book={book} key={book.path} />)
                })
            }
        </div>
    );
};

export default Books;
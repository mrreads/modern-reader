import PropTypes from 'prop-types';

import Tooltip from '@/components/Tooltip';

import './index.scss';

const Books = ({ book }) => {

    <div className='book'>
        <Tooltip text={book.path} noWordWrap> 
            <p> {book.title} </p>
        </Tooltip>
    </div>
};

export default Books;
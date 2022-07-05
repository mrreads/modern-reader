import PropTypes from 'prop-types';

import BookTxt from '@/components/Book/txt'
import './index.scss';

const Books = ({ data }) => {


    return (
        <div className='books'>
            {
                data.map(book => 
                {
                    let extension = book.path.split('.').pop();
                    switch(extension) {
                        case 'txt':
                            return (<BookTxt book={book} extension={extension} key={book.id} />)
                            
                    }
                    
                })
            }
        </div>
    );
};

export default Books;
import PropTypes from 'prop-types';

import BookTxt from '@/components/Book/txt'
import BookFb2 from '@/components/Book/fb2'
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
                        case 'fb2':
                            return (<BookFb2 book={book} extension={extension} key={book.id} />)
                            
                    }
                    
                })
            }
        </div>
    );
};

export default Books;
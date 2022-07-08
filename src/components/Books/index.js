import PropTypes from 'prop-types';

import BookTxt from '@/components/Book/txt'
import BookFb2 from '@/components/Book/fb2'
import BookEpub from '@/components/Book/epub'
import BookPdf from '@/components/Book/pdf'

import './index.scss';

const Books = ({ data }) => {

    return (
        <div className='books'>
            {
                data.map(book => 
                {
                    switch(book.ext) {
                        case 'txt':
                            return (<BookTxt book={book} extension={book.ext} key={book.id} />)
                        case 'fb2':
                            return (<BookFb2 book={book} extension={book.ext} key={book.id} />)
                        case 'epub':
                            return (<BookEpub book={book} extension={book.ext} key={book.id} />)
                        case 'pdf':
                            return (<BookPdf book={book} extension={book.ext} key={book.id} />)
                            
                    }
                    
                })
            }
        </div>
    );
};

export default Books;
import React from 'react';
import Book from './Book/Book';

class Books extends React.Component
{
    render(props)
    {
        return (
        <div id="content">
            <div className="title"> 
                <p> Books </p>
            </div>
            <hr/>
            
            <div className="books">
                { this.props.data.map((book, i) => <Book data={book} key={i} /> ) }
            </div>

        </div>);
    }
}

export default Books;
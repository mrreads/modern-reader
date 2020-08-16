import React, { useState } from 'react';
import Book from './Book/Book';
import Modal from './Modal/Modal';

export default function(props)
{
    const [getModalStatus, setModalStatus] = useState(false);

    const showModal = () =>
    {
        setModalStatus(true);
    }

    return (
    <div id="content" className="books">
        <div className="title">
            <p> Library </p>

            <div className="add" id="addPopup" onClick={ showModal }>

                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="44" height="44" viewBox="0 0 24 24" fill="none">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>

            </div>
        </div>

        <hr/>

        <div className="books">
            { props.books.getBooks.map((book, i) => <Book data={ book } key={i} /> ) }
        </div>

        <Modal getModalStatus={ getModalStatus } setModalStatus={ setModalStatus } setBooks={ props.books.setBooks } />
    </div>);
}
import React, { useState } from 'react';
import Book from './Book/Book';
import Modal from './Modal/Modal';

import { IconButton, Icon, ButtonToolbar, Divider, Alert } from 'rsuite';

import { useTranslation } from 'react-i18next';

const fs = window.require('fs');
const userPath = require('./../../storage').userPath;

export default function(props)
{
    const { t } = useTranslation('books');

    const [getModalStatus, setModalStatus] = useState(false);

    const showModal = () =>
    {
        setModalStatus(true);
    }

    const deleteBook = (e, book) =>
    {
        e.preventDefault();

        let allBooks = [...props.books.getBooks];
        let forDelete = book;
        let newBooks = allBooks.filter(book => book.path !== forDelete.path);
        fs.writeFileSync(userPath.books, JSON.stringify(newBooks));
        props.books.setBooks(JSON.parse(fs.readFileSync(userPath.books, 'utf8')));
        Alert.info(t('delete'));
    }

    return (
    <div id="content">
    
        <div className="title">
            <h4> { t('library') } </h4>

            <ButtonToolbar>
                 <IconButton onClick={ showModal } icon={ <Icon icon="save"/> }  />
            </ButtonToolbar>

        </div>

        <Divider />

        <div className="books">
            { props.books.getBooks.map((book, i) => <Book data={ book } key={i} delete={ deleteBook }/> ) }
        </div>

        <Modal getModalStatus={ getModalStatus } setModalStatus={ setModalStatus } setBooks={ props.books.setBooks } getBooks={ props.books.getBooks } />
    </div>);
}
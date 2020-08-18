import React, { useState } from 'react';
import Book from './Book/Book';
import Modal from './Modal/Modal';

import { IconButton, Icon, ButtonToolbar } from 'rsuite';

import { useTranslation } from 'react-i18next';

export default function(props)
{
    const { t } = useTranslation('books');

    const [getModalStatus, setModalStatus] = useState(false);

    const showModal = () =>
    {
        setModalStatus(true);
    }

    return (
    <div id="content" className="books">
        <div className="title">
            <p> { t('library') } </p>

            <ButtonToolbar>
                 <IconButton onClick={ showModal } icon={ <Icon icon="file-upload"/> }  />
            </ButtonToolbar>

        </div>

        <hr/>

        <div className="books">
            { props.books.getBooks.map((book, i) => <Book data={ book } key={i} /> ) }
        </div>

        <Modal getModalStatus={ getModalStatus } setModalStatus={ setModalStatus } setBooks={ props.books.setBooks } />
    </div>);
}
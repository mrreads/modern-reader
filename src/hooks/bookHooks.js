import { useState } from 'react';

const fs = window.require('fs');
const userPath = require('./../storage').userPath;

export default function()
{
    const [getBooks, setBooks] = useState(JSON.parse(fs.readFileSync(userPath.books, 'utf8')));

    return ({
        getBooks: getBooks,
        setBooks: setBooks
    });
}
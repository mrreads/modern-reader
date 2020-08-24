import { useState } from 'react';

const fs = window.require('fs');
const userPath = require('./../storage').userPath;

export default function()
{
    const [getCurrentBook, setCurrentBook] = useState(0);
    const [getProgress, setProgress] = useState(0);

    const [getBooks, setBooks] = useState(JSON.parse(fs.readFileSync(userPath.books, 'utf8')));

    return ({
        getBooks: getBooks,
        setBooks: setBooks,

        getCurrentBook: getCurrentBook,
        setCurrentBook: setCurrentBook,

        getProgress: getProgress,
        setProgress: setProgress
    });
}
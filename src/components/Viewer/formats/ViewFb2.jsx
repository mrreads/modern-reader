import React, { useState} from 'react';
import { withRouter  } from 'react-router-dom';

import Parser from 'html-react-parser';

const fs = window.require('fs');

function Viewer(props)
{
    let textBook;

    let fb2data = fs.readFileSync(props.book.path, 'utf8');
    const FB2HTML = require('fb2html');
    const fb2book = new FB2HTML(fb2data);
    textBook = fb2book.getBody();

    const [content] = useState(textBook);

    return (Parser(content));;
}

export default withRouter(Viewer);
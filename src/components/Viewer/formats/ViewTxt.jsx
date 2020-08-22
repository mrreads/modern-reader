import React, { useState} from 'react';
import { withRouter  } from 'react-router-dom';

import Parser from 'html-react-parser';

const fs = window.require('fs');

function Viewer(props)
{
    let textBook;
    textBook = fs.readFileSync(props.book.path, 'utf8');
   
    const [content] = useState(textBook);

    return (Parser(content));
}

export default withRouter(Viewer);
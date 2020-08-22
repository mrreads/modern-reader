import React, { useState} from 'react';
import { withRouter  } from 'react-router-dom';
import { parseEpub } from '@gxl/epub-parser'

import Parser from 'html-react-parser';

function Viewer(props)
{
    const fs = window.require('fs');
    
    let textBook;
    textBook = 'epub';

    const epubObj = parseEpub(props.book.path, {
        type: 'path',
      });
      
      console.log('epub content:', epubObj)

    const [content] = useState(textBook);

    return (Parser(content));
}

export default withRouter(Viewer);
import React, { useState} from 'react';
import { withRouter  } from 'react-router-dom';

import Parser from 'html-react-parser';

function Viewer(props)
{
    let textBook;
    textBook = 'epub';

    const [content] = useState(textBook);

    return (Parser(content));
}

export default withRouter(Viewer);
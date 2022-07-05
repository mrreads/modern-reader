import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import './index.scss';

const fs = window.require('fs');

const RenderTxt = ({ path }) => {

    let textBook;
    textBook = fs.readFileSync(path, 'utf8');
    textBook = Parser(textBook);

    return(
    <SimpleBar className='viewer txt' forceVisible="y" autoHide={false}>
        { textBook }
    </SimpleBar>)
};

export default RenderTxt;
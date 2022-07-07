import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import './index.scss';

const fs = window.require('fs');

const FB2HTML = require('fb2html');

const RenderTxt = ({ path }) => {

    const fb2data = fs.readFileSync(path, 'utf8');
    const fb2book = new FB2HTML(fb2data, { hyphenate: true });
    const fb2formated = fb2book.getBody();
    const render = Parser(fb2formated);

    return(
    <SimpleBar className='viewer fb2' forceVisible="y" autoHide={false}>
        { render }
    </SimpleBar>)
};

export default RenderTxt;
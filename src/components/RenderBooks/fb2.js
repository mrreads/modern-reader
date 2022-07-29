import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

import { useEffect, useRef } from 'react';

import { observer } from 'mobx-react-lite';
import useStore from '@/hooks/useStore'

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import './index.scss';

const fs = window.require('fs');

const FB2HTML = require('fb2html');

const RenderFb2 = observer(({ book }) => {
    const { path } = book;

    const [ libraryStore ] = useStore('library');
    const { updateProgress } = libraryStore;

    const fb2data = fs.readFileSync(path, 'utf8');
    const fb2book = new FB2HTML(fb2data, { hyphenate: true });
    const fb2formated = fb2book.getBody();
    const render = Parser(fb2formated);

    const viewerRef = useRef();
    let scrollValue = book.scrollTop;
    const handleScroll = (e) => {
        let scrollTop = viewerRef.current.el.querySelector('.simplebar-content-wrapper').scrollTop;
        scrollValue = scrollTop;
    };

    useEffect(() => {
        let viewerWrapper = viewerRef.current.el.querySelector('.simplebar-content-wrapper');
        let fullViewerHeight = viewerRef.current.el.querySelector('.simplebar-content').clientHeight;

        viewerWrapper.scrollTo(0, book.scrollTop)
        viewerWrapper.addEventListener('scroll', handleScroll);

        return () => {
            let progres = Math.floor(parseInt(scrollValue) / (parseInt(fullViewerHeight - window.innerHeight)) * 100);
            progres = Math.max(0, Math.min(100, progres));
            updateProgress(book, scrollValue, progres);
            viewerWrapper.removeEventListener('scroll', handleScroll); 
        }
    }, [])

    return(
    <SimpleBar className='viewer fb2' forceVisible="y" autoHide={false} ref={viewerRef}>
        { render }
    </SimpleBar>)
});

export default RenderFb2;
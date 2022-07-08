import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import { observer } from 'mobx-react-lite';
import useStore from '@/hooks/useStore'

import './index.scss';
import { useEffect, useRef } from 'react';

const fs = window.require('fs');

const RenderTxt = observer(({ book }) => {
    const { path } = book;

    const [ libraryStore ] = useStore('library');
    const { updateProgress } = libraryStore;

    const viewerRef = useRef();

    let file = fs.readFileSync(path, 'utf8');
    let text = Parser(file);

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
    <SimpleBar className='viewer txt' forceVisible="y" autoHide={false} ref={viewerRef} >
        { text }
    </SimpleBar>)
});

export default RenderTxt;
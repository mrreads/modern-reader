import { useRef, useEffect } from 'react';

import { ReactComponent as Minimize } from '@/images/icons/minimize.svg';
import { ReactComponent as Resize } from '@/images/icons/resize.svg';
import { ReactComponent as Close } from '@/images/icons/close.svg';

import './index.scss';

export default () => {

    const minimizeRef = useRef();
    const resizeRef = useRef();
    const closeRef = useRef();

    useEffect(() => {

    }, []);

    return (
        <div className='titlebar-wrapper'>

            <div className='titlebar-element' ref={minimizeRef}>
                <Minimize fill='#FFFFFF' height={10} width={10} />
            </div>

            <div className='titlebar-element' ref={resizeRef}>
                <Resize fill='#FFFFFF' height={10} width={10} />
            </div>

            <div className='titlebar-element' ref={closeRef}>
                <Close fill='#FFFFFF' height={10} width={10} />
            </div>

        </div>
    );
};

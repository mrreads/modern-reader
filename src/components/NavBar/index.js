import { NavLink } from 'react-router-dom';

import { ReactComponent as Book } from '@/images/icons/book.svg';
import { ReactComponent as Library } from '@/images/icons/library.svg';
import { ReactComponent as Setting } from '@/images/icons/setting.svg';

import { observer } from 'mobx-react-lite';
import useStore from '@/hooks/useStore'

import Tooltip from '@/components/Tooltip';

import './index.scss';
import { useEffect, useState } from 'react';

const fs = window.require('fs');
const FB2HTML = require('fb2html');

const NavBar = observer(() => {
    const [ libraryStore ] = useStore('library');
    const { current, getCurrentBook } = libraryStore;

    return (
        <div className='navbar-wrapper'>

            {(() => {
                if (current == null)
                    return (<div className='navbar-element disable'> 
                        <Book fill='#FFFFFF' height={28} width={28} /> 
                        </div>)
                else
                    return (<Tooltip text={getCurrentBook(current).title} align="right" customStyles={{ width: '100%' }} noWordWrap>
                                <NavLink to="/render" className='navbar-element'> 
                                    <Book fill='#FFFFFF' height={28} width={28} /> 
                                </NavLink>
                            </Tooltip>)
            })()}

            <NavLink to="/" className='navbar-element'> 
                <Library fill='#FFFFFF' height={30} width={30} />
            </NavLink>

            <NavLink to="/setting" className='navbar-element'>
                <Setting fill='#FFFFFF' height={32} width={32} />
            </NavLink>
        </div>
    );
});

export default NavBar;
import { NavLink } from 'react-router-dom';

import { ReactComponent as Book } from '@/images/icons/book.svg';
import { ReactComponent as Library } from '@/images/icons/library.svg';
import { ReactComponent as Setting } from '@/images/icons/setting.svg';

import { observer } from 'mobx-react-lite';
import useStore from '@/hooks/useStore'

import Tooltip from '@/components/Tooltip';

import './index.scss';

const fs = window.require('fs');
const FB2HTML = require('fb2html');

const NavBar = observer(() => {
    const [ libraryStore ] = useStore('library');
    const { current, getCurrentBook } = libraryStore;

    const [ settingStore ] = useStore('settings');
    const { lightMode } = settingStore;

    let header = '';

    if (current)
    {
        const { ext, title, path } = getCurrentBook(current);
        header = title;
        if (ext == 'fb2')
        {
            const fb2data = fs.readFileSync(path, 'utf8');
            const fb2book = new FB2HTML(fb2data, { hyphenate: true });
            header = (fb2book.getTitle()) ? fb2book.getTitle() : header;
        }
    }

    return (
        <div className='navbar-wrapper'>

            {(() => {
                if (current == null)
                    return (<div className='navbar-element disable'> 
                        <Book fill={(lightMode) ? '#292a2d' : '#FFFFFF'} height={28} width={28} /> 
                        </div>)
                else
                    return (<Tooltip text={header} align="right" customStyles={{ width: '100%' }} noWordWrap>
                                <NavLink to="/render" className='navbar-element'> 
                                    <Book fill={(lightMode) ? '#292a2d' : '#FFFFFF'} height={28} width={28} /> 
                                </NavLink>
                            </Tooltip>)
            })()}

            <NavLink to="/" className='navbar-element'> 
                <Library fill={(lightMode) ? '#292a2d' : '#FFFFFF'} height={30} width={30} />
            </NavLink>

            <NavLink to="/setting" className='navbar-element'>
                <Setting fill={(lightMode) ? '#292a2d' : '#FFFFFF'} height={32} width={32} />
            </NavLink>
        </div>
    );
});

export default NavBar;
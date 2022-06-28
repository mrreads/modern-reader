import { NavLink } from 'react-router-dom';

import { ReactComponent as Book } from '@/images/icons/book.svg';
import { ReactComponent as Setting } from '@/images/icons/setting.svg';

import './index.scss';

export default () => {
    return (
        <div className='navbar-wrapper'>

            <NavLink to="/" className='navbar-element' activeClassName="active">
                <Book fill='#FFFFFF' height={28} width={28} />
            </NavLink>


            <NavLink to="/setting" className='navbar-element' ctiveClassName="active">
                <Setting fill='#FFFFFF' height={32} width={32} />
            </NavLink>
        </div>
    );
};

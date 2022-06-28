import './index.scss';

import { ReactComponent as Book } from '@/images/icons/book.svg';
import { ReactComponent as Setting } from '@/images/icons/setting.svg';

export default () => {
    return (
        <div className='navbar-wrapper'>

            <div className='navbar-element'>
                <Book fill='#FFFFFF' height={31} width={31} />
            </div>

            <div className='navbar-element'>
                <Setting fill='#FFFFFF' height={32} width={32} />
            </div>

        </div>
    );
};

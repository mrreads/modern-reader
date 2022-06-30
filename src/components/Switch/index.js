import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const Switch = ({ callback, defaultValue }) => {
    const [checked, setChecked] = useState(defaultValue ? defaultValue : false);
    const toggleChecked = () => {
        let value = !checked;
        setChecked(value)
    }

    
    useEffect(() => {
        if (callback)
            callback(); 
    }, [checked]); // eslint-disable-next-line
    
    return (
        <div className={`switch ${(checked) ? 'active' : ''}`} onClick={toggleChecked}>
            <div className='switch__slider'></div>
        </div>
    );
};

export default Switch;

Switch.propTypes = {
    callback: PropTypes.func,
    defaultValue: PropTypes.bool
}
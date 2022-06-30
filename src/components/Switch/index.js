import { useEffect, useState } from 'react';
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
    }, [checked]);
    
    return (
        <div className={`switch ${(checked) ? 'active' : ''}`} onClick={toggleChecked}>
            <div className='switch__slider'></div>
        </div>
    );
};

export default Switch;
import { useState, useRef  } from 'react';
import PropTypes from 'prop-types';

import useOnClickOutside from '@/hooks/useOnClickOutside'

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import './index.scss';

const Select = ({ data, callback, defaltValue }) => {
    const ref = useRef(null)
    const [value, setValue] = useState((defaltValue) ? data.filter(lang => lang.value == defaltValue)[0].name : '');

    const [opened, setOpened] = useState(false);
    const toggleOpen = () => {
        let value = !opened;
        setOpened(value);
    }

    const closeSelect = () => {
        setOpened(false)
    }

    const selectOption = (option) => {
        setOpened(false);
        setValue(option.name)
        if (callback)
            callback(option.value);
    }

    useOnClickOutside(ref, closeSelect)

    return (
        <div className={`select-wrapper ${(opened) ? 'active' : ''}`} ref={ref}>

            <div className='select-value' onClick={toggleOpen}>
                <p> { value } </p>
            </div>

            <SimpleBar className='select-dropdown'>
                { data.map(option => {
                    return (<p key={option.value} className='select-dropdown__element' onClick={() => selectOption(option)}> {option.name} </p>)
                }) }
            </SimpleBar>

        </div>
    )
}

export default Select;

Select.propTypes = {
    data: PropTypes.array.isRequired,
    callback: PropTypes.func,
    defaltValue: PropTypes.string
}
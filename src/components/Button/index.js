import PropTypes, { func } from 'prop-types';

import './index.scss';

const Button = ({ text, height, width, callback }) => {

    const handleClick = () => {
        if (callback)
            callback();
    }

    return (
        <button className='button' style={{ height: `${height}px`, width: `${width}px` }} onClick={handleClick}>
            { text }
        </button>
    );
};

export default Button;

Button.propTypes = {
    text: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    callback: PropTypes.func
}
import PropTypes from 'prop-types';

import './index.scss';

const Hr = ({ height = 2, top = 0, bottom = 35 }) => {
    console.log(height)
    return (
        <div className='hr' style={{ height: `${height}px`, marginTop: `${top}px`, marginBottom: `${bottom}px` }}>
        </div>
    );
};

export default Hr;

Hr.propTypes = {
    height: PropTypes.number,
    top: PropTypes.number,
    bottom: PropTypes.number
}
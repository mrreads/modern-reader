import PropTypes from 'prop-types';

import './index.scss';

const Tooltip = ({ text, children, align, noWordWrap, customStyles }) => {
    return (
        <div className={`tooltip ${align}`} style={customStyles}>
            { children }
            <div className={`tooltip__text ${noWordWrap ? 'noWordWrap' : ''}`}> { text } </div>
        </div>
    );
};

export default Tooltip;

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    align: PropTypes.string,
    noWordWrap: PropTypes.bool,
    customStyles: PropTypes.object
}
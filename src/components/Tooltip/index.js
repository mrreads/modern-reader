import PropTypes from 'prop-types';

import './index.scss';

const Tooltip = ({ text, children, align, noWordWrap }) => {
    return (
        <div className={`tooltip ${(align === 'right' ? 'right' : '')}`}>
            { children }
            <div className={`tooltip__text ${noWordWrap ? 'noWordWrap' : ''}`}> { text } </div>
        </div>
    );
};

export default Tooltip;

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    align: PropTypes.string,
    noWordWrap: PropTypes.bool
}
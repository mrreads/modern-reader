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
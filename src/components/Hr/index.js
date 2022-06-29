import './index.scss';

const Hr = ({ height = 1, top = 0, bottom = 35 }) => {
    return (
        <div className='hr' style={{ height: `${height}px`, marginTop: `${top}px`, marginBottom: `${bottom}px` }}>
        </div>
    );
};

export default Hr;
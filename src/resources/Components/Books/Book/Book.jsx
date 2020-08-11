import React from 'react';

const fs = window.require('fs');

class Book extends React.Component
{
    render()
    {
        return (
        <div className='book'>
            <p className={(fs.existsSync(this.props.data.path)) ? "name" : "name error" }> <strong> {this.props.data.name} </strong> </p>

            <div className="info">
                <p className="format">Format: <i> {this.props.data.ext} </i> </p>
                <p>Strings: <i> {this.props.data.strings} </i> </p>
            </div>
        </div>);
    }
}

export default Book;
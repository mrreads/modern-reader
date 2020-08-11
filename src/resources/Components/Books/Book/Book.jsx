import React from 'react';
import { Link } from "react-router-dom";

const fs = window.require('fs');

class Book extends React.Component
{
    render()
    {
        return (
        <Link to="/viewer" className='book'>
            <p className={(fs.existsSync(this.props.data.path)) ? "name" : "name error" }> <strong> {this.props.data.name} </strong> </p>

            <div className="info">
                <p className="format">Format: <i> {this.props.data.ext} </i> </p>
                <p>Strings: <i> {this.props.data.strings} </i> </p>
            </div>
        </Link>);
    }
}

export default Book;
import React from 'react';

const fs = window.require('fs');

class Viewer extends React.Component
{
    constructor()
    {
        super();
    }

    render()
    {
        return (
        <div id="content">
            <div id="viewer">
                
                <div className="content"></div>

            </div>
        </div>);
    }
}

export default Viewer;
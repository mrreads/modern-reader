import React from 'react';

class Modal extends React.Component
{
    onClose = (e) => { this.props.onClose && this.props.onClose(e); };

    render(props)
    {
        if (!this.props.show)
        {
            return null
        }
        return (
        <div id="popupWrapper">
            <div id="popupUpload">
        
                <div className="close" onClick={this.onClose}>                
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" viewBox="0 0 24 24" stroke="#2c3e50" fill="none">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>
            
                <div id="uploadFileBook">
                    <p> Select book to load </p>
                </div>
                
                <div className="inputName">
                    <p> Title: </p>
                    <input type="text" />
                </div>
        
                <div id="loadBook"> Add book </div>
            </div>
        </div>)
    }
}

export default Modal;
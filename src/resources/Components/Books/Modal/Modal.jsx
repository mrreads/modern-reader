import React from 'react';

const path = window.require('path'); 
const electron = window.require('electron'); 
const dialog = electron.remote.dialog; 

class Modal extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            isSelected: false,
            bookFile: 'Select file to load',
            bookName: 'Book title',
            bookPath: ''
        }
    }

    onClose = (e) => { this.props.onClose && this.props.onClose(e); };

    changeName = (e) =>
    {
        this.setState({bookName: e.target.value});
    }

    openFile()
    {
        if (process.platform !== 'darwin') 
        {  
            dialog.showOpenDialog({ 
                title: 'Select the File to be open:', 
                defaultPath: path.join(__dirname, '../assets/'), 
                buttonLabel: 'Open', 

                filters: [ { 
                    name: 'Books format', 
                    extensions: ['txt', 'fb2'] 
                }, ], 
                
                properties: ['openFile'] 
            }).then(file => 
            { 
                if (!file.canceled) 
                { 
                    global.filepath = file.filePaths[0].toString();
                    this.setState({isSelected: true});
                    this.setState({bookFile: path.basename(global.filepath)});
                    this.setState({bookName: path.basename(global.filepath, path.extname(global.filepath))});
                    this.setState({bookPath: global.filepath});
                }   
            }).catch(err => { console.log(err) }); 
        } 
        else 
        { 
            dialog.showOpenDialog({ 
                title: 'Select the File to be open:', 
                defaultPath: path.join(__dirname, '../assets/'), 
                buttonLabel: 'Open', 
                
                filters: [ { 
                    name: 'Text Files', 
                    extensions: ['txt', 'docx'] 
                }, ], 
                
                properties: ['openFile', 'openDirectory'] 
            }).then(file => 
            { 
                if (!file.canceled) 
                { 
                    global.filepath = file.filePaths[0].toString();
                    this.setState({isSelected: true});
                    this.setState({bookFile: path.basename(global.filepath)});
                    this.setState({bookName: path.basename(global.filepath, path.extname(global.filepath))});
                    this.setState({bookPath: global.filepath});
                }   
            }).catch(err => { console.log(err) }); 
        }
    }
    
    uplodDFile = () =>
    {
        
    }

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
            
                <div id="uploadFileBook" onClick={() => this.openFile()}>
                    <p> {this.state.bookFile} </p>
                </div>
                
                <div className="inputName">
                    <p> Title: </p>
                    <input type="text" value={this.state.bookName} onChange={this.changeName} />
                </div>
        
                <div id="loadBook" className={!this.state.isSelected ? "disabled" : ""} onClick={this.uplodDFile}> Add book </div>
            </div>
        </div>)
    }
}

export default Modal;
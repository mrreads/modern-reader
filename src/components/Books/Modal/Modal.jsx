import React, { useState } from 'react';

const userPath = require('../../../storage').userPath;

const fs = window.require('fs'); 
const path = window.require('path'); 
const electron = window.require('electron'); 
const dialog = electron.remote.dialog; 

export default function(props)
{
    const [getModalInfo, setModalInfo] = useState({
        isSelected: false,
        bookFile: 'Select file to load',
        bookName: 'Book title',
        bookPath: ''
    });

    const onClose = (e) => { props.setModalStatus(false) };

    const changeName = (e) =>
    {
        setModalInfo({...getModalInfo, bookName: e.target.value});
    }

    const openFile = () =>
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
                    let infoForUpload =
                    {
                        isSelected: true,
                        bookFile: path.basename(global.filepath),
                        bookName: path.basename(global.filepath, path.extname(global.filepath)),
                        bookPath: global.filepath
                    }
                    setModalInfo(infoForUpload);
                }   
            }).catch(err => { console.log(err) });
        }
    }
    
    const uploadFile = () =>
    {
        if (getModalInfo.isSelected)
        {
            let ext = path.extname(getModalInfo.bookPath);

            let currentJson = JSON.parse(fs.readFileSync(userPath.books, 'utf8'));
    
            if (ext === '.txt' || 
                ext === '.fb2')
            {
                let data = {
                    "name": getModalInfo.bookName,
                    "ext": ext,
                    "path": getModalInfo.bookPath,
                    "strings": fs.readFileSync(getModalInfo.bookPath).toString().split('\n').length
                }
                
                currentJson.push(data);
                fs.writeFileSync(userPath.books, JSON.stringify(currentJson));
                props.setBooks(JSON.parse(fs.readFileSync(userPath.books, 'utf8')));
                onClose();
            }
        }
    }

    if (!props.getModalStatus)
    {
        return null
    }
    return (
    <div id="popupWrapper">
        <div id="popupUpload">

            <div className="close" onClick={ onClose }>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" viewBox="0 0 24 24" stroke="#2c3e50" fill="none">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </div>

            <div id="uploadFileBook" onClick={ openFile }>
                <p> { getModalInfo.bookFile } </p>
            </div>

            <div className="inputName">
                <p> Title: </p>
                <input type="text" value={ getModalInfo.bookName } onChange={ changeName } />
            </div>

            <div id="loadBook" className={!getModalInfo.isSelected ? "disabled" : ""} onClick={ uploadFile } > Add book </div>
        </div>
    </div>);
}
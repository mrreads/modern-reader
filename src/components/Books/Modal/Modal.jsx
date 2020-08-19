
import React, { useState } from 'react';

import { Input, InputGroup , Modal, Button } from 'rsuite';

import { useTranslation } from 'react-i18next';

const userPath = require('../../../storage').userPath;

const fs = window.require('fs'); 
const path = window.require('path'); 
const electron = window.require('electron'); 
const dialog = electron.remote.dialog; 




export default function(props)
{
    const { t } = useTranslation('modal');
    
    const [getModalInfo, setModalInfo] = useState({
        isSelected: false,
        bookFile: t('select'),
        bookName: 'Book title',
        bookPath: ''
    });

    const onClose = (e) => { props.setModalStatus(false) };

    const changeName = (value) =>
    {
        setModalInfo({...getModalInfo, bookName: value});
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
    
    return (
            <Modal full sbackdrop={ true } show={ props.getModalStatus } onHide={ onClose }>

                <Modal.Header>
                    <Modal.Title> { t('load') } </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                <div onClick={ openFile } className="rs-modal-body" style={{ overflow: 'auto', maxHeight: '430px'}} >
                    <div className="rs-uploader rs-uploader-text rs-uploader-draggable">
                        <div className="rs-uploader-trigger rs-uploader-trigger-customize">
                            <div className="rs-uploader-trigger-btn" style={{ lineHeight: '200px' }}> { getModalInfo.bookFile } </div>
                        </div>
                        <div className="rs-uploader-file-items"></div>
                    </div>
                </div>


                    <InputGroup style={{ width: '100%', marginBottom: 10 }}>
                        <InputGroup.Addon> { t('title') } </InputGroup.Addon>
                        <Input placeholder={ getModalInfo.bookName } onChange={ changeName } />
                    </InputGroup>

                </Modal.Body>

                <Modal.Footer>
                    <Button color="red" disabled={ !getModalInfo.isSelected } onClick={ uploadFile }> { t('add') } </Button>
                </Modal.Footer>
            </Modal>);
}
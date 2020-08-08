const addBookButton = document.querySelector("#addBook");

global.filepath = undefined; 

addBookButton.addEventListener('click', () => 
{ 
    if (process.platform !== 'darwin') 
    {  
          dialog.showOpenDialog({ 
            title: 'Select the File to be open:', 
            defaultPath: path.join(__dirname, '../assets/'), 
            buttonLabel: 'Open', 

            filters: [ { 
                name: 'Books format', 
                extensions: ['txt'] 
            }, ], 
            
            properties: ['openFile'] 
        }).then(file => 
        { 
            console.log(file.canceled); 
            if (!file.canceled) 
            { 
              global.filepath = file.filePaths[0].toString(); 
              console.log(global.filepath); 
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
            console.log(file.canceled); 
            if (!file.canceled) 
            { 
              global.filepath = file.filePaths[0].toString(); 
              console.log(global.filepath); 
            }   
        }).catch(err => { console.log(err) }); 
    } 
});
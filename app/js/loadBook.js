if (document.querySelector("#popupWrapper"))
{
    const popupWrapper = document.querySelector("#popupWrapper");
    const addPopup = document.querySelector("#addPopup");
    global.filepath = undefined; 
    
    const inputName = document.querySelector('.inputName input');

    addPopup.addEventListener('click', () => {
        popupWrapper.classList.remove('hide');
    });

    popupWrapper.querySelector(".close").addEventListener('click', () => {
        popupWrapper.classList.add('hide');
    });

    document.querySelector('#uploadFileBook').addEventListener('click', () => 
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
                    document.querySelector('#uploadFileBook').textContent = path.basename(global.filepath);
                    inputName.value = path.basename(global.filepath, path.extname(global.filepath));
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
                    document.querySelector('#uploadFileBook').textContent = path.basename(global.filepath);
                    inputName.value = path.basename(global.filepath, path.extname(global.filepath));
                }   
            }).catch(err => { console.log(err) }); 
        } 
    });

    document.querySelector('#loadBook').addEventListener('click', () => {
        saveJson(inputName.value, global.filepath);
        popupWrapper.querySelector(".close").click();
    });
}

function saveJson(bookName, bookPath)
{
    ext = path.extname(bookPath);

    currentJson = JSON.parse(fs.readFileSync(dataBooksPath, 'utf8'));

    if (ext == '.txt')
    {
        data = {
            "name": bookName,
            "ext": ext,
            "path": bookPath,
            "strings": fs.readFileSync(bookPath).toString().split('\n').length
        }
        
        currentJson.push(data);
        fs.writeFileSync(dataBooksPath, JSON.stringify(currentJson));   
    }

    library.updateLibrary();
}
if (document.querySelector("#addBook"))
{
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
                    extensions: ['txt', 'fb2'] 
                }, ], 
                
                properties: ['openFile'] 
            }).then(file => 
            { 
                if (!file.canceled) 
                { 
                    global.filepath = file.filePaths[0].toString();
                    saveJson(global.filepath);
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
                    saveJson(global.filepath);
                }   
            }).catch(err => { console.log(err) }); 
        } 
    });
}

function saveJson(bookPath)
{
    ext = path.extname(bookPath);

    currentJson = JSON.parse(fs.readFileSync(dataBooksPath, 'utf8'));

    if (ext == '.txt')
    {
        data = {
            "name": path.basename(bookPath, ext),
            "ext": ext,
            "path": bookPath,
            "strings": fs.readFileSync(bookPath).toString().split('\n').length
        }
        
        currentJson.push(data);
        fs.writeFileSync(dataBooksPath, JSON.stringify(currentJson));   
    }

    library.updateLibrary();
}
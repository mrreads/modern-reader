const { app, BrowserWindow, globalShortcut, ipcMain, dialog, ipcRenderer } = require("electron");
const isDev = require('electron-is-dev');   
const path = require('path');

let win, splash;
app.on('ready', () => 
{
    splash = new BrowserWindow({minWidth: 810, minHeight: 610, transparent: true, frame: false, alwaysOnTop: true, 
        webPreferences: { nodeIntegration: true, enableRemoteModule: true },});
    splash.loadURL(__dirname + '/splashscreen.html');
    
    win = new BrowserWindow({
        width: 900,
        height: 700,
        minWidth: 900,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'),
        },
        frame: false,
        show: false
    });


    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
    win.loadURL(startURL);
    win.on('ready-to-show', () => 
    {
        splash.destroy();
        win.show();
    });

    win.on('closed', () => { win = null; });
    
    if (!isDev)
        globalShortcut.register("CommandOrControl+R", () => { return false });
});

app.on("window-all-closed", () => 
{
    if (process.platform !== "darwin") 
    {
        app.quit();
    }
});

ipcMain.handle('read-user-data', (e, f) => {
    return app.getPath('userData');
});

//titlebar

ipcMain.on('titleMinimize', () => {
    win.minimize();
});

ipcMain.on('titleRestore', () => {
    if (win.isMaximized())
        win.unmaximize();
    else
        win.maximize();
});

ipcMain.on('close', () => {
    win.close();
});

ipcMain.on('removeAllListeners', () => {
    win.removeAllListeners();
});

//dialog

ipcMain.handle('openFile', async () => {
    if (process.platform !== 'darwin') 
    {  
        dialog.showOpenDialog({ 
            title: 'Select the File to be open:', 
            defaultPath: path.join(__dirname, '../assets/'), 
            buttonLabel: 'Open', 

            filters: [ { 
                name: 'Books format', 
                extensions: ['txt', 'fb2', 'epub']
            }, ], 
            
            properties: ['openFile'] 
        })
        .then(file => { 
            win.webContents.send('sendFile', file);
        })
        .catch(err => { console.log(err) });
    }
});
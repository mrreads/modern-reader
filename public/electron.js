const { app, BrowserWindow, globalShortcut, ipcMain, dialog } = require("electron");
app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");

const path = require('path');

const Store = require('electron-store');
const store = new Store();
const settings = store.get('settings')

const isDev = !app.isPackaged;
const isSystemTitlebar = (settings) ? settings.systemTitlebar : false;

let win, splash;
app.on('ready', () => 
{
    splash = new BrowserWindow({ 
        minWidth: 810, minHeight: 610,
        maxWidth: 810, maxHeight: 610, 
        transparent: true, frame: false, alwaysOnTop: false, resizable: false,
        webPreferences: { nodeIntegration: true, enableRemoteModule: true }
    });
    splash.loadURL(__dirname + '/splashscreen.html');
    
    win = new BrowserWindow({
        width: 900,
        height: 700,
        minWidth: 900,
        minHeight: 600,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'),
        },
        useContentSize: true,
        autoHideMenuBar: true,
        frame: isSystemTitlebar,
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

//TITLEBAR
ipcMain.on('minimize', () => {
    win.minimize();
});
  
ipcMain.on('restore', () => {
if (win.isMaximized())
    win.unmaximize();
else
    win.maximize();
});
  
ipcMain.on('close', () => {
    win.close();
});

ipcMain.on('clear', () => {
    win.removeAllListeners();
});

ipcMain.on('electron-store-get-data', () => {
    
});

ipcMain.handle('open-file', async () => {
    if (process.platform !== 'darwin') 
    {  
        dialog.showOpenDialog({ 
            title: 'Select the File to be open:', 
            defaultPath: path.join(__dirname, '../assets/'), 
            buttonLabel: 'Open', 

            filters: [ { 
                name: 'Books format', 
                extensions: ['txt', 'fb2', 'epub', 'pdf']
            }, ], 
            
            properties: ['open-file'] 
        })
        .then(file => { 
            win.webContents.send('send-file', file);
        })
        .catch(err => { null });
    }
});
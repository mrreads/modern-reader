const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');   
const path = require('path');

let win;

function createWindow() 
{
    win = new BrowserWindow({
        width: 900,
        height: 700,
        minWidth: 900,
        minHeight: 600,
        frame: false,
        webPreferences: {
        nodeIntegration: true
        }
    });

    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
 
    win.loadURL(startURL);
 
    win.once('ready-to-show', () => win.show());
    win.on('closed', () => { win = null; });
}

app.on('ready', createWindow);

app.on("window-all-closed", () => 
{
    if (process.platform !== "darwin") 
    {
        app.quit();
    }
});

app.on("activate", () => 
{
    if (win === null) 
    {
        createWindow();
    }
});

const { app, BrowserWindow } = require('electron')

function createWindow () 
{
    let win = new BrowserWindow(
    {
        width: 900,
        height: 700,
        minWidth: 900,
        minHeight: 600,
        frame: false,
        webPreferences: {
        nodeIntegration: true
        }
    });

    win.loadFile('./app/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => 
{
    if (process.platform !== 'darwin') 
    {
        app.quit()
    }
});

app.on('activate', () => 
{
    if (BrowserWindow.getAllWindows().length === 0) 
    {
        createWindow();
    }
});
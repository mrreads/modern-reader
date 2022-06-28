const { app, BrowserWindow, ipcMain, protocol } = require("electron");
const path = require("path");
const url = require("url");

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 700,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#292a2d',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
    useContentSize: true,
    autoHideMenuBar: true,
    frame: false
  });

  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    : "http://localhost:3000";
    win.loadURL(appURL);

  if (!app.isPackaged) {
    win.webContents.openDevTools();
  }

  win.setMenu(null);
}

function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    "file",
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    (error) => {
      if (error) console.error("Failed to register protocol");
    }
  );
}

app.whenReady().then(() => {
  createWindow();
  setupLocalFilesNormalizerProxy();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


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
const { ipcRenderer } = require('electron');

ipcRenderer.invoke('read-user-data').then(result => {
    console.log(result)
});
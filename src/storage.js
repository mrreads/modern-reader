const fs = window.require('fs');
const app = window.require('electron').remote.app;
    
let appData = app.getPath('userData');

let defaultSetting =
{
    "language":"en",
    "theme":"light",
    "padding":"12",
    "fontSize":"21",
    "lineHeight":"1"
}

if (!fs.existsSync(appData + '/Data'))
    fs.mkdirSync(appData + '/Data');

if (!fs.existsSync(appData + '/Data/books.json'))
    fs.writeFile(appData + '/Data/books.json', '[ ]',(err) => {});

if (!fs.existsSync(appData + '/Data/notes.json'))
    fs.writeFile(appData + '/Data/notes.json', '{ }',(err) => {});


if (!fs.existsSync(appData + '/Data/settings.json'))
    fs.writeFile(appData + '/Data/settings.json', JSON.stringify(defaultSetting), (err) => {});

let userPath =
{
    appData: appData,
    books: appData + '/Data/books.json',
    notes: appData + '/Data/notes.json',
    settings: appData + '/Data/settings.json'
}

module.exports.userPath = userPath;
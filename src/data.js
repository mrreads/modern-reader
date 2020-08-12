

const fs = window.require('fs');
const remote = window.require('electron').remote;
const app = remote.app;
    
let appData = app.getPath('userData');

if (!fs.existsSync(appData + '/Data'))
{
    fs.mkdirSync(appData + '/Data');
}

if (!fs.existsSync(appData + '/Data/books.json'))
{
    fs.writeFile(appData + '/Data/books.json', '[ ]',(err) => {});
}

if (!fs.existsSync(appData + '/Data/notes.json'))
{
    fs.writeFile(appData + '/Data/notes.json', '{ }',(err) => {});
}


if (!fs.existsSync(appData + '/Data/settings.json'))
{
    let tempSettings = {"theme":"light","padding":"12","fontSize":"21","lineHeight":"1"}
    fs.writeFile(appData + '/Data/settings.json', JSON.stringify(tempSettings), (err) => {});
}

let userPath = {
    appData: appData,
    books: appData + '/Data/books.json',
    notes: appData + '/Data/notes.json',
    settings: appData + '/Data/settings.json'
}

module.exports.userPath = userPath;
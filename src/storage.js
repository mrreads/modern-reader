let appData = window.appdata;

let userPath =
{
    appData: appData,
    books: appData + '/Data/books.json',
    notes: appData + '/Data/notes.json',
    settings: appData + '/Data/settings.json'
}

module.exports.userPath = userPath;
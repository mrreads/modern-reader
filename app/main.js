const path = require('path'); 
const fs = require('fs'); 

let dataSetting = require('./data/setting.json');
let dataBooks = require('./data/books.json');
let dataNotes = require('./data/notes.json');

require('./js/electron');

const electron = require('electron'); 
const dialog = electron.remote.dialog; 

require('./js/loadBook');

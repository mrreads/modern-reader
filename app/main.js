const path = require('path'); 
const fs = require('fs'); 
const electron = require('electron'); 
const dialog = electron.remote.dialog; 

require('./js/electron');

const dataSettingPath = __dirname + '/data/setting.json';
let dataSetting = require(dataSettingPath);

const dataBooksPath = __dirname + '/data/books.json';
let dataBooks = require(dataBooksPath);

const dataNotesPath = __dirname + '/data/notes.json';
let dataNotes = require(dataNotesPath);

const library = require('./js/library');
library.updateLibrary();

require('./js/loadBook');

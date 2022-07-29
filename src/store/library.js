import { makeAutoObservable, toJS } from 'mobx';


const Store = require('electron-store');

const fs = window.require('fs');

export default class Library {
	store = new Store();

	current = null;
	books = [];

	constructor(rootStore, object){
		makeAutoObservable(this);
		this.rootStore = rootStore;

		if (object !== undefined)
		{
			this.books = (object.books) ? object.books : this.books;
			this.current = (object.current) ? object.current : this.current;

			if (this.current != null)
				this.checkBookIsExist(this.getCurrentBook(this.current));

			this.books.map(book => this.checkBookIsExist(book));
		}
	}

	checkBookIsExist = (obj) => {
		fs.access(obj.path, fs.F_OK, (err) => {
			if (err) {
				this.deleteBook(obj);
			}
		})
	}
	
	getBooks = () => {
		return toJS(this.books)
	}
	
	addBook = (book) => {
		this.books.push(book);

		this.saveLibrary();
	}

	deleteBook = (o) => {
		if (o.id === this.current)
		{
			this.current = null;
		}

		this.books = this.books.filter(b => b.id !== o.id);
		
		this.saveLibrary();
	} 

	setCurrentBook = (path) => {
		this.current = path;

		this.saveLibrary();
	}

	clearLibrary = () => {
		this.books = [];
		this.current = null;

		this.saveLibrary();
	}

	getCurrentBook = () => {
		if (this.current != null)
		{
			return toJS(this.books.filter(b => b.id === this.current)[0]);
		}
		return null;
	}
	
	updateProgress = (obj, scrl, prgrs) => { 
		this.books.find(b => b.id === obj.id).scrollTop = scrl;
		this.books.find(b => b.id === obj.id).progress = prgrs;
		
		this.saveLibrary();
	}

	saveLibrary = () => {
		let libraryObject = {
			"books": this.books,
			"current": this.current
		}
		this.store.set('library', libraryObject);
	}
}
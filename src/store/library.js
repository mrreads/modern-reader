import { makeAutoObservable, toJS } from 'mobx';

const Store = require('electron-store');

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
		}
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

	saveLibrary = () => {
		let libraryObject = {
			"books": this.books,
			"current": this.current
		}
		this.store.set('library', libraryObject);
	}
}
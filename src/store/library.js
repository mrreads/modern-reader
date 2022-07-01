import { makeAutoObservable, toJS } from 'mobx';

const Store = require('electron-store');

export default class Library {
	store = new Store();

	books = []

	constructor(rootStore, object){
		makeAutoObservable(this);
		this.rootStore = rootStore;

		if (object !== undefined)
		{
			this.books = (object.books) ? object.books : this.books;
		}
	}

	getBooks = () => {
		return toJS(this.books)
	}
	
	addBook = (book) => {
		this.books.push(book);

		this.saveLibrary();
	}

	deleteBook = (path) => {
		this.books = this.books.filter(b => b.path !== path);

		this.saveLibrary();
	} 

	saveLibrary = () => {
		let libraryObject = {
			"books": this.books,
		}
		this.store.set('library', libraryObject);
	}
}
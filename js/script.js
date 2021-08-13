let myLibrary = [];

class Library {
    constructor() {
        this.books = [];
    }

    addBook(bookToAdd) {
        if (!this.books.some(book => book.title == bookToAdd.title)) {
            this.books.push(bookToAdd);
        }
    }

    removeBook(bookToRemove) {
        this.books = this.books.filter(book => book != bookToRemove);
    }

    getBook(bookTitle) {
        return this.books.find(book => book.title == bookTitle);
    }
}

class Book {
    constructor(title, author, numPages, isRead, genre) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.read = isRead;
        this.genre = genre;
    }
}

const library = new Library();

let book1 = new Book("Green Eggs & Ham", "Dr. Seuss", 62, true, "Children");

library.addBook(book1);


function displayBooks() {
    for (let book in library.books) {
        createBookDiv(book);
    }
}

// function createBookDiv(book) {

// }


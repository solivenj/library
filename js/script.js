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

function createBookDiv(book) {
    let bookDiv = document.createElement("div");
    let title = document.createElement("p");
    let author = document.createElement("p");
    let numPages = document.createElement("p");
    let read = document.createElement("label");
    let readToggle = document.createElement("checkbox");
    let readSlider = document.createElement("span");
    let removeButton = document.createElement("remove");
    read.appendChild(readToggle);
    read.appendChild(readSlider);
    

    title.textContent = `"${book.title}"`;
    author.textContent = `${book.author}`;
    numPages.textContent = `${book.numPages} pages`;
    removeButton.textContent = 'Remove';

    bookDiv.appendChild(title)
    bookDiv.appendChild(author)
    bookDiv.appendChild(numPages)
    bookDiv.appendChild(removeButton)
    

    const booksContainer = document.getElementById("books-container");
    body.appendChild(bookDiv);
}

let footer_copyright = document.getElementById("copyright");
footer_copyright.textContent = `Copyright ${new Date().getFullYear()}`;


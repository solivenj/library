class Library {
    constructor() {
        this.books = [];
    }

    addBook(bookToAdd) {
        if (!this.books.some(book => book.title == bookToAdd.title)) {
            this.books.push(bookToAdd);
        }
        this.updateBooks();
    }

    removeBook(bookToRemove) {
        this.books = this.books.filter(book => book != bookToRemove);
    }

    getBook(bookTitle) {
        return this.books.find(book => book.title == bookTitle);
    }

    updateBooks() {
        this.books.forEach((book) => {
            this.createBookDiv(book.title, book.author, book.numPages, book.read);
        });
    }
    
    createBookDiv(titleText, authorText, numPagesText, readText) {
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
        
        title.textContent = `"${titleText}"`;
        author.textContent = `${authorText}`;
        numPages.textContent = `${numPagesText} pages`;
        removeButton.textContent = 'Remove';
    
        bookDiv.appendChild(title)
        bookDiv.appendChild(author)
        bookDiv.appendChild(numPages)
        bookDiv.appendChild(removeButton)
    
        bookDiv.classList.add('book-entry');
        const booksContainer = document.getElementById("books-container");
        booksContainer.appendChild(bookDiv);
    }
}

class Book {
    constructor(title, author, numPages, isRead, genre) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.read = isRead;
    }
}

const library = new Library();
const form = document.querySelector('form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const numPagesInput = document.getElementById('num-pages');
const readSwitch = document.getElementById('switch');
const submitButton = document.getElementById('submit');
const footerCopyright = document.getElementById("copyright-text");

submitButton.onclick = function() {
    let newBook = new Book(titleInput.value, authorInput.value, Number(numPagesInput.value), readSwitch.checked);
    library.addBook(newBook);
    form.reset();
}

let book1 = new Book("Green Eggs & Ham", "Dr. Seuss", 62, true, "Children");
library.addBook(book1);



footerCopyright.textContent = `Copyright ${new Date().getFullYear()} 
©`;


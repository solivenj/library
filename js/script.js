class Library {
    constructor() {
        this.books = [];
    }

    addBook(bookToAdd) {
        if (!this.books.some(book => book.title == bookToAdd.title)) {
            this.books.push(bookToAdd);
        }
        this.createbookTableEntry(bookToAdd.title, bookToAdd.author, bookToAdd.numPages, bookToAdd.read);
    }

    removeBook(bookToRemove) {
        this.books = this.books.filter(book => book != bookToRemove);
    }

    getBook(bookTitle) {
        return this.books.find(book => book.title == bookTitle);
    }

    updateBooks() {
        this.books.forEach((book) => {
            this.createbookTableEntry(book.title, book.author, book.numPages, book.read);
        });
    }
    
    createbookTableEntry(titleText, authorText, numPagesText, readText) {
        let tr = document.createElement("tr")
        let title = document.createElement("td");
        let author = document.createElement("td");
        let numPages = document.createElement("td");
        let read = document.createElement("td");
        let remove = document.createElement("td");

        let readButton = document.createElement('button');
        let removeButton = document.createElement('button');
        
        read.appendChild(readButton);
        remove.appendChild(removeButton);

        title.textContent = `"${titleText}"`;
        author.textContent = `${authorText}`;
        numPages.textContent = `${numPagesText} pages`;
        
        readButton.textContent = readText == true ? "Read" : "Not Read";
        readButton.classList.add('read-button');
        readButton.addEventListener('click',changeReadStatus);

        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', removeRow);

    
        tr.appendChild(title);
        tr.appendChild(author);
        tr.appendChild(numPages);
        tr.appendChild(read);
        tr.appendChild(remove);
    
        // bookTableEntry.classList.add('book-entry');
        const tbody = document.querySelector("tbody");
        tbody.appendChild(tr);
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

function changeReadStatus() {
    this.textContent = this.textContent == "Read" ? "Not Read" : "Read";
}

function removeRow() {
    let tr = this.parentNode.parentNode;
    tr.remove();
}

let book1 = new Book("Green Eggs & Ham", "Dr. Seuss", 62, true, "Children");
library.addBook(book1);



footerCopyright.textContent = `Copyright ${new Date().getFullYear()} 
©`;


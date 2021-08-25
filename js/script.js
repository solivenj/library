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
        this.updateBooks();
    }

    getBook(bookTitle) {
        return this.books.find(book => book.title == bookTitle);
    }

    updateBooks() {
        this.resetBooks()
        this.books.forEach((book) => {
            this.createbookTableEntry(book.title, book.author, book.numPages, book.read);
        });
    }

    resetBooks() {
        tbody.innerHTML = "";
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
        removeButton.addEventListener('click', removeBook);

    
        tr.appendChild(title);
        tr.appendChild(author);
        tr.appendChild(numPages);
        tr.appendChild(read);
        tr.appendChild(remove);

        tbody.appendChild(tr);
    }
}

class Book {
    constructor(title, author, numPages, read) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.read = read;
    }
}

const library = new Library();
const form = document.querySelector('form');
const tbody = document.querySelector("tbody");
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const numPagesInput = document.getElementById('num-pages');
const titleInputContainer = document.getElementById('title-container');
const authorInputContainer = document.getElementById('author-container');
const numPagesInputContainer = document.getElementById('num-pages-container');
const readSwitch = document.getElementById('switch');
const submitButton = document.getElementById('submit');
const footerCopyright = document.getElementById("copyright-text");
const inputContainers = document.querySelectorAll('.input-container input');

submitButton.onclick = function() {
    if (!isValidForm()) {
        return
    }

    let newBook = new Book(titleInput.value, authorInput.value, Number(numPagesInput.value), readSwitch.checked);
    library.addBook(newBook);
    saveToLocal();
    form.reset();
}

function changeReadStatus() {
    let title = this.parentNode.parentNode.firstChild.textContent.replaceAll('"', '');
    let book = library.getBook(title);

    book.read = !book.read;
    saveToLocal();
    library.updateBooks();
}

function isValidForm() {
    if (titleInput.value != "" && authorInput.value != "" && Number(numPagesInput.value) > 0) {
        return true;
    }

    if (titleInput.value == "") {
        titleInputContainer.setAttribute('data-error', 'Please enter a valid title.')
    }

    if (authorInput.value == "") {
        console.log('author')
        authorInputContainer.setAttribute('data-error', 'Please enter a valid author name.');
    } 

    if (isNaN(numPagesInput.value) || Number(numPagesInput.value) <= 0 ) {
        numPagesInputContainer.setAttribute('data-error', 'Please enter a valid number greater than 0.');
    }

    return false;
}

function removeBook() {
    let title = this.parentNode.parentNode.firstChild.textContent.replaceAll('"', '');
    let book = library.getBook(title);
    library.removeBook(book);
    saveToLocal();
    library.updateBooks();
}

inputContainers.forEach(input => {
    input.addEventListener('input', () => input.parentElement.removeAttribute('data-error'));
});

function saveToLocal() {
    localStorage.setItem('library', JSON.stringify(library.books));
}

function restoreLocal() {
    let storedBooks = JSON.parse(localStorage.getItem('library'));

    if (storedBooks) {
        storedBooks = storedBooks.map((bookJSON) => getBookFromJSON(bookJSON));
        console.log(storedBooks);
        library.books = storedBooks;
    } else {
        library.books = [];
    }

    library.updateBooks();
}

restoreLocal();

function getBookFromJSON(book) {
    return new Book(book.title, book.author, Number(book.numPages), Boolean(book.read));
}



footerCopyright.textContent = `Copyright ${new Date().getFullYear()} 
©`;


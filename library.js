let myLibrary = [];

function openAddForm() {
    document.getElementById("add-form").style.display = "block";
    document.querySelectorAll("body > *:not(#add-form)").forEach
        (element => element.classList.toggle('blur'));
}
function closeAddForm() {
    document.getElementById("add-form").style.display = "none";
    document.querySelectorAll("body > *:not(#add-form)").forEach
        (element => element.classList.toggle('blur'));
}

function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;   
    this.isRead = isRead;
}

function addBook(title, author, numPages, isRead) {
    let newBook = new Book(title, author, numPages, isRead);
    myLibrary.push(newBook);
}

Book.prototype.info = function() {
    let readString = (this.isRead) ? 'Has been read.' : 'Has not been read yet.';
    return `${this.title} by ${this.author}, ${this.numPages} pages. ${readString}`;
}

const form = document.getElementById('add-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = document.getElementById('add-title').value;
    let author = document.getElementById('add-author').value;
    let numPages = document.getElementById('add-pages').value;
    let isRead = document.getElementById('add-completed').value;
    addBook(title, author, numPages, isRead);
    closeAddForm();
});


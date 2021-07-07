let myLibrary = [];

function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;   
    this.isRead = isRead;
}

Book.prototype.info = function() {
    let readString = (this.isRead) ? 'Has been read.' : 'Has not been read yet.';
    return `${this.title} by ${this.author}, ${this.numPages} pages. ${readString}`;
}

// function addBookToLibrary() {
//     for (let i = 0; i < myLibrary.length; i++) {

//     }
// }


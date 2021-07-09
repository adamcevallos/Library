// let myLibrary = [];

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

// function Book(title, author, numPages, isRead) {
//     this.title = title;
//     this.author = author;
//     this.numPages = numPages;   
//     this.isRead = isRead;
// }

// Book.prototype.info = function() {
//     let readString = (this.isRead) ? 'Has been read.' : 'Has not been read yet.';
//     return `${this.title} by ${this.author}, ${this.numPages} pages. ${readString}`;
// }

// const got = new Book('Game of Thrones mothertrucker', 'George R.R Martin', 694, false);
// myLibrary.push(got);

// console.log(myLibrary);
let myLibrary = [];

class Book {
    constructor(title, author, numPages, isRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.isRead = isRead;
    }
}

function saveLibraryToStorage() {
    console.log('saving storage...');
    window.localStorage.clear();

    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        let value = `${book.title}/${book.author}/${book.numPages}/${book.isRead}`;
        window.localStorage.setItem(i, value);
    }
}

function retrieveLibraryFromStorage() {
    let myStorage = window.localStorage;
    for (let i = 0; i < myStorage.length; i++) {
        let data = myStorage[i].split('/');
        let book = new Book(data[0],data[1],data[2],data[3]);
        console.log(`isread is ${data[3]}`);
        addBookToContainer(book);
        myLibrary.push(book);
    }
}

function updateStats() {
    document.getElementById('num-books').textContent = myLibrary.length;

    let books = Array.from(document.getElementById('container').getElementsByTagName('div'));
    let numCompleted = 0;
    for (let i = 0; i < books.length; i++) {
        numCompleted += ((books[i].getAttribute('data-read') == 'true') ? 1 : 0);
    }

    document.getElementById('num-completed').textContent = numCompleted;
    
    let numPages = myLibrary.reduce( (totalPages, book) => {
        return totalPages + parseInt(book.numPages);
    }, 0);
    document.getElementById('num-pages').textContent = numPages;
}

function addBookToContainer(book) {
    let card = document.createElement('div');
    card.classList.toggle('card');

    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '&#10006';
    deleteBtn.classList.toggle('deleteBtn');

    let readPara = document.createElement('p');
    readPara.textContent = "Completed?";
    readPara.id = 'readPara';

    let readSwitch = document.createElement('label');
    readSwitch.classList.toggle('switch');

    let readCheckbox = document.createElement('input');
    readCheckbox.setAttribute('type', 'checkbox');

    let slider = document.createElement('span');
    slider.classList.toggle('slider');

    let titlePara = document.createElement('p');
    titlePara.textContent = book.title + ` - ${book.numPages} pg`

    let authorPara = document.createElement('p');
    authorPara.textContent = 'by :   ' + book.author;

    deleteBtn.addEventListener('click', event => deleteBook(event.path[1], myLibrary));
    readCheckbox.addEventListener('click', event => {
        console.log(event.path[2]);
        changeReadStatus(event.path[2]);
    });

    readSwitch.appendChild(readCheckbox);
    readSwitch.appendChild(slider);
    card.appendChild(titlePara);
    card.appendChild(authorPara);
    card.appendChild(deleteBtn);
    card.appendChild(readPara);
    card.appendChild(readSwitch);

    card.setAttribute('id', `Book${myLibrary.length}`);
    card.setAttribute('data-read', String(book.isRead));

    console.log(book.isRead);
    if (book.isRead == 'true' || book.isRead == true) {
        card.classList.toggle('card-read'); 
        readCheckbox.checked = true;
    }

    container.appendChild(card);
}

function deleteBook(book) {
    let bookIndex = parseInt(book.id.slice(-1));
    myLibrary.splice(bookIndex,1);
    temp = myLibrary
    myLibrary = []

    document.getElementById('container').innerHTML = 
        '<button class="add-button" type="button" id="add-button"></button>';
    document.getElementById('add-button').addEventListener('click', openAddForm);

    temp.forEach(book => {
        addBookToContainer(book);
        myLibrary.push(book);
    });
    
    updateStats();
    saveLibraryToStorage();
}

function changeReadStatus(book) {
    let bookIndex = parseInt(book.id.slice(-1));
    let readStatus = book.getAttribute('data-read');
    
    if (readStatus == 'true') {
        book.setAttribute('data-read','false');
    } else {
        book.setAttribute('data-read','true');
    }
    book.classList.toggle('card-read');
    
    isRead = myLibrary[bookIndex].isRead;
    if (isRead == 'true') {
        myLibrary[bookIndex].isRead = 'false';
    } else {
        myLibrary[bookIndex].isRead = 'true';
    }

    saveLibraryToStorage();
    updateStats();
}

function formActive() {
    return document.getElementById("add-form").style.display == "block";
}

function openAddForm() {
    document.getElementById("add-form").style.display = "block";
    document.querySelectorAll("body > *:not(#add-form)").forEach
        (element => element.classList.toggle('blur'));
}
function closeAddForm() {
    document.getElementById('add-title').value = '';
    document.getElementById('add-author').value = '';
    document.getElementById('add-pages').value = '';
    document.getElementById('add-completed').checked = false;
    document.getElementById("add-form").style.display = "none";
    document.querySelectorAll("body > *:not(#add-form)").forEach
        (element => element.classList.toggle('blur'));
}

const form = document.getElementById('add-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let title = document.getElementById('add-title').value;
    let author = document.getElementById('add-author').value;
    let numPages = document.getElementById('add-pages').value;
    let isRead = document.getElementById('add-completed').checked;
    let book = new Book(title, author, numPages, isRead);
    closeAddForm();
    addBookToContainer(book);
    myLibrary.push(book);
    updateStats();
    saveLibraryToStorage(); 
});

document.getElementById('add-close').addEventListener('click', closeAddForm);
document.getElementById('add-button').addEventListener('click', openAddForm);

document.addEventListener('keydown', (event) => {
    let key = event.key;
    switch (key) {
        case 'Escape':
            if (formActive()) closeAddForm();
            break;
        default:
    }
});

document.addEventListener('click', (event) => {
    let addButton = document.getElementById('add-button');
    if (formActive() && form !== event.target && !form.contains(event.target) &&
        event.target !== addButton) closeAddForm();
});

retrieveLibraryFromStorage();
updateStats();
// Functions

function Book(bookTitle, authorName, numPages, checkRead) {
    this.bookTitle = bookTitle;
    this.authorName = authorName;
    this.numPages = numPages;
    this.checkRead = checkRead;
};

function addBookToLibrary(event) {
    event.preventDefault()
    let newBook = new Book(bookTitle.value, authorName.value,
        numPages.value, checkRead.checked);
    myLibrary.push(newBook);
    modal.style.display = 'none';
    container.innerText = "";
    render(myLibrary);
    clearForm();

};

function clearForm() {
    bookTitle.value = '';
    authorName.value = '';
    numPages.value = '';
    checkRead.checked = false;
}

function render(myLibrary) {
    for ( let i = 0; i < myLibrary.length; i++) {

        let card = document.createElement('div')
        card.classList.add('card');
        card.setAttribute('id', `${i}`);

        let title = document.createElement('h2');
        title.innerText = myLibrary[i].bookTitle;

        let author = document.createElement('p');
        author.innerText = myLibrary[i].authorName;

        let pages = document.createElement('p');
        pages.innerText = myLibrary[i].numPages + ' páginas';

        let check = document.createElement('button');
        myLibrary[i].checkRead ? check.innerText = 'Leído' : check.innerText = 'Pendiente';
        check.classList.add('checkField');

        let deleteCard = document.createElement('button');
        deleteCard.classList.add('deleteButton');
        deleteCard.innerText = 'Eliminar';

        card.append(title, author, pages, check, deleteCard);
        container.appendChild(card);

        let cardIndex = Number(card.getAttribute('id'));

        check.addEventListener('click', function() {

            if (myLibrary[cardIndex].checkRead === true) {
                myLibrary[cardIndex].checkRead = false;
                myLibrary[cardIndex].check = 'Pendiente';

            } else if (myLibrary[cardIndex].checkRead === false) {
                myLibrary[cardIndex].checkRead = true;
                myLibrary[cardIndex].check = 'Leído'
            };
            check.innerText = myLibrary[cardIndex].check;
        });

        deleteCard.addEventListener('click', function() {
            myLibrary.splice(cardIndex, 1);
            container.innerText = "";
            render(myLibrary);
        });
    };
};

// Inputs

let myLibrary = [
    {
        "bookTitle" : "El código Da Vinci",
        "authorName" : "Dan Brown",
        "numPages" : "624",
        "checkRead" : false
    },
    {
        "bookTitle" : "1984",
        "authorName" : "George Orwell",
        "numPages" : "352",
        "checkRead" : true
    }, 
    {
        "bookTitle" : "El poder del perro",
        "authorName" : "Don Winslow",
        "numPages" : "720",
        "checkRead" : true
    },
];

const modal = document.querySelector('#modal');
const bookTitle = document.querySelector('#bookTitle');
const authorName = document.querySelector('#authorName');
const numPages = document.querySelector('#numPages');
const checkRead = document.querySelector('#checkRead');
const cancelForm = document.querySelector('#cancel');
const submitBook = document.querySelector('#submitBook');
const closeForm = document.querySelector('#closePop')

const newBookButton = document.querySelector('#newBookButton');
const container = document.querySelector('#books');


submitBook.addEventListener("click", addBookToLibrary);
cancelForm.addEventListener("click", function(){
    modal.style.display = 'none';
});
closeForm.addEventListener("click", function() {
    modal.style.display = 'none';
});
newBookButton.addEventListener("click", function() {
    modal.style.display = 'block';
})

render(myLibrary);
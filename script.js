// Functions

class Book{
    constructor (bookTitle, authorName, numPages, checkRead) {
        this.bookTitle = bookTitle;
        this.authorName = authorName;
        this.numPages = numPages;
        this.checkRead = checkRead;
    };
};

function addBookToLibrary(event) {   
    event.preventDefault();
    if (!titleInput.checkValidity() || !authorInput.checkValidity() || !pagesInput.checkValidity()) {
      alert('Por favor, introduce Título , Autor Y Número de Páginas antes de continuar');
    } else {
        let newBook = new Book(bookTitle.value, authorName.value,
            numPages.value, checkRead.checked);
        myLibrary.push(newBook);
        firebase.database().ref().set(myLibrary);
        modal.style.display = 'none';
        container.innerText = "";
        clearForm();
        render(myLibrary);
    };

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
                check.innerText = 'Pendiente';

            } else if (myLibrary[cardIndex].checkRead === false) {
                myLibrary[cardIndex].checkRead = true;
                check.innerText = 'Leído';
            };
            container.innerText = "";
            firebase.database().ref().set(myLibrary);
        });

        deleteCard.addEventListener('click', function() {
            myLibrary.splice(cardIndex, 1);
            container.innerText = "";
            firebase.database().ref().set(myLibrary);
        });
    };
};

// Inputs

let myLibrary = [];
let initialLibrary = [
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


authorName.addEventListener('input', function (event) {
  event.preventDefault(event);
  console.log(authorName.checkValidity())
  if (!authorName.validity.valid) {
    authorName.setCustomValidity('Entre 2 y 20 letras');
    authorName.reportValidity();
  } else {
    authorName.setCustomValidity('');
  }
});

numPages.addEventListener('input', function (event) {
  event.preventDefault();
  console.log(numPages.checkValidity())
  if (!authorName.validity.valid) {
    numPages.setCustomValidity('Entre 5 y 3.000 páginas');
    numPages.reportValidity();
  } else {
    numPages.setCustomValidity('');
  }
});

submitBook.addEventListener("click", addBookToLibrary);
cancelForm.addEventListener("click", function(){
    modal.style.display = 'none';
});

newBookButton.addEventListener("click", function() {
    modal.style.display = 'block';
});

// Firebase

// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyD6U2UM95cpyH0bkrTzcrr_XtatZu-kjsc",
    authDomain: "top-library-2059c.firebaseapp.com",
    databaseURL: "https://top-library-2059c.firebaseio.com",
    projectId: "top-library-2059c",
    storageBucket: "top-library-2059c.appspot.com",
    messagingSenderId: "180267997472",
    appId: "1:180267997472:web:6d0ca86b83d241aba59f45"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dbRefObject = firebase.database().ref();
dbRefObject.on('value', function(snap) {

    if (snap.exists() == false) {
        firebase.database().ref().set(initialLibrary);
        myLibrary = initialLibrary;
    } else {
        myLibrary = snap.val();
    };
    container.innerText = "";
    render(myLibrary);
});
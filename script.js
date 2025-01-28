const display = document.querySelector('.library')
const addButton = document.querySelector('.add-button')

const bookFormDialog = document.getElementById('bookFormDialog');
const bookForm = document.getElementById('bookForm');

const formCloseButton = document.getElementById('formCloseButton');
const formSubmitButton = document.getElementById('formSubmitButton');

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');

addButton.addEventListener("click",()=>
    bookFormDialog.showModal());

formCloseButton.addEventListener("click",()=>
    closeForm());

formSubmitButton.addEventListener("click",()=>
    {
        if (bookForm.checkValidity()==true){
    submitForm()} else {
        alert("Please fill out all fields")
    }
    })
    ;

class Book {
    constructor(title, author, pages, read, index) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.index = index;
    }
    toggleRead() {
        this.read = !this.read;
    }
}

const myLibrary = [
    new Book("Autocracy Inc.","Anne Applebaum","212",true,0),
    new Book("A Little Life","Hanya Yanagihara","805",false,1),
    new Book("Blindness","José Saramago","450",true,2),
    new Book("The Assassin's Blade","Sarah J. Maas","435",false,3),
]

let activeIndex= myLibrary.length

function addBookToLibrary(title, author, pages, read) {
    index=activeIndex;
    activeIndex++;
    const newBook = new Book(title, author, pages, read, index);
    myLibrary.push(newBook)
    shelveBook(newBook)
}

function shelveBook(entry){   
    let newEntry=document.createElement("div")
    newEntry.setAttribute("class","book")

    let newTitle = document.createElement('div');
    newTitle.setAttribute("class","title"); 
    newTitle.textContent = entry.title;

    let newAuthor = document.createElement('div');
    newAuthor.setAttribute("class","author");
    newAuthor.textContent = "by "+entry.author;
    
    let newPages = document.createElement('div');
    newPages.setAttribute("class","pages");
    newPages.textContent = "Pages: "+entry.pages;

    let newRead = document.createElement('div');
    newRead.setAttribute("class","read");
    newRead.innerHTML = convertRead(+entry.read);
    newRead.setAttribute("id",entry.index)

    let buttonRow = document.createElement('div');
    buttonRow.setAttribute("class","buttonRow");
    
    let delButton = document.createElement("div");
    delButton.setAttribute("class","deleteButton");
    delButton.textContent="Remove Book";
    delButton.addEventListener("click",function(){
        boundBook.remove()
        myLibrary.splice(myLibrary.findIndex(i => i.index === entry.index),1)
        /*resetIndex()*/

    })

    let toggleRead = document.createElement("div");
    toggleRead.setAttribute("class","toggleRead");
    toggleRead.textContent="Toggle Read";
    let id = entry.index;
    toggleRead.addEventListener("click",function(){
       myLibrary[myLibrary.findIndex(i => i.index === entry.index)].toggleRead();
       document.getElementById(id).textContent = convertRead(myLibrary[myLibrary.findIndex(i => i.index === entry.index)].read);
    })

    let spine = document.createElement('div');
    spine.setAttribute("class","spine");

    let boundBook = document.createElement('div');
    boundBook.setAttribute('class','boundBook')

    /*newEntry.appendChild(newIndex);*/
    buttonRow.appendChild(delButton);
    buttonRow.appendChild(toggleRead);
    newEntry.appendChild(newTitle);
    newEntry.appendChild(newAuthor);
    newEntry.appendChild(newPages);
    newEntry.appendChild(newRead);
    newEntry.appendChild(buttonRow);

    boundBook.appendChild(spine)
    boundBook.appendChild(newEntry)
    
    display.appendChild(boundBook);

    /*resetIndex()*/
}


function resetIndex() {
    for (var i=0; i<myLibrary.length;i++) {
        myLibrary[i].index=i;
    }
}

function toggleRead(i){
    myLibrary[i].read = !myLibrary[i].read;

}

function reShelve(){
    while(display.firstChild){
        display.removeChild(display.firstChild)
    };
    for (var i=0; i<myLibrary.length;i++) {
        shelveBook(myLibrary[i]);
    }
}

function convertRead(i){
    if (i == true) {
        return "Read!"
    } else {
        return "Not Read Yet!"
    }
}

function closeForm(){
    bookForm.reset();
    bookFormDialog.close();
    
}

function submitForm(){
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.checked)
    bookForm.reset();
    bookFormDialog.close();
}

reShelve()
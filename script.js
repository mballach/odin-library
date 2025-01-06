const display = document.querySelector('.library')
const addButton = document.querySelector('.add-button')

addButton.addEventListener("click",addBookToLibrary)

const myLibrary = [
    new Book("Autocracy Inc.","Anne Applebaum","212",true),
    new Book("A Little Life","Hanya Yanagihara","805",false),
    new Book("Blindness","José Saramago","450",true),
]

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    title=prompt("Enter title");
    author=prompt("Enter author");
    pages=prompt("Enter # of pages");
    read=prompt("Read? Enter True or False");
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook)
    shelveBook(newBook)
}

function shelveBook(entry){
    let title = entry.title;
    let author = entry.author;
    let pages = entry.pages;
    let read = entry.read;
    
    let newEntry=document.createElement("div")
    newEntry.setAttribute("class","book")
    
    let newTitle = document.createElement('div');
    newTitle.setAttribute("class","title"); 
    newTitle.textContent = "Title: "+entry.title;

    let newAuthor = document.createElement('div');
    newAuthor.setAttribute("class","author");
    newAuthor.textContent = "Author: "+entry.author;
    
    let newPages = document.createElement('div');
    newPages.setAttribute("class","pages");
    newPages.textContent = "Number of Pages: "+entry.pages;

    let newRead = document.createElement('div');
    newRead.setAttribute("class","read");
    newRead.innerHTML = "Read? "+entry.read;

    newEntry.appendChild(newTitle);
    newEntry.appendChild(newAuthor);
    newEntry.appendChild(newPages);
    newEntry.appendChild(newRead);
    
    display.appendChild(newEntry);
}

for (var i=0; i<myLibrary.length;i++) {
    shelveBook(myLibrary[i]);
}
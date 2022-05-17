class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = read;
    }

    toggleRead() {
        this.isRead = !this.isRead;
    }

    updateDisplay(wrapper) {
        if (this.isRead === true) {
            wrapper.textContent = "Read";
        } else {
            wrapper.textContent = "Unread";
        }
        wrapper.classList.toggle("read");
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(index) {
        this.books.splice(index, 1);
    }

    isInLibrary(title) {
        let t = title.toLowerCase();
        let filter = this.books.filter((value, index, array) => {
            if (value.title.toLowerCase() === t) {
                return true;
            }
            return false;
        });
        return filter.length > 0 ? true : false;
    }

    displayBooks(wrapper) {
        wrapper.innerHTML = "";
        for (let x = this.books.length - 1; x >= 0; x--) {
            const card = document.createElement("div");
            card.className = "card";
            card.dataset.index = x;

            const cardTitle = document.createElement("h2");
            cardTitle.textContent = this.books[x].title;

            const cardAuthor = document.createElement("h5");
            cardAuthor.textContent = this.books[x].author;
            cardAuthor.className = "right";

            const cardPages = document.createElement("h5");
            cardPages.textContent = `Pages: ${this.books[x].pages}`;
            cardPages.className = "left";

            const cardIsRead = document.createElement("button");
            cardIsRead.className = "read-btn";
            if (this.books[x].isRead === true) {
                cardIsRead.textContent = "Read";
                cardIsRead.classList.add("read");
            } else {
                cardIsRead.textContent = "Unread";
                cardIsRead.classList.remove("read");
            }
            cardIsRead.addEventListener("click", (e) => {
                let book = myLibrary.books[e.target.parentElement.dataset.index];
                book.toggleRead();
                book.updateDisplay(e.target);
            });

            const remove = document.createElement("img");
            remove.className = "remove-btn";
            remove.src = "./trash-solid.svg";
            remove.alt = "Remove";
            remove.addEventListener("click", (e) => {
                let index = e.target.parentElement.dataset.index;
                this.removeBook(index);
                this.displayBooks(container);
            });
            remove.title = "Remove this book from the library";

            card.append(cardTitle, cardAuthor, cardPages, cardIsRead, remove);
            wrapper.append(card);
        }
    }
}

// User Interface

let myLibrary = new Library();
const container = document.querySelector(".container");
const modalBtn = document.querySelector("[data-open-modal]");
const modal = document.querySelector("[data-modal]");
const closeBtn = document.querySelector("[data-close-modal]");
const form = document.querySelector("form");

modalBtn.addEventListener("click", () => modal.showModal());
closeBtn.addEventListener("click", () => modal.close());
form.addEventListener("submit", (e) => {
    let title = e.target.elements.title.value;
    if (myLibrary.isInLibrary(title)) {
        alert("You are already reading this book");
        clearForm(e);
        return;
    }
    let author = e.target.elements.author.value;
    let pages = e.target.elements.pages.value;
    let isRead = e.target.elements.readcheck.checked;
    myLibrary.addBook(new Book(title, author, pages, isRead));
    myLibrary.displayBooks(container);
    clearForm(e);
});

function clearForm(e) {
    e.target.elements.title.value = "";
    e.target.elements.author.value = "";
    e.target.elements.pages.value = "";
    e.target.elements.readcheck.checked = false;
}

const removeButtons = [...document.querySelectorAll(".remove-btn")];

removeButtons.forEach((button) =>
    button.addEventListener("click", (e) => {
        let index = e.target.parentElement.dataset.index;
        console.log(index);
        myLibrary.removeBook(index);
        myLibrary.displayBooks(container);
    })
);

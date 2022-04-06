class Note {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }
}

const list = document.querySelector('.list');
const addBtn = document.querySelector(".addBtn");
const clearBtn = document.querySelector('.clearBtn');
const noteInput = document.querySelector('.note');
let itemsArray = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
let notesCount = localStorage.getItem('notesCount') ? JSON.parse(localStorage.getItem('notesCount')) : [];

itemsArray.forEach(item => {
    liMaker(item);
});

function addStuff() {
    const noteText = noteInput.value;
    if (noteText.length === 0) return;

    localStorage.setItem('notesCount', notesCount);
    let note = new Note(+notesCount, noteText);
    notesCount += +1;
    localStorage.setItem('notesCount', notesCount);
    itemsArray.push(note);
    localStorage.setItem('notes', JSON.stringify(itemsArray));

    liMaker(note);

    noteInput.value = "";
}

function liMaker(note) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Delete note ';
    btn.className = 'deleteBtn';
    btn.addEventListener("click", (e) => deleteNote(e));

    const li = document.createElement('li');
    li.textContent = `${note.text} `;
    li.id = 'mynote';
    li.value = note.id;
    li.appendChild(btn);
    list.appendChild(li);
}

function deleteNote(e) {
    const parent = e.target.parentNode;
    parent.remove();

    localStorage.removeItem('notes');
    filteredItemsArray = itemsArray.filter((item) => item.id != parent.value);
    localStorage.setItem('notes', JSON.stringify(filteredItemsArray));
}

function clearList() {
    list.innerHTML = "";
    localStorage.removeItem('notes');
    itemsArray = [];
    localStorage.removeItem('notesCount');
    notesCount = +1;
}

addBtn.addEventListener("click", addStuff);
clearBtn.addEventListener("click", clearList);
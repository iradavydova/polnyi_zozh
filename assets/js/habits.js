class Note {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }
}
class Daycheck {
    constructor(monday, tuesday, wednesday, thursday, friday, saturday, sunday) {
        this.monday = monday;
        this.tuesday = tuesday;
        this.wednesday = wednesday;
        this.thursday = thursday;
        this.friday = friday;
        this.saturday = saturday;
        this.sunday = sunday;
    }
}

const addBtn = document.querySelector(".addBtn");
const clearBtn = document.querySelector('.clearBtn');
const noteInput = document.querySelector('.note');
let itemsArray = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
let notesCount = localStorage.getItem('notesCount') ? JSON.parse(localStorage.getItem('notesCount')) : 0;
let habitCount = localStorage.getItem('habitCount') ? JSON.parse(localStorage.getItem('habitCount')) : 0;

itemsArray.forEach(item => {
    liMaker(item);
});

// добавление привычки в список привычек + ее сохранение в локальное хранилище
function addStuff() {
    const noteText = noteInput.value;
    if (noteText.length === 0) return;

    localStorage.setItem('notesCount', notesCount);
    let note = new Note(notesCount, noteText);
    itemsArray.push(note);
    localStorage.setItem('notes', JSON.stringify(itemsArray));
    let weekcheck = new Daycheck(false, false, false, false, false, false, false);
    localStorage.setItem(`${note.id}`, JSON.stringify(weekcheck));
    notesCount += 1;
    localStorage.setItem('notesCount', notesCount);

    liMaker(note);
    noteInput.value = "";
}

function liMaker(note) {
    const btn_content = document.createElement('button');
    btn_content.type = 'button';
    btn_content.className = 'contentBtn';
    btn_content.textContent = `${note.text}`;
    btn_content.addEventListener("click", (e) => addContent(e));

    const btn_delete = document.createElement('button');
    btn_delete.type = 'button';
    btn_delete.className = 'deleteBtn';
    const img = document.createElement('img');
    img.setAttribute('src', '/assets/images/cross.svg');
    btn_delete.appendChild(img);
    btn_delete.addEventListener("click", (e) => deleteNote(e));

    const div_note = document.createElement('div');
    div_note.id = `${note.id}`;
    div_note.value = note.id;
    /* div_note.classList.add('style_new_habit') */
    div_note.appendChild(btn_content);
    div_note.appendChild(btn_delete);
    document.getElementById('list_habit').appendChild(div_note);
}

// удаление конкретной привычки
function deleteNote(e) {
    let parent = e.target.parentElement.closest('div');
    parent.remove();

    localStorage.removeItem('notes');
    filteredItemsArray = itemsArray.filter((item) => item.id != parent.value);
    localStorage.setItem('notes', JSON.stringify(filteredItemsArray));
    localStorage.removeItem(`${parent.value}`);
    itemsArray = filteredItemsArray;
}

// удаление всех привычек из списка
function clearList() {
    itemsArray.forEach(item => {
        localStorage.removeItem(`${item.id}`);
    });
    document.getElementById('list_habit').innerHTML = "";
    localStorage.removeItem('notes');
    itemsArray = [];
    localStorage.removeItem('notesCount');
    notesCount = 0;
    localStorage.removeItem('habitCount');
    uncheck();
}

// добавлени значений в чекбоксы по дням недели из локального хранилища
function addContent(e) {
    uncheck(); // снимаем все значения с чекбоксов
    let bar = document.querySelector(".progress__bar");
    bar.value = 0; // снимаем все значения с прогресс бара
    let div_id = e.target.parentNode.id;
    let week_check = JSON.parse(localStorage.getItem(`${div_id}`));
    let week_keys = Object.keys(week_check);
    for (let i = 0; i < week_keys.length; i++) {
        let day = week_keys[i];
        let checkbox = document.getElementById(day);
        if (week_check[`${day}`] == true) {
            checkbox.checked = true;
        }
    }
    localStorage.setItem('habitCount', div_id);
    progressBar()
}

// обновление значений чекбоксов для конкретной привычки в локальном хранилище при нажатии на чекбокс
function changeCheckbox(e) {
    let checkbox_id = e.target.id; // день недели
    let checkbox_checked = e.target.checked; // значение нажатоко чекбокса

    let num_habit = JSON.parse(localStorage.getItem('habitCount')); // id привычки у которой меняем значени
    let week_check = JSON.parse(localStorage.getItem(`${num_habit}`));
    localStorage.removeItem(`${num_habit}`);
    week_check[checkbox_id] = checkbox_checked;
    console.log(week_check)
    localStorage.setItem(`${num_habit}`, JSON.stringify(week_check));
}

// снимаем все значения с чекбоксов
function uncheck() {
    var uncheck = document.getElementsByTagName('input');
    for (var i = 0; i < uncheck.length; i++) {
        if (uncheck[i].type == 'checkbox') {
            uncheck[i].checked = false;
        }
    }
}

let allcheckbox = document.querySelectorAll("input[type='checkbox']");
allcheckbox.forEach(item => item.addEventListener("click", (e) => changeCheckbox(e)));

addBtn.addEventListener("click", addStuff);
clearBtn.addEventListener("click", clearList);
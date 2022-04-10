class Note {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }
}

const addBtn = document.querySelector(".addBtn");
const clearBtn = document.querySelector('.clearBtn');
const noteInput = document.querySelector('.note');
let itemsArray = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
let notesCount = localStorage.getItem('notesCount') ? JSON.parse(localStorage.getItem('notesCount')) : 0;
let habitCount = localStorage.getItem('habitCount') ? JSON.parse(localStorage.getItem('habitCount')) : 0;

let nav = 0; //чтобы отслеживать, на каком мы месяце
let clicked = null; //отслеживать кликнутые даты
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []; //do we already have it in local storage => we return an array of JSON objects, if not, we return empty array

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; //порядок дней важен, так как мы будем использовать их индексы далее


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
    document.getElementById('habit_title').textContent = e.target.textContent; // выводим название привычки
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


function openModal(date) {
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked); //мы ищем каждый ивент из массива ивентс у которого дата равна clicked

    if (eventForDay) {
        deleteEventModal.style.display = 'block';
    } else {
        newEventModal.style.display = 'block';
    }
    backDrop.style.display = 'block';
}

function load() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate(); //тут мы добавляем к месяцу 1, смотрим из мая, а день установили 0, значит, это первый день мая - 1, getDate показывает именно последний номер дня

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }); //тут мы локализовали отображение даты, я сначала сделала русское, но не смогла дальше разобраться, весь дальнейший код поехал, так что вернула на en

    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]); //с помощью сплит мы отделяем всё, что находится до запятой перед элементом с индексом 0, то есть перед сегодняшней датой; ', ' у нас является separator, то есть мы по запятой отделили все элементы нашего массива

    document.getElementById('monthDisplay').innerText =
        `${dt.toLocaleDateString('ru-RU', { month: 'long' })} ${year}`; // добавить в хэдер месяц и год, тут тоже локализовала, но уже на русский и это ничего не сбило и отобразился месяц на русском

    calendar.innerHTML = ''; //смываем всё перед запуском нового цикла

    for (let i = 1; i <= paddingDays + daysInMonth; i++) { // тут мы делаем цикл, начиная с 1 и до того, как доберемся до i <= сумме лишних дней и дней месяца. В итоге мы получаем количество окошек, которые нам надо создать
        const daySquare = document.createElement('div'); // в каждой итерации создается див 
        daySquare.classList.add('day'); //тут мы добавляем класс day каждому окошку

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays; // эта будет цифра в окошке с датой, то есть по сути день даты, но считаем её с помощью вычитания пустых окошек из индекса окошка
            const eventForDay = events.find(e => e.date === dayString); //ищем все ивенты, чья дата соответствует нашему массиву dayString

            if (eventForDay) {
                const eventDiv = document.createElement('div');
                daySquare.classList.add('done'); //меняет цвет дня, если задача выполнена
                daySquare.append(eventDiv);
            }
            if (i - paddingDays === day && nav === 0) { //приписываем id current date окошку с сегодняшней датой, чтобы оно отличалось по цвету
                daySquare.id = 'currentDay';

            }

            daySquare.addEventListener('click', () => openModal(dayString));
        } else {
            daySquare.classList.add('padding'); //тут добавляем класс дням из предыдущего месяца, которые попадают на нашу неделю
        }

        calendar.append(daySquare);
    }
}

function closeModal() {
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    clicked = null;
    load();
}

function saveEvent() { //при нажатии кнопки saveButton, мы добавляем ивент в массив ивентс, а также сохраняем его в локальное хранилище
    events.push({
        date: clicked,
    });
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();

}


function deleteEvent() {
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
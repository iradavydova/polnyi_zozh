let nav = 0; //чтобы отслеживать, на какой мы недели относительно сегодняшнего дня
let mon = 0; //чтобы отслеживать, на каком мы месяце относительно сегодняшнего дня
let clicked = null; //отслеживать кликнутые даты
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []; //do we already have it in local storage => we return an array of JSON objects, if not, we return empty array

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//порядок дней важен, так как мы будем использовать их индексы далее

Date.prototype.daysInMonth = function () {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
};

function openModal(date) {
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);
    //мы ищем каждый ивент из массива ивентс у которого дата равна clicked

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
        dt.setDate(new Date().getDate() + nav);
    }

    /* let dtmonth = dt.daysInMonth();
    console.log(dtmonth)
    let divmonth = dtmonth - dt.getDate;
    if (divmonth < 0) {
        dt.setDate(new Date().getMonth() - 1);
        console.log(dt)
    } else if (divmonth < 7) {
        dt.setDate(new Date().getMonth() + 1);
        console.log(dt)
    } */

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const dateString = dt.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }); //тут мы локализовали отображение даты

    let paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
    //с помощью сплит мы отделяем всё, что находится до запятой перед элементом с индексом 0, то есть перед сегодняшней датой; ', ' у нас является separator, то есть мы по запятой отделили все элементы нашего массива

    let firstDayOfWeek = new Date(year, month, day - paddingDays).getDate();
    let lastDayOfWeek = new Date(year, month, day + 6 - paddingDays).getDate();

    document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('ru-RU', { month: 'long' })} ${year}`;
    // добавить в хэдер месяц и год, тут тоже локализовала, но уже на русский и это ничего не сбило и отобразился месяц на русском

    calendar.innerHTML = ''; //смываем всё перед запуском нового цикла

    for (let i = firstDayOfWeek; i <= lastDayOfWeek; i++) {
        const daySquare = document.createElement('div'); // в каждой итерации создается див 
        daySquare.classList.add('day'); //тут мы добавляем класс day каждому окошку

        const dayString = `${month+1}/${i}/${year}`;

        daySquare.innerText = i;

        const eventForDay = events.find(e => e.date === dayString);
        //ищем все ивенты, чья дата соответствует нашему массиву dayString

        if (eventForDay) {
            const eventDiv = document.createElement('div');
            daySquare.classList.add('done'); //меняет цвет дня, если задача выполнена
            daySquare.append(eventDiv);
        }
        if (i === day && nav === 0) {
            //приписываем id current date окошку с сегодняшней датой, чтобы оно отличалось по цвету
            daySquare.id = 'currentDay';
        }
        daySquare.addEventListener('click', () => openModal(dayString));
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
        nav = nav + 7;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav = nav - 7;
        load();
    });

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();
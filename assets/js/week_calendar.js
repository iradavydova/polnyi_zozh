let nav = 0; //чтобы отслеживать, на каком мы месяце
let clicked = null; //отслеживать кликнутые даты
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []; //do we already have it in local storage => we return an array of JSON objects, if not, we return empty array

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; //порядок дней важен, так как мы будем использовать их индексы далее

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
        dt.setDate(new Date().getDay() + nav);
        console.log(dt)
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, day);
    const daysInWeek = new Date(year, month, 7).getDate(); //тут мы добавляем к месяцу 1, смотрим из мая, а день установили 0, значит, это первый день мая - 1, getDate показывает именно последний номер дня
    console.log(firstDayOfMonth)
    console.log(daysInWeek)

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }); //тут мы локализовали отображение даты, я сначала сделала русское, но не смогла дальше разобраться, весь дальнейший код поехал, так что вернула на en
    console.log(dateString)

    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]); //с помощью сплит мы отделяем всё, что находится до запятой перед элементом с индексом 0, то есть перед сегодняшней датой; ', ' у нас является separator, то есть мы по запятой отделили все элементы нашего массива
    console.log(paddingDays)

    document.getElementById('monthDisplay').innerText =
        `${dt.toLocaleDateString('ru-RU', { month: 'long' })} ${year}`; // добавить в хэдер месяц и год, тут тоже локализовала, но уже на русский и это ничего не сбило и отобразился месяц на русском

    calendar.innerHTML = ''; //смываем всё перед запуском нового цикла

    for (let i = 1; i <= paddingDays + daysInWeek; i++) { // тут мы делаем цикл, начиная с 1 и до того, как доберемся до i <= сумме лишних дней и дней месяца. В итоге мы получаем количество окошек, которые нам надо создать
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
load();
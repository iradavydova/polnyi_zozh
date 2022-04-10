let quotes = [{
        "quote": "Вы никогда не сумеете решить возникшую проблему, если сохраните то же мышление и тот же подход, который привел вас к этой проблеме.",
        "author": "Альберт Эйнштейн"
    },
    {
        "quote": "Мы – рабы своих привычек. Измени свои привычки, изменится твоя жизнь.",
        "author": "Роберт Кийосаки"
    },
    {
        "quote": "У вас будут неудачи. У вас будут травмы. Вы будете ошибаться. У вас будут периоды депрессии и отчаяния. Семья, учеба, работа, проблемы быта – все это не раз и не два станет помехой тренингу. Однако стрелка вашего внутреннего компаса должна всегда показывать одно и тоже направление – к цели.",
        "author": "Стюарт МакРоберт"
    },
    {
        "quote": "Если останавливаться всякий раз, когда тебя оскорбляют или в тебя плюются, то ты никогда не дойдешь до места, куда тебе надо попасть.",
        "author": "Тибор Фишер"
    },
    {
        "quote": " Для нас не должно существовать никаких пределов.",
        "author": "Ричард Бах"
    },
    {
        "quote": "Окружай себя только теми людьми, кто будет тянуть тебя выше. Просто жизнь уже полна теми, кто хочет тянуть тебя вниз.",
        "author": "Джордж Клуни"
    },
    {
        "quote": "Знаний недостаточно, ты должен применять их. Желаний недостаточно, ты должен делать.",
        "author": "Брюс Ли"
    },
    {
        "quote": "Все победы начинаются с победы над самим собой.",
        "author": "Леонид Леонов"
    },
    {
        "quote": "Ты не можешь ни выйграть, ни проиграть до тех пор, пока ты не участвуешь в гонках.",
        "author": "Дэвид Боуи"
    },
    {
        "quote": "Если хотите добиться успеха, задайте себе 4 вопроса: Почему? А почему бы и нет? Почему бы и не я? Почему бы и не прямо сейчас?",
        "author": "Джимми Дин"
    },
    {
        "quote": "Даже если вы очень талантливы и прилагает большие усилия, для некоторых результатов просто требуется время: вы не получите ребенка через месяц, даже если заставите забеременеть девять женщин.",
        "author": "Уоррен Баффет"
    },
    {
        "quote": "Тяжелый труд – это скопление легких дел, которые вы не сделали, когда должны были сделать.",
        "author": "Джон Максвелл"
    },
    {
        "quote": "Не ошибается тот, кто ничего не делает! Не бойтесь ошибаться – бойтесь повторять ошибки!",
        "author": "Теодор Рузвельт"
    },
    {
        "quote": "Путь в тысячу ли начинается с одного единственного маленького шага.",
        "author": "Лао Цзы"
    },
    {
        "quote": "Мы являемся тем, что постоянно делаем. Следовательно, совершенство – не действие, а привычка.",
        "author": "Аристотель"
    }
]

function randomQuote() {

    let random = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quotation").innerHTML = random.quote;
    document.getElementById("author").innerHTML = random.author;

}
randomQuote();

function signUp() {
    location.href = 'registration.html';
}
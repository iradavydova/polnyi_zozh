let errors = [];

function checkValidity(input) {
    let validity = input.validity;
    if (validity.valueMissing) {
        errors.push('Пожалуйста, введите ' + input.placeholder);
    }
    if (validity.patternMismatch) {
        errors.push('Введите корректный email-адрес');
    }
    if (validity.tooShort) {
        errors.push('Длина пароля должна быть больше 8 символов')
    }
}

function checkAll(event) {
    event.preventDefault();
    errors = [];
    let inputs = document.querySelectorAll("input");
    let privacy_check = document.getElementById('checkbox1');

    for (let input of inputs) {
        checkValidity(input);
    }

    if (privacy_check.checked == false) {
        errors.push('Подтвердите принятие условий.')
    }

    document.getElementById('errorsInfo').innerHTML = errors.join('. <br>');

    let username = document.getElementById('login').value;
    if (localStorage.getItem('name') == null) {
        localStorage.setItem('name', username);
    }

    if (errors.length == '') {
        window.location.href = "second_page.html";
        localStorage.clear();
    }
};

/* для следующей страницы: при загрузке страницы проверяет, есть ли сохраненное имя в лок.хран.
document.addEventListener("DOMContentLoaded", function(event) {
    let name = localStorage.getItem('name');
    if(name != null) {
        document.getElementById('login').value = name;
    }
});*/

//const form = document.querySelector('form');
//form.addEventListener('submit', checkAll);
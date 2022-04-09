let errors = [];
function checkValidity(input) {
    let validity = input.validity;
    if (validity.valueMissing) { errors.push('Пожалуйста, введите ' + input.placeholder); }
    if (validity.patternMismatch) { errors.push('Введите корректный email-адрес');}
    if (validity.tooShort) {errors.push('Длина пароля должна быть больше 8 символов')}
}

function checkAll() {
    errors = [];
    let inputs = document.querySelectorAll("input");
    let privacy_check = document.getElementById('checkbox1');

    for (let input of inputs) {
        checkValidity(input);
    }

    if (privacy_check.checked == false) {errors.push ('Подтвердите принятие условий.')}
    
    document.getElementById('errorsInfo').innerHTML=errors.join('. <br>');
}

//form.addEventListener('submit', checkAll());
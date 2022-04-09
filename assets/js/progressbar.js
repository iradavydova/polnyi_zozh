document.addEventListener('DOMContentLoaded', function () {

    let count = 0;
    let checked = 0;

    function countBoxes() {
        count = document.querySelectorAll("input[type='checkbox']").length;
    }

    countBoxes();
    let countall = document.querySelectorAll('input[type="checkbox"]');
    countall.forEach(item => item.addEventListener('click', countBoxes));

    function countChecked() {
        checked = document.querySelectorAll('input[type="checkbox"]:checked').length;

        let percentage = parseInt(((checked / count) * 100), 10);
        let bar = document.querySelector(".progress__bar");
        bar.value = percentage;


        document.querySelector("#progress-label").innerHTML = (percentage + "%");
    }

    countChecked();
    let marks = document.querySelectorAll('input[type="checkbox"]');
    marks.forEach(item => item.addEventListener('click', countChecked));
});
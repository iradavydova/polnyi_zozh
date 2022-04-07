/* let myBar = document.getElementById('my-progress-bar');
let laberBar = document.getElementById('progress-label');
let chbox = document.getElementsByClassName('select-done');

let increaseProgress = function increase() {
    myBar.value += 1;
    myBar.innerHTML = myBar.value + '%';
    if(myBar.value < 7) {
        laberBar.innerHTML = myBar.value + '%';
    }
    laberBar.innerHTML = "100%"

} */

let laberBar = document.getElementById('progress-label');
let myBar = document.getElementById("my-progress-bar");
let markDone = document.getElementById("mark-done");
console.log(markDone)

function increase() {
    let checked = 0;
    myBar.value = 0;

    boxes = markDone.querySelectorAll("input[type='checkbox']:checked");
    checked = boxes.length;

    if (myBar.value < 7) {
        laberBar.innerHTML = myBar.value + '%';
        myBar.value += 1;
    }
    laberBar.innerHTML = "100%";

    myBar.value = ((checked / 7) * 100) + "%";
}

checks = document.querySelectorAll("input[type='checkbox']");
checks.forEach(function (box) {
    box.addEventListener("change", function (e) {
        //increase();
        addContent();
    });
});
class Daycheck {
    constructor(value, check) {
        this.value = value;
        this.check = check;
    }
}

function addContent() {
    let checkboxes = markDone.querySelectorAll("input");
    console.log(checkboxes)
    checkboxes.forEach(item => {
        localStorage.setItem(`${item.id}`, item.checked)
    });
}
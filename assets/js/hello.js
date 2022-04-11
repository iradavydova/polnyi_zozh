let hello = JSON.parse(localStorage.getItem('name'));
document.getElementById('hello').innerHTML = (`Привет, ${hello}! `);
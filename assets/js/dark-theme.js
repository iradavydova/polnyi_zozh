        // Добавляем или удаляем класс у всего документа (у тега body), найдя его по id.
        
        function darkThemeOn() {
            let body = document.getElementById('body');
            body.classList.add("dark-theme");
        }
        
        function darkThemeOff() {
            let body = document.getElementById('body');
            body.classList.remove("dark-theme");
        }
        
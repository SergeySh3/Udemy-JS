function calculator() {

    // ---- CALCULATOR -----

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    // сохранение выбранных значений в localStorage и значения по умолчанию
    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    //делаем активными элементы соответсвующие данным из localStorage
    function initLocalSettings (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') == localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio') == localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);   
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    // основная функция с формулой подсчета
    function calcTotal() {
        if(!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if(sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);    
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio); 
        }

    }

    calcTotal();

    // функция по собиранию статичных данных (пол и коэфициент активности(1 и 3 блок)) 
    function getStaticInformation (selector, activeClass){
        const elements = document.querySelectorAll(selector);

        // вешаем обработчик, используем делегирование
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio'); // записываем в ratio для формулы данные из дата-атрибута
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else { // если нет дата-атрибута data-ratio, значит это пол. Записываем в sex id из e.target
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                //добавляем .класс активности
                elements.forEach(elem => { // удаляем .класс активности со всех элементов
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass); //добавляем .класс активности на e.target
    
                calcTotal();

            });
        });        
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    
    // функция по собиранию динамических данных (вес, рост, возраст)
    function getDynamicInformation (selector) {
        const input = document.querySelector(selector);
        //вешаем обработчик на каждый инпут
        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            }   else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });        
    }

    getDynamicInformation ('#height');
    getDynamicInformation ('#weight');
    getDynamicInformation ('#age');

}

module.exports = calculator;
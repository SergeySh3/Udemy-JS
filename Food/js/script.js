window.addEventListener('DOMContentLoaded', function() {

    // -----TABS-----

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    //Скрыть картинку и текст в табе      
    function hideTabContent () {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    //Показать картинку и текст в табе   
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    //Переключение табов
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);    
                }
            });
        }
    });

    // -----TIMER-----

    const deadline = '2021-07-16';

    //Функция возвращает объект с разницей между текущей датой и дедлайном
    function getTimeRemaining (endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), // разница в миллесекундах 
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              // 1000 милисекунд * секунд в минуте * минут в часе % - показать остаток 
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    
    // Добавление нуля если число меньше 10 
    function getZero (num) {
        if (num >=0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // Рендер таймера на страницу
    function setClock (selector, endtime){
        const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

        updateClock();
                
        function updateClock() {
            const t = getTimeRemaining (endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0){
                clearInterval(timeInterval);
            }
        }            
    }     

    setClock('.timer', deadline);





    // -----MUNU OF DAY (Classes)-----

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 75;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price*this.transfer;
        }

        render() {   
            const element = document.createElement('div');
            // Добавляем классы из rest-опертора (...classes)
            if (this.classes.length === 0) { 
                this.element = 'menu__item'; //значение по умолчанию если не передали ни одного класса
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>          
            `;
            this.parent.append(element);
        }
    }

    // Функция получения с сервера данных для карточки с товаром
    const getRecource = async (url) => {
        const res = await fetch(url);
        // Если не получится сделать fetch-запрос, создаем новую ошибку
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    };

    // Рендер карточек товаров с данными с сервера, деструктуризация
    // getRecource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    // Рендер карточек товаров с данными с сервера с помощью axios
    axios.get('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });


    // -----MODAL WINDOW-----

        const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    // Открытие модального окна    
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        // clearTimeout(modalTimerId);
    }
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    }); 

    // Закрытие модального окна
    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }
    
    
    // Закрытие модального окна по клику по кнопке и области
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();    
        }
    });

    // Закрытие модального окна по Esc
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Открытие модального окна черех 5 сек
    // const modalTimerId = setTimeout(openModal, 5000);

    // Открытие модального окна при пролистывании страницы в самый низ
    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    // ----- FORMS (работа с сервером) -----

    const forms = document.querySelectorAll('form');

    // объект с сообщениями    
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    // Навешиваем функцию bindPostData на все формы на странице
    forms.forEach(item => {
        bindPostData(item);
    });

    // Функция postData делает запрос на сервер, получает ответ и конвертирует его в json
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data           
        });
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

                     
            const formData = new FormData(form); // тип данный что будем отправлять

            // передаем FormData в формате json
            const object = {}; // создаем пустой объект

            // СТАРЫЙ СПОСОБ
            // formData.forEach(function(value, key){ // перебираем FormData и все свойстава записываем в новый пустой объект
            //     object[key] = value;
            // }); 
            
            // НОВЫЙ СПОСОБ
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // fetch-запрос на сервер
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();                 
            })
            .catch(() => {
                showThanksModal(message.failure);    
            })
            .finally(() => {
                form.reset();
            });
        });
    }

    // Модальное окно с благодарностью
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>            
            </div>       
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);


    }   
    
    
    // ----- SLIDER -----

    
    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideindex = 1;
    let offset = 0;
    // Подставляем в total и current общее кол-во слайдов
    if(slides.length < 10 ) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideindex}`;
    } else {
        total.textContent = slides.length; 
        current.textContent = slideindex; 
    }
    // Общая длина слайдов в одну линию
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    // Скрываем все лишние слайды, видимы только активный
    slidesWrapper.style.overflow = 'hidden';
    // Назначаем всем слайдам одинаковую ширину
    slides.forEach(slide => {
        slide.style.width = width;
    });

    //делаем навигацию "точки"
    slider.style.position = 'relative';    
    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    //добавдяем точки на страницу и делаем первую точку непрозрачной
    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);        
        if (i == 0){
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }


    next.addEventListener('click', () => {
        if(offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) { // случай когда долистываем до последнего слайда
                        //обрезаем px с конца строки (500) х 4(слайда) - 1
            offset = 0;// прыгаем на первый
        } else {
            offset += +width.slice(0, width.length - 2); //прыгаем на +ширину слайда
        }        
        slidesField.style.transform = `translateX(-${offset}px)`;//прыгаем на +ширину слайда

        if(slideindex == slides.length) {
            slideindex = 1; //прыгаем на первый
        } else {
            slideindex++; //прибавляем индекс
        }

        if(slides.length < 10) {
            current.textContent = `0${slideindex}`;
        } else {
            current.textContent = slideindex; 
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideindex-1].style.opacity = 1;

    });

    prev.addEventListener('click', () => {
        if( offset == 0 ){  // случай когда стоит первый слайд          
            offset = +width.slice(0, width.length - 2) * (slides.length - 1); // прыгаем в конец
        } else {
            offset -= +width.slice(0, width.length - 2);//прыгаем на -ширину слайда
        }

        slidesField.style.transform = `translateX(-${offset}px)`;//прыгаем на -ширину слайда

        if(slideindex == 1) {
            slideindex = slides.length;//прыгаем на последний
        } else {
            slideindex--;//вычитаем индекс
        }

        if(slides.length < 10) {
            current.textContent = `0${slideindex}`;
        } else {
            current.textContent = slideindex; 
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideindex-1].style.opacity = 1;
        
    });
    // клики по точкам в слайдере (навигация)
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideindex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            if(slides.length < 10) {
                current.textContent = `0${slideindex}`;
            } else {
                current.textContent = slideindex; 
            }
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideindex-1].style.opacity = 1;
        });
    });


    // ---- ПЕРВЫЙ ВАРИАНТ -----

    // showSlide(slideindex);

    // if( slides.length < 10 ) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;  
    // }


    // function showSlide(n) {           
    //     if( n > slides.length ) {
    //         slideindex = 1;
    //     }
    //     if( n < 1) {
    //         slideindex = slides.length;
    //     }
    //     slides.forEach(item => item.style.display = 'none');
    //     slides[slideindex - 1].style.display = 'block';  
        
    //     if( slides.length < 10 ) {
    //         current.textContent = `0${slideindex}`;
    //     } else {
    //         current.textContent = slideindex;  
    //     }
    // }

    // function slidePlus(n) {
    //     showSlide(slideindex += n);
    // }

    // prev.addEventListener('click', () => {
    //     slidePlus(-1);
    // });

    // next.addEventListener('click', () => {
    //     slidePlus(1);
    // });

    










});
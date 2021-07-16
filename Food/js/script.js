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

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        10,
        '.menu .container',
            

    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        30,
        '.menu .container',
        'menu__item',        

    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        8,
        '.menu .container',
        'menu__item',        

    ).render();

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

    // Навешиваем функцию postData на все формы на странице
    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
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
            formData.forEach(function(value, key){ // перебираем FormData и все свойстава записываем в новый пустой объект
                object[key] = value;
            });            

            // fetch-запрос на сервер
            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            .then(data => data.text())
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




    

});
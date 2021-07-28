function forms() {

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

}

module.exports = forms;
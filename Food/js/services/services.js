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

    // Функция получения с сервера данных для карточки с товаром
    async function getRecource(url) {
        let res = await fetch(url);
        // Если не получится сделать fetch-запрос, создаем новую ошибку
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }

    export {postData};
    export {getRecource};
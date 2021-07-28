function timer(id, deadline) {

    // -----TIMER-----

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

    setClock(id, deadline);
}

export default timer;
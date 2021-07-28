function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    // ----- SLIDER -----

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
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

    //обрезаем px с конца строки регулярным выражением (500)
    function deleteNotDigits(str) {
        return +str.replace(/[^\d.]/g, ''); 
    }

    //показываем с нулём текущий слад
    function showNumberCurrentSlide() {
        if(slides.length < 10) {
            current.textContent = `0${slideindex}`;
        } else {
            current.textContent = slideindex; 
        }    
    }

    // меняем прозрачность активной точки
    function changeOpacityDots() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideindex-1].style.opacity = 1;
    }

    next.addEventListener('click', () => {
        if (offset == (deleteNotDigits(width) * (slides.length - 1))) { // случай когда долистываем до последнего слайда
                        //обрезаем px с конца строки регулярным выражением (500) х 4(слайда) - 1
            offset = 0;// прыгаем на первый
        } else {
            offset += deleteNotDigits(width);  //прыгаем на +ширину слайда
        }    

        slidesField.style.transform = `translateX(-${offset}px)`;//прыгаем на +ширину слайда

        if (slideindex == slides.length) {
            slideindex = 1; //прыгаем на первый
        } else {
            slideindex++; //прибавляем индекс
        }

        showNumberCurrentSlide();
        changeOpacityDots();

    });

    prev.addEventListener('click', () => {
        if( offset == 0 ){  // случай когда стоит первый слайд          
            offset = deleteNotDigits(width) * (slides.length - 1); // прыгаем в конец
        } else {
            offset -= deleteNotDigits(width);//прыгаем на -ширину слайда
        }

        slidesField.style.transform = `translateX(-${offset}px)`;//прыгаем на -ширину слайда

        if(slideindex == 1) {
            slideindex = slides.length;//прыгаем на последний
        } else {
            slideindex--;//вычитаем индекс
        }

        showNumberCurrentSlide();
        changeOpacityDots();
        
    });

    // клики по точкам в слайдере (навигация)
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideindex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            showNumberCurrentSlide();
            changeOpacityDots();
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

}

export default slider;
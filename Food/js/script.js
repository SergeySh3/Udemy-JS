require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';
import tabs from './modules/tabs'; 
import timer from './modules/timer';
import slider from './modules/slider';
import modal from './modules/modal';
import forms from './modules/forms';
import cards from './modules/cards';
import calculator from './modules/calculator';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', function() {
    // Открытие модального окна черех 5 сек
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 500000);
    
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2021-10-01');    
    modal('[data-modal]', '.modal', modalTimerId);
    forms('form', modalTimerId);
    cards();
    calculator();
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});
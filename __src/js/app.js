import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebP();

/*
// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper';

const swiper = new Swiper('.swiper', {
    // configure Swiper to use modules
    modules: [Navigation, Pagination]
});
*/


import Swiper, { Navigation } from 'swiper';

Swiper.use([Navigation]);

const swiper = new Swiper('.swiper', {
    // configure Swiper to use modules
    //modules: [Navigation],
    slidesPerView: 1,
    loop: false,
    centeredSlides: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

document.addEventListener("DOMContentLoaded", function() {

    /**Menu button */
    const viewport = document.documentElement.clientWidth;//вычисляем ширину вьюпорта
    const sidebar = document.querySelector(".sidebar");
    const menuBtnOpen = document.querySelector(".header__menu-btn.btn-open");
    const menuBtnClose = document.querySelector(".header__menu-btn.btn-close");

    menuBtnOpen.addEventListener("click", function () {//открытие меню
        document.body.classList.add("lock");//блокируем скролл при открытии меню
        sidebar.classList.add("opened");
        menuBtnOpen.classList.remove("active");
        menuBtnClose.classList.add("active");
    });


    menuBtnClose.addEventListener("click", function () {//закрытие
        document.body.classList.remove("lock");//разблокируем скролл при закрытии меню
        sidebar.classList.remove("opened");
        menuBtnOpen.classList.add("active");
        menuBtnClose.classList.remove("active");
    });




    /**Menu */
    var navItems = document.querySelector(".nav-items");
    var navItemParents = document.querySelectorAll(".nav-item-parent");
    var navItemChildren = document.querySelectorAll(".nav-item-children");
    var navBack = document.querySelector(".nav-back");
    var navItemActiveChildrenPlaceholder = document.querySelector(".nav-item-active-children");

    //Перемещение всех children ul в отдельный div
    Array.prototype.forEach.call(navItemChildren, function(navItemChild) {
        navItemActiveChildrenPlaceholder.append(navItemChild);
    });

    Array.prototype.forEach.call(navItemParents, function(navItemParent) {
        const thisId = navItemParent.id;
        const thisChildrenId = thisId + "-children";
        navItemParent.addEventListener("click", function () {

            //Скрытие всех  children ul
            Array.prototype.forEach.call(navItemChildren, function(navItemChild) {
                navItemChild.classList.remove("active");
            });

            let thisChildren = document.getElementById(thisChildrenId);

            //Появление дочернего ul
            thisChildren.classList.add("active");

            //Появление кнопки Назад
            navBack.classList.add("active");

            //Скрытие parent ul
            navItems.classList.remove("active");

        });
    });

    /*
    Array.prototype.forEach.call(navItemParents, function(navItemParent) {

        const thisChildren = navItemParent.querySelector("ul");
        const thisText = navItemParent.querySelector("span");

        navItemParent.addEventListener("click", function () {
            //Появление кнопки Назад
            navBack.classList.add("active");

            //Появление дочернего ul
            thisChildren.classList.add("active");

            //Скрытие текущего заголовка
            thisText.classList.add("d-none");
            
            //Скрытие остальных всех li
            Array.prototype.forEach.call(navItems, function(navItem) {
                navItem.classList.remove("active");
            });

            //Скрытие parent ul
            navItemParent.classList.remove("active");
        });
    });
    */

    navBack.addEventListener("click", function () {
        Array.prototype.forEach.call(navItemParents, function(navItemParent) {

            //Скрытие всех  children ul
            Array.prototype.forEach.call(navItemChildren, function(navItemChild) {
                navItemChild.classList.remove("active");
            });

            //Скрытие кнопки Назад
            navBack.classList.remove("active");

            //Отображение parent ul
            navItems.classList.add("active");

        });
    });


});

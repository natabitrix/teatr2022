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


import Swiper, { Navigation, Autoplay, EffectFade, EffectCreative } from 'swiper';
//import Swiper, { Navigation, Autoplay, EffectFade, EffectCreative, EffectCoverflow } from 'swiper';

Swiper.use([Navigation, Autoplay, EffectFade, EffectCreative]);
//Swiper.use([Navigation, Autoplay, EffectFade, EffectCreative, EffectCoverflow]);

const slider = new Swiper('.main-slider', {
    // configure Swiper to use modules
    //modules: [Navigation],
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    speed: 1000,
    autoplay: {
        delay: 5000,
    },
    /*effect: 'fade',
    fadeEffect: {
        crossFade: true
    }*/
    effect: "creative",
    creativeEffect: {
        prev: {
            shadow: true,
            //translate: [0, 0, -400],

            translate: ["-125%", 0, -800],
            rotate: [0, 0, -90],
        },
        next: {
            //translate: ["100%", 0, 0],

            shadow: true,
            translate: ["125%", 0, -800],
            rotate: [0, 0, 90],
        },
    },
});

const partnersSlider = new Swiper('.partners-slider', {
    slidesPerView: 1,
    loop: false,
    centeredSlides: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        //spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        //spaceBetween: 40,
      },
      992: {
        slidesPerView: 3,
        //spaceBetween: 50,
      },
      1200: {
        slidesPerView: 4,
        //spaceBetween: 50,
      },
      1400: {
        slidesPerView: 5,
        //spaceBetween: 50,
      },
      //1600: {
      //  slidesPerView: 5,
      //},
    }
});

const spectacleSlider = new Swiper('.spectacle-slider', {
    // configure Swiper to use modules
    //modules: [Navigation],
    slidesPerView: "auto",
    loop: true,
    centeredSlides: true,
    spaceBetween: 0,
    slideToClickedSlide: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    speed: 1000,
    //autoplay: {
    //    delay: 5000,
    //},
    /*effect: 'fade',
    fadeEffect: {
        crossFade: true
    }*/
    /*effect: "creative",
    creativeEffect: {
        prev: {
            shadow: true,
            //translate: [0, 0, -400],

            translate: ["-125%", 0, -800],
            rotate: [0, 0, -90],
        },
        next: {
            //translate: ["100%", 0, 0],

            shadow: true,
            translate: ["125%", 0, -800],
            rotate: [0, 0, 90],
        },
    },*/
    /*
    effect: "coverflow",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },*/
});



document.addEventListener("DOMContentLoaded", function () {


    const viewport = document.documentElement.clientWidth;//вычисляем ширину вьюпорта

    /**sidebar toggle */
    function sidebarToggle() {
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
    }

    /**Menu */
    function menu() {
        const navItems = document.querySelector(".nav-items");
        const navItemParents = document.querySelectorAll(".nav-item-parent");
        const navItemChildren = document.querySelectorAll(".nav-item-children");
        const navBack = document.querySelector(".nav-back");
        const navItemActiveChildrenPlaceholder = document.querySelector(".nav-item-active-children");

        //Перемещение всех children ul в отдельный div
        Array.prototype.forEach.call(navItemChildren, function (navItemChild) {
            navItemActiveChildrenPlaceholder.append(navItemChild);
        });

        Array.prototype.forEach.call(navItemParents, function (navItemParent) {
            const thisId = navItemParent.id;
            const thisChildrenId = thisId + "-children";
            navItemParent.addEventListener("click", function () {

                //Скрытие всех  children ul
                Array.prototype.forEach.call(navItemChildren, function (navItemChild) {
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

        navBack.addEventListener("click", function () {
            Array.prototype.forEach.call(navItemParents, function (navItemParent) {

                //Скрытие всех  children ul
                Array.prototype.forEach.call(navItemChildren, function (navItemChild) {
                    navItemChild.classList.remove("active");
                });

                //Скрытие кнопки Назад
                navBack.classList.remove("active");

                //Отображение parent ul
                navItems.classList.add("active");

            });
        });

    }

    /**Tabs */
    function tabs() {
        const tabList = document.querySelectorAll(".tab-list-item");
        const tabContent = document.querySelectorAll(".tab");

        Array.prototype.forEach.call(tabList, function (tabListItem) {
            tabListItem.addEventListener("click", function () {

                const thisId = tabListItem.id;
                const tabContentId = thisId + "-content";
                let thisTabContentItem = document.getElementById(tabContentId);

                //Скрытие всех tab-content
                Array.prototype.forEach.call(tabContent, function (tabContentItem) {
                    tabContentItem.classList.add("d-none");
                });
                //Открытие активной tab-content
                thisTabContentItem.classList.remove("d-none");

                //Убрать активность у всех tab
                Array.prototype.forEach.call(tabList, function (tabListItem) {
                    tabListItem.classList.remove("active");
                });
                //Добавить активность активной tab
                tabListItem.classList.add("active");

                //Обновить фильтр
                filterResponsive();

                //Обновить collapse
                collapseContent();

            });
        });
    }

    /**Filter */
    function filterResponsive() {

        var filterContainers = document.querySelectorAll(".filter-list-container");
        Array.prototype.forEach.call(filterContainers, function (filterContainer) {

            var filterList = filterContainer.querySelector(".filter-list");
            var filterListItems = filterList.querySelectorAll(".filter-item");

            var filterContainerWidth = filterContainer.clientWidth;
            var filterListItemsWidth = 0;

            Array.prototype.forEach.call(filterListItems, function (filterListItem) {
                filterListItemsWidth += filterListItem.clientWidth + 12;
                if (filterListItemsWidth > filterContainerWidth) {
                    filterListItem.classList.add("hidden");
                }
                else {
                    filterListItem.classList.remove("hidden");
                }
            });

            var filterListPlaceholder = filterContainer.querySelector(".filter-list-hidden");
            var filterListHiddenItems = filterList.querySelectorAll(".filter-item.hidden");
            //var filterListHiddenHeight = 0;

            filterListPlaceholder.innerHTML = "";
            Array.prototype.forEach.call(filterListHiddenItems, function (filterListItem) {
                //Перемещение всех hidden li в отдельный ul
                var li = document.createElement("li");
                li.innerHTML = filterListItem.innerHTML;
                filterListPlaceholder.append(li);

                //filterListHiddenHeight += li.clientHeight + 12;
            });

            var filterMoreBtn = filterContainer.querySelector(".btn-more");

            if (filterListItemsWidth > filterContainerWidth) {
                filterMoreBtn.classList.remove("d-none");
            }
            else {
                filterMoreBtn.classList.add("d-none");
            }


            filterMoreBtn.addEventListener("click", function () {

                filterListPlaceholder.classList.toggle("active");

                if (filterListPlaceholder.clientHeight > 0) {
                    filterListPlaceholder.style.height = 0;
                }
                else {
                    //filterListPlaceholder.style.height = filterListHiddenHeight + "px";
                    filterListPlaceholder.style.height = filterListPlaceholder.scrollHeight + "px";
                }

                this.classList.toggle("btn-more-hide");

            });

            document.addEventListener("click", function (event) {
                if (!filterListPlaceholder.contains(event.target) && !filterMoreBtn.contains(event.target)) {
                    filterListPlaceholder.classList.remove("active");
                }
            });
        });
    }

    /**CollapseList*/
    function collapseContent() {
        var collapseContainers = document.querySelectorAll(".collapse-container");

        Array.prototype.forEach.call(collapseContainers, function (collapseContainer) {

            var collapseBtn = collapseContainer.querySelector(".collapse-btn");
            var collapseContent = collapseContainer.querySelector(".collapse-content");

            collapseBtn.addEventListener("click", function () {
                if (collapseContent.clientHeight > 0) {
                    collapseContent.style.height = 0;
                    collapseContent.classList.remove("active");
                    collapseBtn.classList.remove("active");
                }
                else {
                    collapseContent.style.height = collapseContent.scrollHeight + "px";
                    collapseContent.classList.add("active");
                    collapseBtn.classList.add("active");
                }
            });

        });
    }

    /**News item text height*/
    function newsItemTextHeight() {
        var newsItems = document.querySelectorAll(".news__item");
        Array.prototype.forEach.call(newsItems, function (newsItem) {
            var imgHeight = newsItem.querySelector("img").clientHeight;
            newsItem.querySelector(".news__item-text").style.height = imgHeight + "px";
        });
    }




    /**Toggle swiper slider full-screen */
    Array.prototype.forEach.call(document.querySelectorAll(".swiper-slide-fullscreen"), function (slide) {
        slide.addEventListener("click", function () {
            document.querySelector("body").classList.add("swiper-slider-fullscreen");
        });
    });
    Array.prototype.forEach.call(document.querySelectorAll(".close-slider"), function (close) {
        close.addEventListener("click", function () {
            document.querySelector("body").classList.remove("swiper-slider-fullscreen");
        });
    });
    function setSliderHeight()
    {
        var sliderContainer = document.querySelector(".slider-container");
        sliderContainer.style.height = sliderContainer.clientHeight + "px";
    }


    menu();
    sidebarToggle();
    tabs();
    filterResponsive();
    collapseContent();
    newsItemTextHeight();
    //setSliderHeight();


    window.addEventListener('resize', function (event) {
        filterResponsive();
        collapseContent();
        newsItemTextHeight();
        //setSliderHeight();


    });




});



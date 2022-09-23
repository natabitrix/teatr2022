import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebP();


import Sticky from 'sticky-js';
var sticky = new Sticky('[data-sticky]', {});

import Swiper, { Navigation, Autoplay } from 'swiper';
//import Swiper, { Navigation, Autoplay, EffectFade, EffectCreative, EffectCoverflow } from 'swiper';

Swiper.use([Navigation, Autoplay]);
//Swiper.use([Navigation, Autoplay, EffectFade, EffectCreative, EffectCoverflow]);

const slider = new Swiper('.main-slider', {
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    speed: 1000,
    // autoplay: {
    //     delay: 5000,
    // },
    // effect: 'fade',
    // fadeEffect: {
    //     crossFade: true
    // },
    // effect: "creative",
    // creativeEffect: {
    //     prev: {
    //         shadow: true,
    //         translate: ["-125%", 0, -800],
    //         rotate: [0, 0, -90],
    //     },
    //     next: {
    //         shadow: true,
    //         translate: ["125%", 0, -800],
    //         rotate: [0, 0, 90],
    //     },
    // },
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

const gallerySlider = new Swiper('.gallery-slider', {
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
    speed: 1000
});



import Bvi from "./modules/bvi/bvi.js";
new Bvi();



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
    function menu(activeMenuId = "") {
        const navItems = document.querySelector(".nav-items");
        const navItemParents = document.querySelectorAll(".nav-item-parent");
        const navItemChildren = document.querySelectorAll(".nav-item-children");
        const navBack = document.querySelector(".nav-back");
        const navItemActiveChildrenPlaceholder = document.querySelector(".nav-item-active-children");

        //Перемещение всех children ul в отдельный div
        navItemActiveChildrenPlaceholder.innerHTML = "";
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

        if (activeMenuId && activeMenuId != "" && activeMenuId != "@@activeMenuParentId") {
            //Появление дочернего ul
            document.getElementById(activeMenuId).classList.add("active");
            //Появление кнопки Назад
            navBack.classList.add("active");
            //Скрытие parent ul
            navItems.classList.remove("active");
        }

        /**Активный пункт меню временно для верстки */
        if (url && url != "" && url != "@@url") {
            document.getElementsByTagName('a').forEach((link) => {
                if (link.getAttribute("href") == url) {
                    link.classList.add("current");
                }
            });
        }

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

    // function setSliderHeight() {
    //     var sliderContainer = document.querySelector(".slider-container");
    //     sliderContainer.style.height = sliderContainer.clientHeight + "px";
    // }


    function getRandomWholeNumber(min, max) {
        return (Math.random() * (max - min) + min);
    }

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }


    /**
     * рандомные фигуры в любом кол-ве: figures="random" figure_count="auto" (по умолчанию)
     * рандомные фигуры в указанном кол-ве: figures="random" figure_count="3"
     * указанные фигуры в любом кол-ве: figures="1,2,3" figure_count="auto"
     * указанные фигуры в указанном кол-ве: figures="1,2,3" figure_count="7"
     * 
     * недостаток фигур до размеров контейнера дополняется автоматически
     * недостаток фигур до указанного кол-ва дополняется автоматически
     */

    function decoration(container, colors, figures, figureCount, figurePosition, minMargin, edgeMargin, scaleRange, isParallax, shift) {

        const decors = [];

        //все цвета
        var arrColors = ['red', 'blue', 'yellow', 'dark', 'white']; //все фигуры (colors.scss, helper.scss: .decor)
        //указанные цвета
        if (colors != "random") {
            arrColors = colors.split(",");
        }
        //перемешаем массив цветов
        shuffle(arrColors);


        //рандомные фигуры в любом кол-ве: figures="random" figure_count="all" (по умолчанию)
        var arrDecors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; //все фигуры (helper.scss: .decor)

        //перемешаем массив фигур
        shuffle(arrDecors);

        //рандомные фигуры в указанном кол-ве: figures="random" figure_count="3"
        if (figures == "random" && parseInt(figureCount) > 0) {
            arrDecors = arrDecors.slice(0, figureCount);
            console.log(arrDecors);
        }
        else {
            //указанные фигуры в любом кол-ве: figures="1,2,3" figure_count="auto"
            if (figures != "random") {
                arrDecors = figures.split(",");
            }

            //указанные фигуры в указанном кол-ве: figures="1,2,3" figure_count="7" и указанное кол-во больше чем кол-во указанных фигур
            if (parseInt(figureCount) > 0 && arrDecors.length < parseInt(figureCount)) {
                var addNumDecors = parseInt(figureCount) - arrDecors.length; //сколько добавить
                for (let n = 0; n < addNumDecors; n++) {
                    shuffle(arrDecors);
                    arrDecors.push(arrDecors[0]);
                }
            }
        }

        //console.log(arrDecors);

        var numDecors = arrDecors.length;
        var containerSize = container.offsetHeight;
        if (figurePosition == "horizontal") {
            containerSize = container.offsetWidth;
        }
        var margin = containerSize / numDecors;

        if (figureCount == arrDecors.length) {
            margin = minMargin;
        }
        else {
            //недостаток фигур до размеров контейнера дополняется автоматически
            if (margin > minMargin || figureCount == "auto") {
                var newNumDecors = Math.round(containerSize / minMargin);
                margin = minMargin;
                var addNumDecors = newNumDecors - numDecors;
                for (let m = 0; m < addNumDecors; m++) {
                    var addDecor = arrDecors[m];
                    arrDecors.push(addDecor);
                }
            }
        }

        margin = parseFloat(margin);

        shuffle(arrDecors);

        let i = 0;
        var randomIndex = Math.round(Math.random()); //1 или 0

        arrDecors.forEach(element => {

            let decor = document.createElement("div");

            decor.classList.add("decor");
            decor.classList.add("decor" + element);
            decor.classList.add("decor-" + arrColors[Math.floor(Math.random() * arrColors.length)]);

            var scale = 1;
            if (scaleRange) {
                var scaleMin = parseFloat(scaleRange.split(",")[0]);
                var scaleMax = parseFloat(scaleRange.split(",")[1]);
                scale = (getRandomWholeNumber(scaleMin, scaleMax)).toFixed(1);
                decor.setAttribute("data-scale", scale);
            }

            var rotate = (getRandomWholeNumber(0, 360)).toFixed(1);
            decor.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
            decor.setAttribute("data-rotate", rotate);


            var randomMargin = (getRandomWholeNumber(margin - 1, margin + 1)).toFixed(1);
            if (figurePosition == "horizontal") {
                //decor.style.left = randomMargin * i + "px";
                decor.style.left = randomMargin * i + "%";
            }
            else {
                //decor.style.top = randomMargin * i + "px";
                decor.style.top = randomMargin * i + "%";
            }


            var left = 0;
            var right = 0;
            var top = 0;
            var bottom = 0;
            var dir = 0;

            if (arrDecors.length == 1) { //center
                left = "40%";
                right = "auto"
                dir = -1;
            }
            else if (arrDecors.length == 3) {
                if (i == 0) { //left
                    right = "auto";
                    left = getRandomWholeNumber(0, edgeMargin) + "%";
                    dir = 1;
                }
                else if (i == 1) { //center
                    left = "40%";
                    right = "auto"
                    dir = -1;
                }
                else { //right
                    left = "auto";
                    right = getRandomWholeNumber(0, edgeMargin) + "%";
                    dir = -1;

                }
            }
            else {

                if (figurePosition == "horizontal") {
                    if (i % 2 == randomIndex) { //top
                        bottom = "auto";
                        top = getRandomWholeNumber(0, edgeMargin) + "%";
                        dir = 1;
                    }
                    else {  //bottom
                        top = "auto";
                        bottom = getRandomWholeNumber(0, edgeMargin) + "%";
                        dir = -1;
                    }
                }
                else {
                    if (i % 2 == randomIndex) { //left
                        right = "auto";
                        left = getRandomWholeNumber(0, edgeMargin) + "%";
                        dir = 1;
                    }
                    else {  //right
                        left = "auto";
                        right = getRandomWholeNumber(0, edgeMargin) + "%";
                        dir = -1;
                    }
                }

            }

            if (figurePosition == "horizontal") {
                decor.style.top = top;
                decor.style.bottom = bottom;
            }
            else {
                decor.style.left = left;
                decor.style.right = right;
            }

            decor.setAttribute("data-shift", shift * dir);


            i++;
            decors.push(decor);
            container.append(decor);
        });


        // Keyframes
        /*if (isAnim) {
            decors.forEach((el, i, ra) => {
                let to = {
                    x: Math.random() * (i % 2 === 0 ? -11 : 11),
                    y: Math.random() * 12
                };

                let anim = el.animate(
                    [
                        { transform: "translate(0, 0)" },
                        { transform: `translate(${to.x}rem, ${to.y}rem)` }
                    ],
                    {
                        duration: (Math.random() + 1) * 2000, // random duration
                        direction: "alternate",
                        fill: "both",
                        iterations: Infinity,
                        easing: "ease-in-out"
                    }
                );
            });
        }*/



        if (isParallax) {

            document.addEventListener("mousemove", parallax);
            function parallax(event) {
                container.querySelectorAll(".decor").forEach((decor_move) => {
                    const shift = decor_move.getAttribute("data-shift");
                    const scale = decor_move.getAttribute("data-scale");
                    const rotate = decor_move.getAttribute("data-rotate");
                    const x = ((container.offsetWidth - event.pageX * shift) / 90).toFixed(1);
                    const y = ((container.offsetHeight - event.pageY * shift) / 90).toFixed(1);

                    decor_move.style.transform = `translateX(${x}px) translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`;

                });
            }
        }

    }

    function initDecors() {
        var containerDecors = document.querySelectorAll(".decors-js");

        Array.prototype.forEach.call(containerDecors, function (decor) {

            decor.innerHTML = "";

            if (decor.dataset.figure !== undefined) {
                //цвета (helper.scss: .decor)
                //data-colors="red,blue,yellow,dark,white" или random
                //var arrColors = decor.dataset.colors.split(",");
                var colors = (decor.dataset.colors !== undefined) ? decor.dataset.colors : "random";

                //или рандом, или заданные
                //data-figure="1,2" или data-figure="random" 
                var figure = decor.dataset.figure;

                //кол-во фигур
                //data-figure_count="2" или data-figure_count="auto" 
                var figure_count = (decor.dataset.figure_count !== undefined) ? decor.dataset.figure_count : "auto";

                //вид расположения фигур
                //data-figure_pos="vertical" или data-figure_pos="horizontal" 
                var figure_pos = (decor.dataset.figure_pos !== undefined) ? decor.dataset.figure_pos : "vertical";

                //отступ фигур друг от друга в пикс (если нехватает фигур, они будут добавляться)
                //если не нужно добавления, надо поставить большой отступ, типа 10000
                //data-min_margin="500" 
                var min_margin = (decor.dataset.min_margin !== undefined) ? decor.dataset.min_margin : "10000";

                //отступ от границ контейнера в процентах (сгенерируется случайны отступ примерно равный указанному)
                var edge_margin = (decor.dataset.edge_margin !== undefined) ? decor.dataset.edge_margin : "10";

                //величина рандомного размера фигуры
                //data-scale="2" 
                var scale = (decor.dataset.scale !== undefined) ? decor.dataset.scale : false;

                //параллакс (анимировать по движению мыши)
                var parallax = (decor.dataset.parallax !== undefined && decor.dataset.parallax == "true") ? true : false;

                //величина сдвига при параллаксе
                //data-shift="2" 
                var shift = (decor.dataset.shift !== undefined) ? decor.dataset.shift : "1";


                decoration(decor, colors, figure, figure_count, figure_pos, min_margin, edge_margin, scale, parallax, shift);
            }

        });
    }

    function resizeTextarea() {
        const tx = document.getElementsByTagName("textarea");
        for (let i = 0; i < tx.length; i++) {

            tx[i].style.height = (tx[i].scrollHeight) + "px";
            var borderRadius = 70;
            if (tx[i].offsetHeight > 60)
                borderRadius = 24;
            tx[i].style.borderRadius = borderRadius + "px";


            tx[i].addEventListener("input", OnInput, false);
        }
    }

    function OnInput() {
        this.style.height = 0;
        this.style.height = (this.scrollHeight) + "px";
        var borderRadius = 70;
        if (this.offsetHeight > 60)
            borderRadius = 24;
        this.style.borderRadius = borderRadius + "px";
    }

    function colorLogo() {
        var logo = document.querySelector(".color-logo");
        var colors = ['yellow', 'red', 'blue'];
        logo.addEventListener('mouseover', e => {
            var currentColorIndex = e.target.getAttribute("data-color");
            var nextColorIndex = parseInt(currentColorIndex) + 1;
            if (nextColorIndex == colors.length) nextColorIndex = 0;
            e.target.src = "img/logo-" + colors[nextColorIndex] + ".svg";
            e.target.setAttribute("data-color", nextColorIndex);
        });
    }

    function offscreen(el) {
        var rect = el.getBoundingClientRect();
        console.log(rect.x);
        return (
            (rect.x + rect.width) < 0 ||
            (rect.y + rect.height) < 0 ||
            (rect.x > window.innerWidth || rect.y > window.innerHeight)
        );
    };

    function popovers() {

        Array.prototype.forEach.call(document.querySelectorAll('[data-popover]'), (popover_btn) => {
            const popover = document.getElementById(popover_btn.getAttribute('data-popover'));
            const popover_btn_close = popover.querySelector(".popover-close");

            /**events */
            popover_btn.addEventListener("click", function () {
                if (popover.getAttribute('data-hidden') == "true") {
                    popoverShow(popover, popover_btn);
                    popoverPos(popover);
                }
                else {
                    popoverHide(popover);
                }
            });

            popover_btn_close.addEventListener("click", function () {
                popoverHide(popover);
            });

        });

        function popoverShow(popover, popover_btn) {
            popover.classList.add("active");
            popover.setAttribute('data-hidden', '');
            document.addEventListener("click", function (event) {
                if (!popover.contains(event.target) && event.target != popover_btn) {
                    popoverHide(popover);
                }
            });
        }

        function popoverHide(popover) {
            popover.classList.remove("active");
            popover.setAttribute('data-hidden', 'true');
            popover.setAttribute("style", '');
        }

        function popoverPos(popover) {
            var rect = popover.getBoundingClientRect();
            var arrPos = [];
            var margin = 10;
            if((rect.x + rect.width) < 0) {
                arrPos.push("left:0");
            }
            if((rect.y + rect.height) < 0) {
                arrPos.push("top:0");
            }
            if(rect.x > window.innerWidth || (rect.x + rect.width) > window.innerWidth) {
                arrPos.push("right:0");
            }
            if(rect.y > window.innerHeight || (rect.y + rect.height) > window.innerHeight) {
                arrPos.push("bottom:0");
            }
            
            var position = arrPos.join(";");
            popover.setAttribute("style", position);
            console.log(position);
        }




        // Array.prototype.forEach.call(document.querySelectorAll(".close-slider"), function (close) {
        //     close.addEventListener("click", function () {
        //         document.querySelector("body").classList.remove("swiper-slider-fullscreen");
        //     });
        // });

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

                filterResponsive();
                collapseContent();
                initDecors();
                resizeTextarea();
                popovers();

            });
        });
    }



    menu(activeMenuId);
    colorLogo();
    sidebarToggle();
    tabs();
    filterResponsive();
    collapseContent();
    newsItemTextHeight();
    initDecors();
    resizeTextarea();
    popovers();


    window.addEventListener('resize', function (event) {
        filterResponsive();
        collapseContent();
        newsItemTextHeight();

    });




});






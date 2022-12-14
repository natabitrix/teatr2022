//import * as flsFunctions from "./modules/functions.js";
//flsFunctions.isWebP();


var ajax = {};
ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function (url, callback, method, data, async) {
    if (async === undefined) {
        async = true;
    }
    var x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
};

ajax.get = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};

ajax.post = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', query.join('&'), async)
};




/**if (window.getCookie("cookie_name") !== "Y") */
function getCookie(a) {
    var b = document.cookie.match(new RegExp("(?:^|; )" + a.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    return b ? decodeURIComponent(b[1]) : undefined
}

/**window.setCookie("cookie_name", "Y", {
		expires: 31557600,
		path: "/",
		domain: window.location.hostname
	}); */
function setCookie(b, f, c) {
    c = c || {};
    var i = c.expires;
    if (typeof i == "number" && i) {
        var h = new Date();
        h.setTime(h.getTime() + i * 1000);
        i = c.expires = h
    }
    if (i && i.toUTCString) {
        c.expires = i.toUTCString()
    }
    f = encodeURIComponent(f);
    var a = b + "=" + f;
    for (var e in c) {
        a += "; " + e;
        var g = c[e];
        if (g !== true) {
            a += "=" + g
        }
    }
    document.cookie = a
}



//import Sticky from 'sticky-js';
import Sticky from './modules/sticky-js/sticky.js';
var sticky = new Sticky('[data-sticky]', {});
window.addEventListener('resize', function (event) {
    sticky.update();
});


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

    // mousewheel: {
    //     invert: true,
    // },


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

const newsSlider = new Swiper('.news-slider', {
    //slidesPerView: 4,
    slidesPerView: "auto",
    loop: false,
    centeredSlides: false,
    spaceBetween: 20,
    breakpoints: {
        // 576: {
        //     slidesPerView: 2,
        // },
        // 768: {
        //     slidesPerView: 3,
        // },
        // 992: {
        //     slidesPerView: 3,
        // },
        // 1100: {
        //     slidesPerView: 2,
        // },
        // 1200: {
        //     slidesPerView: 3,
        // },
        // 1400: {
        //     slidesPerView: 4,
        // },
        //1600: {
        //  slidesPerView: 5,
        //spaceBetween: 50,
        //},
    },
    on: {
        init: function () {
            newsItemTextHeight();
        },
    },
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
    speed: 1000,
    on: {
        init: function () {
            setGallerySliderHeight(this);
        },
        resize: function () {
            setGallerySliderHeight(this);
        }
    },
});


function setGallerySliderHeight(slider) {
    const gallSlider = document.querySelector('.gallery-slider');
    if (gallSlider) {
        var currentImg = slider.el.querySelector('.swiper-slide-active img');
        var h = currentImg.clientHeight;
        Array.prototype.forEach.call(slider.slides, function (slide) {
            slide.style.height = h + "px";
        });
    }

}



/**???????????? ?????? ???????????????????????? */
import Bvi from "./modules/bvi/bvi.js";
new Bvi();


/**sidebar toggle */
function sidebarToggle() {
    const sidebar = document.querySelector(".sidebar");
    const menuBtnOpen = document.querySelector(".header__menu-btn.btn-open");
    const menuBtnClose = document.querySelector(".header__menu-btn.btn-close");

    menuBtnOpen.addEventListener("click", function () {//???????????????? ????????
        document.body.classList.add("lock");//?????????????????? ???????????? ?????? ???????????????? ????????
        sidebar.classList.add("opened");
        menuBtnOpen.classList.remove("active");
        menuBtnClose.classList.add("active");
    });


    menuBtnClose.addEventListener("click", function () {//????????????????
        document.body.classList.remove("lock");//???????????????????????? ???????????? ?????? ???????????????? ????????
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

    //?????????????????????? ???????? children ul ?? ?????????????????? div
    navItemActiveChildrenPlaceholder.innerHTML = "";
    Array.prototype.forEach.call(navItemChildren, function (navItemChild) {
        navItemActiveChildrenPlaceholder.append(navItemChild);
    });

    Array.prototype.forEach.call(navItemParents, function (navItemParent) {
        const thisId = navItemParent.id;
        const thisChildrenId = thisId + "-children";
        navItemParent.addEventListener("click", function () {

            //?????????????? ????????  children ul
            Array.prototype.forEach.call(navItemChildren, function (navItemChild) {
                navItemChild.classList.remove("active");
            });

            let thisChildren = document.getElementById(thisChildrenId);

            //?????????????????? ?????????????????? ul
            thisChildren.classList.add("active");

            //?????????????????? ???????????? ??????????
            navBack.classList.add("active");

            //?????????????? parent ul
            navItems.classList.remove("active");

        });
    });

    navBack.addEventListener("click", function () {
        Array.prototype.forEach.call(navItemParents, function (navItemParent) {

            //?????????????? ????????  children ul
            Array.prototype.forEach.call(navItemChildren, function (navItemChild) {
                navItemChild.classList.remove("active");
            });

            //?????????????? ???????????? ??????????
            navBack.classList.remove("active");

            //?????????????????????? parent ul
            navItems.classList.add("active");

        });
    });

    if (activeMenuId && activeMenuId != "" && activeMenuId != "@@activeMenuParentId") {
        //?????????????????? ?????????????????? ul
        document.getElementById(activeMenuId).classList.add("active");
        //?????????????????? ???????????? ??????????
        navBack.classList.add("active");
        //?????????????? parent ul
        navItems.classList.remove("active");
    }

    /**???????????????? ?????????? ???????? ???????????????? ?????? ?????????????? */
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

    const viewport = document.documentElement.clientWidth;//?????????????????? ???????????? ????????????????

    if (viewport > 991) {
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
                //?????????????????????? ???????? hidden li ?? ?????????????????? ul
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
    const newsItems = document.querySelectorAll(".news__item");
    Array.prototype.forEach.call(newsItems, function (newsItem) {
        var imgHeight = newsItem.querySelector("img").clientHeight;
        newsItem.querySelector(".news__item-text").style.height = imgHeight + "px";
    });
}

/**Toggle swiper slider full-screen */
function swiperFullScreen() {
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
}

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
 * ?????????????????? ???????????? ?? ?????????? ??????-????: figures="random" figure_count="auto" (???? ??????????????????)
 * ?????????????????? ???????????? ?? ?????????????????? ??????-????: figures="random" figure_count="3"
 * ?????????????????? ???????????? ?? ?????????? ??????-????: figures="1,2,3" figure_count="auto"
 * ?????????????????? ???????????? ?? ?????????????????? ??????-????: figures="1,2,3" figure_count="7"
 * 
 * ???????????????????? ?????????? ???? ???????????????? ???????????????????? ?????????????????????? ??????????????????????????
 * ???????????????????? ?????????? ???? ???????????????????? ??????-???? ?????????????????????? ??????????????????????????
 */

function decoration(container, colors, figures, figureCount, figurePosition, minMargin, edgeMargin, scaleRange, isParallax, shift) {
    const viewport = document.documentElement.clientWidth;//?????????????????? ???????????? ????????????????
    const decors = [];

    //?????? ??????????
    var arrColors = ['red', 'blue', 'yellow', 'dark', 'white']; //?????? ???????????? (colors.scss, helper.scss: .decor)
    //?????????????????? ??????????
    if (colors != "random") {
        arrColors = colors.split(",");
    }
    //???????????????????? ???????????? ????????????
    shuffle(arrColors);


    //?????????????????? ???????????? ?? ?????????? ??????-????: figures="random" figure_count="all" (???? ??????????????????)
    var arrDecors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; //?????? ???????????? (helper.scss: .decor)

    //???????????????????? ???????????? ??????????
    shuffle(arrDecors);

    //?????????????????? ???????????? ?? ?????????????????? ??????-????: figures="random" figure_count="3"
    if (figures == "random" && parseInt(figureCount) > 0) {
        arrDecors = arrDecors.slice(0, figureCount);
        //console.log(arrDecors);
    }
    else {
        //?????????????????? ???????????? ?? ?????????? ??????-????: figures="1,2,3" figure_count="auto"
        if (figures != "random") {
            arrDecors = figures.split(",");
        }

        //?????????????????? ???????????? ?? ?????????????????? ??????-????: figures="1,2,3" figure_count="7" ?? ?????????????????? ??????-???? ???????????? ?????? ??????-???? ?????????????????? ??????????
        if (parseInt(figureCount) > 0 && arrDecors.length < parseInt(figureCount)) {
            var addNumDecors = parseInt(figureCount) - arrDecors.length; //?????????????? ????????????????
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
        //???????????????????? ?????????? ???? ???????????????? ???????????????????? ?????????????????????? ??????????????????????????
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
    var randomIndex = Math.round(Math.random()); //1 ?????? 0

    arrDecors.forEach(element => {

        let decor = document.createElement("div");

        decor.classList.add("decor");
        decor.classList.add("decor" + element);
        decor.classList.add("decor-" + arrColors[Math.floor(Math.random() * arrColors.length)]);

        var scale = 1;
        if (scaleRange) {
            var scaleMin = parseFloat(scaleRange.split(",")[0]);
            var scaleMax = parseFloat(scaleRange.split(",")[1]);

            if (viewport < 500) scaleMax = 0.5;
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
        
        if (decor.dataset.figure) {

            //?????????? (helper.scss: .decor)
            //data-colors="red,blue,yellow,dark,white" ?????? random
            //var arrColors = decor.dataset.colors.split(",");
            var colors = (decor.dataset.colors !== undefined) ? decor.dataset.colors : "random";

            //?????? ????????????, ?????? ????????????????
            //data-figure="1,2" ?????? data-figure="random" 
            var figure = decor.dataset.figure;

            //??????-???? ??????????
            //data-figure_count="2" ?????? data-figure_count="auto" 
            var figure_count = (decor.dataset.figure_count !== undefined) ? decor.dataset.figure_count : "auto";

            //?????? ???????????????????????? ??????????
            //data-figure_pos="vertical" ?????? data-figure_pos="horizontal" 
            var figure_pos = (decor.dataset.figure_pos !== undefined) ? decor.dataset.figure_pos : "vertical";

            //???????????? ?????????? ???????? ???? ?????????? ?? ???????? (???????? ?????????????????? ??????????, ?????? ?????????? ??????????????????????)
            //???????? ???? ?????????? ????????????????????, ???????? ?????????????????? ?????????????? ????????????, ???????? 10000
            //data-min_margin="500" 
            var min_margin = (decor.dataset.min_margin !== undefined) ? decor.dataset.min_margin : "10000";

            //???????????? ???? ???????????? ???????????????????? ?? ?????????????????? (?????????????????????????? ???????????????? ???????????? ???????????????? ???????????? ????????????????????)
            var edge_margin = (decor.dataset.edge_margin !== undefined) ? decor.dataset.edge_margin : "10";

            //???????????????? ???????????????????? ?????????????? ????????????
            //data-scale="2" 
            var scale = (decor.dataset.scale !== undefined) ? decor.dataset.scale : false;

            //?????????????????? (?????????????????????? ???? ???????????????? ????????)
            var parallax = (decor.dataset.parallax !== undefined && decor.dataset.parallax == "true") ? true : false;

            //???????????????? ???????????? ?????? ????????????????????
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
        e.target.src = "/img/logo-" + colors[nextColorIndex] + ".svg";
        e.target.setAttribute("data-color", nextColorIndex);
    });
}

function popoversInit() {
    var div = document.createElement("div");
    div.classList.add("popover-placeholder");
    document.querySelector("body").append(div);
}

function popovers() {

    Array.prototype.forEach.call(document.querySelectorAll('[data-popover]'), (popover_btn) => {
        const popover = document.getElementById(popover_btn.getAttribute('data-popover'));
        const popover_btn_close = popover.querySelector(".popover-close");

        document.querySelector(".popover-placeholder").innerHTML = "";
        document.querySelector(".popover-placeholder").append(popover);

        popoverHide(popover);

        /**events */
        //popover_btn.addEventListener("click", function () {
        popover_btn.addEventListener('mouseenter', e => {
            //if (popover.getAttribute('data-hidden') == "true") {
            popoverShow(popover);
            popoverPos(popover, popover_btn);
            //}
            //else {
            // popoverHide(popover);
            //}
        });

        popover.addEventListener('mouseenter', e => {
            popoverShow(popover);
        });

        //popover.addEventListener('mouseleave', e => {
        //if (popover.getAttribute('data-hidden') != "true") {
        // setTimeout(function () {
        //     popoverHide(popover);
        //     popoverPos(popover, popover_btn);
        // }, 500);
        //}
        //else {
        // popoverHide(popover);
        //}
        //});
        popover_btn_close.addEventListener("click", function () {
            popoverHide(popover);
        });

        window.addEventListener('resize', function (event) {
            popoverPos(popover, popover_btn);

        });

    });

    function popoverShow(popover) {
        popover.classList.add("active");
        popover.setAttribute('data-hidden', '');
        // document.addEventListener("click", function (event) {
        //     if (!popover.contains(event.target) && event.target != popover_btn) {
        //         popoverHide(popover);
        //     }
        // });
    }

    function popoverHide(popover) {
        popover.classList.remove("active");
        popover.setAttribute('data-hidden', 'true');
        popover.setAttribute("style", '');
    }

    function popoverPos(popover, popover_btn) {

        var popoverBtnRect = popover_btn.getBoundingClientRect();
        var bodyRect = document.querySelector("body").getBoundingClientRect();


        //var arrPos = [];
        var margin = 20;

        var top = popoverBtnRect.top - bodyRect.top + "px";
        var left = popoverBtnRect.left - bodyRect.left - 10 + "px";
        var right = "auto";
        var bottom = "auto";

        var position = "top:" + top + ";left:" + left + ";right:" + right + ";bottom:" + bottom + ";"
        popover.setAttribute("style", position);
        //console.log(position);

        var popoverRect = popover.getBoundingClientRect();


        //???????????? ?????????????? ?????????? ???? ?????????? ?????????????? ???????????? (???????? ?????????????????? ???? ?????????? ????????????????)
        if ((popoverRect.x + popoverRect.width) < 0) {
            left = margin + "px";
            right = "auto";
        }

        //???????????? ?????????????? ?????????? ???? ?????????????? ?????????????? ????????????  (???????? ?????????????????? ???? ?????????????? ????????????????)
        // if (popoverRect.y < 0 || (popoverRect.y + popoverRect.height) < 0) {
        //     top = margin + "px";
        //     bottom = "auto";
        // }

        //?????????? ?????????????? ?????????? ???? ???????????? ?????????????? ???????????? (???????? ?????????????????? ???? ???????????? ????????????????) 
        //?????? ???????????? ?????????????? ?????????? ???????????? ?????????????? ???????????? 
        if (popoverRect.x > window.innerWidth || (popoverRect.x + popoverRect.width) > (window.innerWidth) - 17) {
            right = margin + "px";
            left = "auto";
        }

        //?????????????? ?????????????? ?????????? ???? ???????????? ???????????????? ???????????? (???????? ?????????????????? ???? ???????????? ????????????????)  
        //?????? ???????????? ?????????????? ?????????? ???? ???????????? ???????????????? ????????????
        // if (popoverRect.y > window.innerHeight || (popoverRect.y + popoverRect.height) > window.innerHeight) {
        //     bottom = margin + "px";
        //     top = "auto";
        // }

        var position = "top:" + top + ";left:" + left + ";right:" + right + ";bottom:" + bottom + ";"
        popover.setAttribute("style", position);
        //console.log(popoverRect);
        // console.log(position);
        // console.log(document.querySelector("body").clientWidth);
        // console.log(document.querySelector("body").outerWidth);
        // console.log(document.querySelector("body").width);
    }

}


// function sliderNavigationPosition()
// {
//     const sliderNav = document.querySelector(".main-slider-navigation");
//     const sliderTextBlock = document.querySelector(".main-slider__text-block");
//     console.log(sliderTextBlock.clientHeight);
//     console.log(sliderNav.clientHeight);
//     sliderNav.style.top = sliderTextBlock.clientHeight - sliderNav.clientHeight + "px";
// }


/**Tabs */
function tabs() {
    const tabList = document.querySelectorAll(".tab-list-item");
    const tabContent = document.querySelectorAll(".tab");

    var cookieTab = getCookie("tab");

    Array.prototype.forEach.call(tabList, function (tabListItem) {

        const thisId = tabListItem.id;
        const tabContentId = thisId + "-content";
        let thisTabContentItem = document.getElementById(tabContentId);

        
        if(cookieTab && cookieTab == thisId) {
            //?????????????? ???????? tab-content
            Array.prototype.forEach.call(tabContent, function (tabContentItem) {
                tabContentItem.classList.add("d-none");
            });
            //???????????????? ???????????????? tab-content
            thisTabContentItem.classList.remove("d-none");

            //???????????? ???????????????????? ?? ???????? tab
            Array.prototype.forEach.call(tabList, function (tabListItem) {
                tabListItem.classList.remove("active");
            });
            
            //???????????????? ???????????????????? ???????????????? tab
            tabListItem.classList.add("active");
        }


        tabListItem.addEventListener("click", function () {

            setCookie("tab", thisId, {
                expires: 31557600,
                path: "/",
                domain: window.location.hostname
            }); 

            //?????????????? ???????? tab-content
            Array.prototype.forEach.call(tabContent, function (tabContentItem) {
                tabContentItem.classList.add("d-none");
            });
            //???????????????? ???????????????? tab-content
            thisTabContentItem.classList.remove("d-none");

            //???????????? ???????????????????? ?? ???????? tab
            Array.prototype.forEach.call(tabList, function (tabListItem) {
                tabListItem.classList.remove("active");
            });

            //???????????????? ???????????????????? ???????????????? tab
            tabListItem.classList.add("active");

            filterResponsive();
            collapseContent();
            newsItemTextHeight();
            initDecors();
            resizeTextarea();
            popovers();
            swiperFullScreen();
            setGallerySliderHeight(gallerySlider);

        });
    });
}



/*
function ajaxLoadingItems (loadMoreBtn) {

    const ajaxContainer = document.querySelector(".ajax-container");
    const ajaxItems = ajaxContainer.querySelector(".ajax-items");
    const loadMoreBtnContainer = ajaxContainer.querySelector(".load-more-container");
    const loadMoreBtn = ajaxContainer.querySelector(".load-more");

    var loadMoreUrl = loadMoreBtn.getAttribute("data-url");
    loadMoreBtn.classList.add("loading");

    if (loadMoreUrl) {

        ajax.get(loadMoreUrl, {}, function(responseText) {

            loadMoreBtn.remove();

            var ajaxContent = responseText.split('<!--ajax_content-->')[1];

            var tempDiv = document.createElement("div");
            tempDiv.innerHTML = ajaxContent;

            var loadedItems = tempDiv.querySelectorAll(".ajax-item");

            Array.prototype.forEach.call(loadedItems, function (loadedItem) {
                ajaxItems.append(loadedItem);
            });

            var loadedloadMoreBtn = tempDiv.querySelector(".load-more");

            loadMoreBtnContainer.append(loadedloadMoreBtn);

            loadedloadMoreBtn.addEventListener("click", function () {
                ajaxLoadingItems(this);
            });

            //console.log(loadedItems);
        });
    }
}

loadMoreBtn.addEventListener("click", function () {
    ajaxLoadingItems(this);
});
*/


document.addEventListener("DOMContentLoaded", function () {
    menu(activeMenuId);
    colorLogo();
    sidebarToggle();
    tabs();
    filterResponsive();
    swiperFullScreen();
    //setGallerySliderHeight(gallerySlider);
    collapseContent();
    newsItemTextHeight();
    initDecors();
    resizeTextarea();
    popoversInit();
    popovers();


    window.addEventListener('resize', function (event) {
        filterResponsive();
        collapseContent();
        newsItemTextHeight();
        //setGallerySliderHeight(gallerySlider);
    });




});






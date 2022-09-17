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
    const navItems = document.querySelector(".nav-items");
    const navItemParents = document.querySelectorAll(".nav-item-parent");
    const navItemChildren = document.querySelectorAll(".nav-item-children");
    const navBack = document.querySelector(".nav-back");
    const navItemActiveChildrenPlaceholder = document.querySelector(".nav-item-active-children");

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


    /**Tabs */
    const tabList = document.querySelectorAll(".tab-list-item");
    const tabContent = document.querySelectorAll(".tab");

    Array.prototype.forEach.call(tabList, function(tabListItem) {
        tabListItem.addEventListener("click", function () {

            const thisId = tabListItem.id;
            const tabContentId = thisId + "-content";
            let thisTabContentItem = document.getElementById(tabContentId);

            //Скрытие всех tab-content
            Array.prototype.forEach.call(tabContent, function(tabContentItem) {
                tabContentItem.classList.add("d-none");  
            });
            //Открытие активной tab-content
            thisTabContentItem.classList.remove("d-none");
            
            //Убрать активность у всех tab
            Array.prototype.forEach.call(tabList, function(tabListItem) {
                tabListItem.classList.remove("active");
            });
            //Добавить активность активной tab
            tabListItem.classList.add("active");

            //Обновить фильтр
            Array.prototype.forEach.call(document.querySelectorAll(".filter-list-container"), function(filterContainer) {
                changeFilterWhenResize(filterContainer);
                window.addEventListener('resize', function(event){
                    changeFilterWhenResize(filterContainer);
                });
            });

            //Обновить collapse
            collapse();

        });
    });


    /**Filter */
    function changeFilterWhenResize(filterContainer)
    {

        var filterList = filterContainer.querySelector(".filter-list");
        var filterListItems = filterList.querySelectorAll(".filter-item");

        var filterContainerWidth = filterContainer.clientWidth;
        var filterListItemsWidth = 0;

        Array.prototype.forEach.call(filterListItems, function(filterListItem) {
            filterListItemsWidth += filterListItem.clientWidth + 12;
            if(filterListItemsWidth > filterContainerWidth) {
                filterListItem.classList.add("hidden");
            }
            else {
                filterListItem.classList.remove("hidden");    
            }
        });

        var filterListPlaceholder = filterContainer.querySelector(".filter-list-hidden");
        var filterListHiddenItems = filterList.querySelectorAll(".filter-item.hidden");
        var filterListHiddenHeight = 0;

        filterListPlaceholder.innerHTML = "";
        Array.prototype.forEach.call(filterListHiddenItems, function(filterListItem) {
                //Перемещение всех hidden li в отдельный ul
                var li = document.createElement("li");
                li.innerHTML = filterListItem.innerHTML;
                filterListPlaceholder.append(li);

                filterListHiddenHeight += li.clientHeight + 12;
        });

        var filterMoreBtn = filterContainer.querySelector(".btn-more");

        if(filterListItemsWidth > filterContainerWidth) {
            filterMoreBtn.classList.remove("d-none");
        }
        else{
            filterMoreBtn.classList.add("d-none");
        }


        filterMoreBtn.addEventListener("click", function () {

            filterListPlaceholder.classList.toggle("active");

            if(filterListPlaceholder.clientHeight > 0) {
                filterListPlaceholder.style.height = 0;
            }
            else {
                filterListPlaceholder.style.height = filterListHiddenHeight + "px";
            }
            
            this.classList.toggle("btn-more-hide");
    
        });

        document.addEventListener("click", function (event) {
			if (!filterListPlaceholder.contains(event.target) && !filterMoreBtn.contains(event.target)) {
				filterListPlaceholder.classList.remove("active");
			}
		});

    }

    Array.prototype.forEach.call(document.querySelectorAll(".filter-list-container"), function(filterContainer) {
        changeFilterWhenResize(filterContainer);
        window.addEventListener('resize', function(event){
            changeFilterWhenResize(filterContainer);
        });
    });




    /**Collapse*/

    function collapse()
    {
        var collapseContainer = document.querySelectorAll(".collapse-container");
        var collapseItemsHeight = 0;

        Array.prototype.forEach.call(collapseContainer, function(collapseItem) {

            var collapseBtn = collapseItem.querySelector(".collapse-btn");
            var collapseItems = collapseItem.querySelector(".collapse-items");

            collapseItemsHeight += collapseItem.clientHeight;

            collapseBtn.addEventListener("click", function () {


                if(collapseItems.clientHeight > 0) {
                    collapseItems.style.height = 0;
                    collapseItems.classList.remove("active");
                    collapseBtn.classList.remove("active");
                }
                else {
                    collapseItems.style.height = collapseItemsHeight + "px";
                    collapseItems.classList.add("active");
                    collapseBtn.classList.add("active");
                }
            });
        });
    }

    collapse();


    /**News item text height*/
    function newsItemTextHeight() {
        var newsItems = document.querySelectorAll(".news__item");
        Array.prototype.forEach.call(newsItems, function(newsItem) {
            var imgHeight = newsItem.querySelector("img").clientHeight;
            newsItem.querySelector(".news__item-text").style.height = imgHeight + "px";
        });
    }

    newsItemTextHeight();
    window.addEventListener('resize', function(event){
        newsItemTextHeight();
    });
    
});

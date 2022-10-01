var ProfTicketWidget;
! function (t) {
    var a = function () {
        function r() {
            var e = this;
            this.cssInserted = !1, this.htmlInserted = !1, this.cssClassPrefix = "pft-api-", this.companiesData = {}, this.eventsData = {}, this.apiHost = "https://widget.profticket.ru", this.widgetHost = "https://spa.profticket.ru", this.buttons = [], this.uniqueIdCounter = 0, this.fallbackTimeout = 700, this.fallbackCallbacks = [], this.fallbackDone = !1, this.popupIsOpen = !1, this.detectedLocale = null, this.insertCss(), this.insertHtml(), window.addEventListener("message", function (t) {
                e.receiveMessage(t)
            }, !1), window.addEventListener("beforeunload", function (t) {
                e.popupIsOpen && (t.preventDefault(), t.returnValue = "")
            }), setTimeout(function () {
                e.runFallbackCallbacks()
            }, this.fallbackTimeout)
        }
        return r.prototype.runFallbackCallbacks = function () {
            if (this.fallbackDone) return !1;
            for (var t; t = this.fallbackCallbacks.shift();) "function" == typeof t && t();
            return this.fallbackDone = !0
        }, r.prototype.addFallbackFunction = function (t) {
            this.fallbackDone ? "function" == typeof t && t() : this.fallbackCallbacks.push(t)
        }, r.prototype.runInitCallbacks = function () {
            var e = window.profTicketWidgetApiInitCallbacks;
            e && e.length && setTimeout(function () {
                for (var t; t = e.shift();) try {
                    t()
                } catch (t) {
                    try {
                        console.error(t)
                    } catch (t) { }
                }
            }, 0)
        }, r.prototype.iFrame = function (t, e) {
            return new i(t, e)
        }, r.prototype.button = function (t, e) {
            var i = new n(this, t, e);
            return this.buttons.push(i), i.init(), i
        }, r.prototype.getUniqueId = function () {
            return this.uniqueIdCounter++, this.uniqueIdCounter
        }, r.prototype.getWidgetUrl = function (t, e, i, n, s) {
            void 0 === e && (e = null), void 0 === i && (i = null), void 0 === n && (n = null), void 0 === s && (s = null);
            var o = this.widgetHost,
                a = o + "/customer/" + t + "/shows/";
            (e && (a += e + "/"), n && e && (window.screen.width < 1024 || r.isSafari() ? a += n + "/" : a += "#" + n), i && (a = o + "/customer/" + t + "/sets/" + i + "/"), s) && (a = r.addParamsToUrl(a, "language=" + s));
            return r.addProxyParamsToUrl(a)
        }, r.addParamsToUrl = function (t, e) {
            var i = t.split("#"),
                n = 0 < t.indexOf("?") ? "&" : "?",
                s = 2 == i.length ? "#" + i[1] : "";
            return i[0] + n + e + s
        }, r.addProxyParamsToUrl = function (t) {
            var e = r.getProxyParamsString();
            return e ? r.addParamsToUrl(t, e) : t
        }, r.configure = function (t, e) {
            if (e)
                for (var i in e) {
                    var n = e[i],
                        s = "set" + r.capitalizeFirstLetter(i);
                    "function" == typeof t[s] && t[s].apply(t, [n])
                }
        }, r.getTranslations = function () {
            return {
                "ru-RU": {
                    button_title: "Купить билет"
                },
                "en-US": {
                    button_title: "Purchase the ticket"
                },
                "de-DE": {
                    button_title: "Ticket kaufen"
                },
                "es-ES": {
                    button_title: "Comprar el ticket"
                },
                "fr-FR": {
                    button_title: "Acheter un billet"
                },
                "it-IT": {
                    button_title: "Comprare un biglietto"
                },
                "tr-TR": {
                    button_title: "Bilet satın al"
                },
                "zh-CN": {
                    button_title: "购票"
                }
            }
        }, r.getDefaultTranslation = function (t, e) {
            var i = r.getTranslations();
            return void 0 === i[e] ? null : void 0 === i[e][t] ? null : i[e][t]
        }, r.getAvailableLocales = function () {
            return Object.keys(r.getTranslations())
        }, r.prototype.detectLocale = function () {
            if (this.detectedLocale) return this.detectedLocale;
            if (!navigator || !navigator.language) return null;
            var e = null,
                t = r.getAvailableLocales(),
                i = navigator.language.split("-"),
                n = i[0] ? i[0] : "";
            return t.forEach(function (t) {
                e || (t === navigator.language ? e = t : n && 0 === t.indexOf(n) && (e = t))
            }), this.detectedLocale = e
        }, r.capitalizeFirstLetter = function (t) {
            return t.charAt(0).toUpperCase() + t.slice(1)
        }, r.postMessage = function (t, e) {
            void 0 === e && (e = "*"), window.postMessage(t, e)
        }, r.getElementOffset = function (t) {
            var e = {
                top: 0,
                left: 0
            };
            return void 0 !== t.getBoundingClientRect && (e = t.getBoundingClientRect()), {
                top: e.top + (window.pageYOffset || document.body.scrollTop) - (document.body.clientTop || 0),
                left: e.left + (window.pageXOffset || document.body.scrollLeft) - (document.body.clientLeft || 0)
            }
        }, r.easeInOutQuad = function (t, e, i, n) {
            return (t /= n / 2) < 1 ? i / 2 * t * t + e : -i / 2 * (--t * (t - 2) - 1) + e
        }, r.animateScrollTop = function (t, e, i) {
            var n = (document.scrollingElement || document.documentElement).scrollTop || 0,
                s = e - n,
                o = 0,
                a = function () {
                    var t = r.easeInOutQuad(o += 20, n, s, i);
                    scrollTo(0, t), o < i ? setTimeout(a, 20) : scrollTo(0, e)
                };
            a()
        }, r.findGetParameter = function (e) {
            var i = null,
                n = [];
            return location.search.substr(1).split("&").forEach(function (t) {
                2 == (n = t.split("=")).length && n[0] === e && (i = decodeURIComponent(n[1]))
            }), i
        }, r.getProxyParamsString = function () {
            var i = [];
            r.proxyGetParams.forEach(function (t) {
                var e = r.findGetParameter(t);
                e && i.push(t + "=" + encodeURIComponent(e))
            });
            var t = r.getAnalyticsLinkerId();
            return t && i.push(t), 0 == i.length ? "" : i.join("&")
        }, r.getAnalyticsLinkerId = function () {
            if (void 0 === window.ga) return null;
            var e = null;
            try {
                window.ga.getAll().forEach(function (t) {
                    e = t.get("linkerParam")
                })
            } catch (t) {
                console.log(t)
            }
            return e
        }, r.prototype.insertCss = function () {
            if (this.cssInserted) return !1;
            var t = "." + this.cssClassPrefix + "-button { border-radius: 3px; padding: 0 15px; display: inline-block;cursor: pointer; font-weight: normal; font-size: 15px; line-height: 32px;}." + this.cssClassPrefix + "-button.style-loaded {transition: background-color 0.3s, color 0.3s;}." + this.cssClassPrefix + "-button.size-big {font-size: 18px;line-height:38px;padding: 0 30px;}." + this.cssClassPrefix + "-button.size-small {font-size: 12px;padding: 0 22px;line-height: 26px;}." + this.cssClassPrefix + "-button:hover {opacity: 0.8}." + this.cssClassPrefix + "-button:focus {outline: none;}." + this.cssClassPrefix + "-profticket-visible {overflow: hidden;}." + this.cssClassPrefix + "-profticket-visible ." + this.cssClassPrefix + "-popup-back {top: 0; left: 0; width: 100%; height: 100%; z-index: 1042; overflow: hidden; position: fixed; background: #0b0b0b; opacity: .8; filter: alpha(opacity=80);}." + this.cssClassPrefix + '-popup-cross {transition: opacity 0.3s; position: absolute; top: -1px; right: -43px; width: 40px; height: 40px; cursor: pointer; background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVFQjc1QUVGOEI5OTExRTU4QkRGQTIzNzdFM0E5MDdEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVFQjc1QUYwOEI5OTExRTU4QkRGQTIzNzdFM0E5MDdEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUVCNzVBRUQ4Qjk5MTFFNThCREZBMjM3N0UzQTkwN0QiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUVCNzVBRUU4Qjk5MTFFNThCREZBMjM3N0UzQTkwN0QiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4TKV2/AAAAxUlEQVR42pzUPQrCQBCG4UEUsbFI4/lsLTyAdxK7NBaCiJ12nkE9gLbrN7KBNWRm53PhhbA/TzVEUkob9EYH1CAhW6BzNtaSP7p1IVHFbsX7h27u0++Kon1M107y4yuJDmEnNO8uMKiJ6Xl5MYK6WB+soVVsCPTQKmaBFlrFPNBDTUwbib0maDqwP0Nj8xUxZ6E5ZYY2NKfM0DYZcVFhhjaCMlgIZbEqqodHEvPQVg9ef2AW+v3BrtATbUmsRFt0R8uPAAMAGfsNjK3VtCsAAAAASUVORK5CYII=") center no-repeat; }.' + this.cssClassPrefix + "-popup-cross:hover {opacity: 0.6;}." + this.cssClassPrefix + "-popup-wrap {display: none; opacity:0;}." + this.cssClassPrefix + "-profticket-visible ." + this.cssClassPrefix + "-popup-wrap {visibility: visible; opacity: 1; display: block; overflow-y: auto; overflow-x: hidden; top: 0; left: 0; width: 100%; height: 100%; z-index: 1043; position: fixed; outline: 0!important; -webkit-backface-visibility: hidden;}." + this.cssClassPrefix + "-popup-container {text-align: center; position: absolute; width: 100%; height: 100%; left: 0; top: 0; padding: 0 8px; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; z-index: 1043;}." + this.cssClassPrefix + "-popup-content {min-width: 330px; max-width: 1300px; width: 90%; height: 100%; display: block; margin: 0 auto; text-align: left; padding: 10px 0; z-index: 1045; position: relative;}." + this.cssClassPrefix + "-if-content-container {position: relative; height: 100%; width: 100%; background: #f4f4f4; border-radius: 16px; box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.44);}@media screen and (max-device-width: 1024px){." + this.cssClassPrefix + "-if-content-container{-webkit-overflow-scrolling: touch;overflow: auto;}}@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } } @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } } @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }." + this.cssClassPrefix + "-popup-loader {position: absolute; width: 102px; height: 102px; top: 50%; left: 50%; margin: -51px 0 0 -51px; line-height: 102px; text-align: center; font-size: 12px; color: #777777; box-sizing: border-box;}." + this.cssClassPrefix + '-popup-loader:before {content: ""; position: absolute; display: block; width: 100%; height: 100%; border: 4px solid #dedede; border-radius: 100%; top: 0; left: 0; box-sizing: inherit;}.' + this.cssClassPrefix + '-popup-loader:after {content: ""; display: block; position: absolute; border: 4px solid transparent; border-radius: 100%; border-right-color: #0078ff; width: 100%; height: 100%; top: 0; left: 0; -webkit-animation: spin 1s linear infinite; animation: spin 1s linear infinite; box-sizing: inherit;}.' + this.cssClassPrefix + "-if-content {width: 100%; height: 100%; border: 0; position: relative; z-index: 2; border-radius: 16px;}." + this.cssClassPrefix + "-popup-content-back {position: absolute; top: 0; left: 0; width: 100%; height: 100%;}." + this.cssClassPrefix + "-if-content-container." + this.cssClassPrefix + "-alert-window {background: #f4f4f4; position: absolute; width: 500px; height: 200px; top: 50%; left: 50%; margin-top: -50px; margin-left: -150px; padding: 25px; text-align: center; font-size: 15px;}." + this.cssClassPrefix + "-if-content-container." + this.cssClassPrefix + "-alert-window ." + this.cssClassPrefix + "-popup-loader {display:none;}",
                e = document.createElement("style"),
                i = document.head || document.getElementsByTagName("head")[0];
            return e.type = "text/css", e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t)), i.appendChild(e), this.cssInserted = !0
        }, r.prototype.insertHtml = function () {
            var t = this;
            if (this.htmlInserted) return !1;
            var e = document.createElement("div");
            e.className = this.cssClassPrefix + "-popup-back";
            var i = document.createElement("div");
            i.className = this.cssClassPrefix + "-popup-wrap";
            var n = document.createElement("div");
            n.className = this.cssClassPrefix + "-popup-container";
            var s = document.createElement("div");
            s.className = this.cssClassPrefix + "-popup-content-back";
            var o = document.createElement("div");
            o.className = this.cssClassPrefix + "-popup-content";
            var a = document.createElement("div");
            a.className = this.cssClassPrefix + "-if-content-container";
            var r = document.createElement("div");
            r.className = this.cssClassPrefix + "-popup-cross", o.appendChild(r), o.appendChild(a), n.appendChild(o), n.appendChild(s), n.appendChild(e), i.appendChild(n), e.onclick = function () {
                t.requestCloseIFramePopup()
            }, s.onclick = function () {
                t.requestCloseIFramePopup()
            }, r.onclick = function () {
                t.requestCloseIFramePopup()
            };
            var l = document.body || document.getElementsByTagName("body")[0];
            return l.insertBefore(i, l.firstChild), this.htmlInserted = !0, this.iFramePopupContainer = a, !0
        }, r.prototype.openIFramePopup = function (t, e) {
            void 0 === e && (e = !1);
            var i = document.createElement("iframe"),
                n = this.iFramePopupContainer,
                s = document.createElement("div");
            s.className = this.cssClassPrefix + "-popup-loader", s.textContent = "Загрузка", i.src = t, i.className = this.cssClassPrefix + "-if-content", i.onload = function () {
                n.contains(s) && n.removeChild(s)
            }, this.iFramePopupContainer.appendChild(s);
            var o = window.screen.width < 1024 || r.isSafari();
            if (e || o) window.open(t, "_blank");
            else {
                n.appendChild(i);
                var a = document.getElementsByTagName("html")[0];
                a.className = a.className + " " + this.cssClassPrefix + "-profticket-visible", this.popupIsOpen = !0
            }
        }, r.prototype.closeIFramePopup = function () {
            var t = document.getElementsByTagName("html")[0],
                e = "\\b" + this.cssClassPrefix + "-profticket-visible\\b";
            t.className = t.className.replace(new RegExp(e, "g"), ""), this.iFramePopupContainer.innerHTML = "", this.popupIsOpen = !1
        }, r.prototype.requestCloseIFramePopup = function () {
            this.sendMessage({
                type: "closeWidgetRequest"
            })
        }, r.prototype.sendMessage = function (t) {
            var e = this.iFramePopupContainer.getElementsByTagName("iframe")[0];
            e && e.contentWindow.postMessage(t, "*")
        }, r.prototype.loadCompanyData = function (e) {
            if (!e.companyId) return this.logError("Не задан ID компании"), !1;
            if (void 0 !== this.companiesData[e.companyId]) return !1;
            this.companiesData[e.companyId] = null;
            var i = this;
            this.ajaxGet("/widget-api/company-data/" + e.companyId + "/", function (t) {
                i.companiesData[e.companyId] = t, i.companyDataLoaded(e.companyId)
            })
        }, r.prototype.loadEventsData = function (e) {
            if (!e.companyId) return this.logError("Не задан ID компании"), !1;
            if (void 0 !== this.eventsData[e.companyId]) return !1;
            this.eventsData[e.companyId] = null;
            var i = this;
            this.ajaxGet("/widget-api/events-data/" + e.companyId + "/", function (t) {
                i.eventsData[e.companyId] = t, i.eventsDataLoaded(e.companyId)
            })
        }, r.prototype.hasCompanyData = function (t) {
            return void 0 !== this.companiesData[t] && null !== this.companiesData[t]
        }, r.prototype.hasEventsData = function (t) {
            return void 0 !== this.eventsData[t] && null !== this.eventsData[t]
        }, r.prototype.getCompanyData = function (t) {
            return this.hasCompanyData(t) ? this.companiesData[t] : null
        }, r.prototype.getEventsData = function (t) {
            return this.hasEventsData(t) ? this.eventsData[t] : null
        }, r.prototype.companyDataLoaded = function (e) {
            var i = this.getCompanyData(e),
                n = this;
            this.buttons.forEach(function (t) {
                try {
                    t.getCompanyId() == e && t.setSettingFromCompanyData(i)
                } catch (t) {
                    n.logError(t)
                }
            })
        }, r.prototype.eventsDataLoaded = function (e) {
            var i = this.getEventsData(e),
                n = this;
            this.buttons.forEach(function (t) {
                try {
                    t.getCompanyId() == e && t.applyEventsData(i)
                } catch (t) {
                    n.logError(t)
                }
            })
        }, r.prototype.ajaxGet = function (t, e) {
            var i = new XMLHttpRequest;
            i.withCredentials = !0, i.onreadystatechange = function () {
                if (4 == i.readyState && 200 == i.status) try {
                    var t = JSON.parse(i.responseText);
                    "function" == typeof e && e(t)
                } catch (t) {
                    return void console.log(t.message + " in " + i.responseText)
                }
            }, i.open("GET", this.apiHost + t, !0), i.send()
        }, r.prototype.receiveMessage = function (t) {
            "close-popup" == t.data.type && this.closeIFramePopup(), "setPopupBreakerVisibility" == t.data.type && this.setPopupBreakerVisibility(t.data.data.visible)
        }, r.prototype.setPopupBreakerVisibility = function (t) {
            var e = document.getElementsByClassName(this.cssClassPrefix + "-popup-cross");
            1 === e.length && (e[0].style.display = t ? "block" : "none")
        }, r.prototype.setApiHost = function (t) {
            this.apiHost = t
        }, r.prototype.setWidgetHost = function (t) {
            this.widgetHost = t
        }, r.prototype.getCssClassPrefix = function () {
            return this.cssClassPrefix
        }, r.prototype.logError = function (t) {
            "undefined" != typeof console && console.error(t)
        }, r.isSafari = function () {
            var t = navigator.userAgent.toLowerCase();
            return -1 != t.indexOf("safari") && -1 == t.indexOf("chrome")
        }, r.proxyGetParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "yclid", "fbclid"], r
    }();
    t.Api = a;
    var i = function () {
        function t(t, e) {
            var i = this;
            this.width = "100%", this.height = "500", this.resizeToFullHeight = !0, this.resizeToFullWidth = !1, this.currentApplePaySession = null, this.containerId = t, this.containerElement = document.getElementById(this.containerId), void 0 !== e && a.configure(this, e), window.addEventListener("message", function (t) {
                i.receiveMessage(t)
            }, !1), this.changeSrcForSPA(), this.createIFrame()
        }
        return t.prototype.changeSrcForSPA = function () {
            this.src = this.src.replace("https://widget.profticket.ru", "https://spa.profticket.ru")
        }, t.prototype.getFrameUrl = function () {
            var t = this.src,
                e = a.getProxyParamsString();
            if (!e) return t;
            var i = t.split("#"),
                n = 0 < t.indexOf("?") ? "&" : "?",
                s = 2 == i.length ? "#" + i[1] : "";
            return i[0] + n + e + s
        }, t.prototype.createIFrame = function () {
            var t = this;
            setTimeout(function () {
                t.iFrameElement = document.createElement("iframe"), t.iFrameElement.src = t.getFrameUrl(), t.iFrameElement.frameBorder = "0", t.iFrameElement.width = t.width, t.iFrameElement.height = t.height, t.resizeToFullHeight && (t.iFrameElement.scrolling = "no"), t.containerElement.appendChild(t.iFrameElement)
            }, 500)
        }, t.prototype.sendMessage = function (t) {
            this.iFrameElement && this.iFrameElement.contentWindow.postMessage(t, "*")
        }, t.prototype.receiveMessage = function (t) {
            if (this.iFrameElement && 0 === this.src.indexOf(t.origin)) {
                var e = t.data;
                if (void 0 !== e.frameContainerId && e.frameContainerId === this.containerId && void 0 !== e.type) {
                    if ("currentDimensions" === e.type && (this.resizeToFullHeight || this.resizeToFullWidth)) {
                        var i = this.resizeToFullHeight ? e.data.height : this.iFrameElement.height,
                            n = this.resizeToFullWidth ? e.data.width : this.iFrameElement.width;
                        this.resize(n, i)
                    }
                    if ("scrollToInnerPoint" === e.type && this.resizeToFullHeight) {
                        var s = e.data.y + a.getElementOffset(this.iFrameElement).top;
                        setTimeout(function () {
                            a.animateScrollTop(document.body, s, 300)
                        }, 100)
                    }
                    "status" === e.type && "documentReady" === e.data.status && (this.resizeToFullHeight || this.sendMessage({
                        type: "setFullHeight"
                    })), "checkApplePay" === e.type && this.checkApplePayAvailable(e.data.appleMerchantId), "processApplePay" === e.type && this.processApplePayAvailable(e.data.order, e.data.request), "appleCompleteMerchantValidation" === e.type && (this.currentApplePaySession || alert("Сессия не определена"), this.currentApplePaySession.completeMerchantValidation(e.data.result.Model)), "applePaymentStatus" === e.type && (this.currentApplePaySession || alert("Сессия не определена"), this.currentApplePaySession.completePayment(e.data.status))
                }
            }
        }, t.prototype.checkApplePayAvailable = function (t) {
            var e = this;
            window.ApplePaySession && window.ApplePaySession.canMakePaymentsWithActiveCard(t).then(function (t) {
                t && e.sendMessage({
                    type: "applePayIsAvailable"
                })
            }).catch(function (t) {
                console.log(t)
            })
        }, t.prototype.processApplePayAvailable = function (e, t) {
            var i = this;
            this.currentApplePaySession = new window.ApplePaySession(1, t), this.currentApplePaySession.onvalidatemerchant = function (t) {
                i.sendMessage({
                    type: "appleOnValidateMerchant",
                    data: {
                        order: e,
                        validationURL: t.validationURL,
                        paymentUrl: i.getPaymentUrl()
                    }
                })
            }, this.currentApplePaySession.onpaymentauthorized = function (t) {
                i.sendMessage({
                    type: "appleOnPaymentAuthorized",
                    data: {
                        order: e,
                        token: JSON.stringify(t.payment.token),
                        paymentUrl: i.getPaymentUrl()
                    }
                })
            }, this.currentApplePaySession.begin()
        }, t.prototype.getPaymentUrl = function () {
            return location.protocol + "//" + location.hostname
        }, t.prototype.resize = function (t, e) {
            this.iFrameElement.width = t, this.iFrameElement.height = e
        }, t.prototype.setWidth = function (t) {
            this.width = t
        }, t.prototype.setHeight = function (t) {
            this.height = t
        }, t.prototype.setResizeToFullHeight = function (t) {
            this.resizeToFullHeight = t
        }, t.prototype.setResizeToFullWidth = function (t) {
            this.resizeToFullWidth = t
        }, t.prototype.setSrc = function (t) {
            this.src = t
        }, t
    }(),
        n = function () {
            function t(t, e, i) {
                var n = this;
                this.font = "Arial", this.translations = null, this.borderRadius = null, this.renderButton = !0, this.alwaysInNewTab = !1, this.language = null, this.status = "active", this.canChangeStatus = !0, this.companyDataLoaded = !1, this.seatsCount = null, this.canSendRequest = !1, this.rendered = !1, this.openPopup = function () {
                    var t = n.apiInstance.getWidgetUrl(n.companyId, n.showId, n.setId, n.eventId, n.language);
                    n.apiInstance.openIFramePopup(t, n.alwaysInNewTab)
                }, this.apiInstance = t, this.id = this.apiInstance.getUniqueId(), this.containerId = e, this.containerElement = document.getElementById(this.containerId), void 0 !== i && a.configure(this, i)
            }
            return t.prototype.init = function () {
                var t = this;
                return this.companyId ? (this.initHtml(), this.apiInstance.addFallbackFunction(function () {
                    t.renderIfNotRendered()
                }), this.apiInstance.hasCompanyData(this.companyId) ? this.setSettingFromCompanyData(this.apiInstance.getCompanyData(this.companyId)) : this.apiInstance.loadCompanyData({
                    companyId: this.companyId
                }), this.eventId && (this.apiInstance.hasEventsData(this.companyId) ? this.applyEventsData(this.apiInstance.getEventsData(this.companyId)) : this.apiInstance.loadEventsData({
                    companyId: this.companyId
                })), location.hash == "#open-" + this.containerId && this.openPopup(), !0) : (this.apiInstance.logError("У кнопки не задан id компании"), !1)
            }, t.prototype.setSettingFromCompanyData = function (t) {
                this.companyDataLoaded = !0;
                var e = null,
                    i = null,
                    n = null,
                    s = null,
                    o = null,
                    a = null,
                    r = null,
                    l = null,
                    p = null,
                    c = null,
                    u = null,
                    h = null,
                    d = null;
                if (t.settings) {
                    var f = t.settings;
                    e = f.buttonColor, i = f.buttonSizeClass, n = f.buttonTitle, s = f.buttonTitleColor, o = f.buttonFont, r = f.buttonColorNoSeats, l = f.buttonTitleNoSeats, p = f.buttonTitleColorNoSeats, c = f.buttonColorSendRequest, u = f.buttonTitleSendRequest, h = f.buttonTitleColorSendRequest, d = f.buttonBorderRadius, this.styleId || (a = f.buttonLanguage, this.translations = f.translations), this.canSendRequest = f.emailSubscribeEnabled
                }
                if (this.styleId && void 0 !== t.styles[this.styleId]) {
                    var m = t.styles[this.styleId];
                    e = m.buttonColor, i = m.buttonSizeClass, n = m.buttonTitle, s = m.buttonTitleColor, a = m.buttonLanguage, r = m.buttonColorNoSeats, l = m.buttonTitleNoSeats, p = m.buttonTitleColorNoSeats, c = m.buttonColorSendRequest, u = m.buttonTitleSendRequest, h = m.buttonTitleColorSendRequest, d = m.buttonBorderRadius, this.translations = m.translations
                }
                this.color || (this.color = e), this.sizeClass || (this.sizeClass = i), this.title || (this.title = n), this.titleColor || (this.titleColor = s), this.font || (this.font = o), this.language || (this.language = a), this.colorNoSeats || (this.colorNoSeats = r), this.titleNoSeats || (this.titleNoSeats = l), this.titleColorNoSeats || (this.titleColorNoSeats = p), this.colorSendRequest || (this.colorSendRequest = c), this.titleSendRequest || (this.titleSendRequest = u), this.titleColorSendRequest || (this.titleColorSendRequest = h), null === this.borderRadius && (this.borderRadius = d), this.render()
            }, t.prototype.applyEventsData = function (t) {
                if (!this.eventId) return !1;
                if (void 0 === t.events) return !1;
                var e = t.events;
                if (void 0 === e[this.eventId]) return !1;
                var i = e[this.eventId];
                return this.seatsCount = parseInt(i.seats), this.render(), !0
            }, t.prototype.renderIfNotRendered = function () {
                this.rendered || this.render()
            }, t.prototype.setStatus = function (t) {
                this.status = t, this.canChangeStatus = !1
            }, t.prototype.setActiveStatus = function () {
                this.status = "active"
            }, t.prototype.isActive = function () {
                return "active" == this.status
            }, t.prototype.setNoSeatsStatus = function () {
                this.status = "no_seats"
            }, t.prototype.isNoSeats = function () {
                return "no_seats" == this.status
            }, t.prototype.setSendRequestStatus = function () {
                this.status = "send_request"
            }, t.prototype.isSendRequest = function () {
                return "send_request" == this.status
            }, t.prototype.setColor = function (t) {
                this.color = t
            }, t.prototype.setTitle = function (t) {
                this.title = t
            }, t.prototype.setTitleColor = function (t) {
                this.titleColor = t
            }, t.prototype.setFont = function (t) {
                this.font = t
            }, t.prototype.setLanguage = function (t) {
                this.language = t
            }, t.prototype.setSizeClass = function (t) {
                this.sizeClass = t
            }, t.prototype.setColorNoSeats = function (t) {
                this.colorNoSeats = t
            }, t.prototype.setTitleNoSeats = function (t) {
                this.titleNoSeats = t
            }, t.prototype.setTitleColorNoSeats = function (t) {
                this.titleColorNoSeats = t
            }, t.prototype.setColorSendRequest = function (t) {
                this.colorSendRequest = t
            }, t.prototype.setTitleSendRequest = function (t) {
                this.titleSendRequest = t
            }, t.prototype.setTitleColorSendRequest = function (t) {
                this.titleColorSendRequest = t
            }, t.prototype.setRenderButton = function (t) {
                this.renderButton = t
            }, t.prototype.setAlwaysInNewTab = function (t) {
                this.alwaysInNewTab = t
            }, t.prototype.setCompanyId = function (t) {
                this.companyId = t
            }, t.prototype.setStyleId = function (t) {
                this.styleId = t
            }, t.prototype.setShowId = function (t) {
                this.showId = t
            }, t.prototype.setSetId = function (t) {
                this.setId = t
            }, t.prototype.setBorderRadius = function (t) {
                this.borderRadius = t
            }, t.prototype.setEventId = function (t) {
                this.eventId = t
            }, t.prototype.getCompanyId = function () {
                return this.companyId
            }, t.prototype.getEventId = function () {
                return this.eventId
            }, t.prototype.initHtml = function () {
                if (!this.containerElement) return this.apiInstance.logError("Контейнер кнопки не найден: " + this.containerId), !1;
                try {
                    this.containerElement.dataset.widgetId && this.containerElement.dataset.widgetId != "" + this.id && this.apiInstance.logError("Контейнер кнопки с таким id уже используется:" + this.containerId), this.containerElement.dataset.widgetId = "" + this.id
                } catch (t) { }
                if (!this.renderButton) return this.containerElement.onclick = this.openPopup, !0;
                this.containerElement.innerHTML = "", this.buttonElement = document.createElement("div"), this.containerElement.appendChild(this.buttonElement), this.buttonElement.onclick = this.openPopup
            }, t.prototype.getCurrentColor = function () {
                return this.isNoSeats() ? this.colorNoSeats ? this.colorNoSeats : "#bbb" : this.isSendRequest() ? this.colorSendRequest ? this.colorSendRequest : "#bbb" : this.color ? this.color : "#ff502c"
            }, t.prototype.getCurrentTitleColor = function () {
                return this.isNoSeats() ? this.titleColorNoSeats ? this.titleColorNoSeats : "#fff" : this.isSendRequest() ? this.titleColorSendRequest ? this.titleColorSendRequest : "#fff" : this.titleColor ? this.titleColor : "#fff"
            }, t.prototype.getCurrentFont = function () {
                return this.font ? this.font : "Arial"
            }, t.prototype.getCurrentTitle = function () {
                return this.isNoSeats() ? {
                    type: "button_no_seats_title",
                    title: this.titleNoSeats ? this.titleNoSeats : "Нет мест"
                } : this.isSendRequest() ? {
                    type: "button_send_request_title",
                    title: this.titleSendRequest ? this.titleSendRequest : "Оставить заявку"
                } : {
                    type: "button_title",
                    title: this.title ? this.title : "Купить билет"
                }
            }, t.prototype.getCurrentLocalizedTitle = function () {
                var t = this.getCurrentTitle(),
                    e = t.title,
                    i = t.type,
                    n = this.language;
                if (n || (n = this.apiInstance.detectLocale()), !n) return e;
                var s = this.getTranslation(i, n);
                if (s) return s;
                if ("Купить билет" != e) return e;
                var o = a.getDefaultTranslation("button_title", n);
                return o || e
            }, t.prototype.getTranslation = function (t, e) {
                var i = this.translations;
                return i ? void 0 === i[t] ? null : void 0 === i[t][e] ? null : i[t][e] : null
            }, t.prototype.getCurrentSizeClass = function () {
                return this.sizeClass ? this.sizeClass : ""
            }, t.prototype.setCurrentStatus = function () {
                return !!this.canChangeStatus && (!!this.eventId && (this.setActiveStatus(), null !== this.seatsCount && this.seatsCount <= 0 && (this.canSendRequest ? this.setSendRequestStatus() : this.setNoSeatsStatus()), !0))
            }, t.prototype.render = function () {
                return !this.renderButton || (this.setCurrentStatus(), this.buttonElement.style.background = this.getCurrentColor(), this.buttonElement.style.color = this.getCurrentTitleColor(), this.buttonElement.style.border = "1px solid " + this.getCurrentTitleColor(), this.buttonElement.style.fontFamily = '"' + this.getCurrentFont() + '", sans-serif', null !== this.borderRadius && 0 <= this.borderRadius && (this.buttonElement.style.borderRadius = this.borderRadius + "px"), this.buttonElement.innerText = this.getCurrentLocalizedTitle(), this.buttonElement.className = this.apiInstance.getCssClassPrefix() + "-button " + this.getCurrentSizeClass(), this.rendered = !0)
            }, t
        }()
}(ProfTicketWidget || (ProfTicketWidget = {})), void 0 === window.profTicketWidgetApi && (window.profTicketWidgetApi = new ProfTicketWidget.Api, window.profTicketWidgetApi.runInitCallbacks());
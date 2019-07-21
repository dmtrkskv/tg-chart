/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/App.js":
/*!********************!*\
  !*** ./app/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var _Box_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Box.js */ "./app/Box.js");
/* harmony import */ var _themes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./themes.js */ "./app/themes.js");



let requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame
window.requestAnimationFrame = requestAnimationFrame;

let pairs = [
    [["lines", "lines"], ["lines", "lines"]],
    [["lines2Y", "lines2Y"], ["lines2Y", "lines2Y"]],
    [["stacked", "stacked"], ["stacked", "stacked"]],
    [["daily", "daily"], ["lines", null]],
    [["percentage", "percentage"], ["pie", "percentage"]],
];

class App {
    constructor(appId) {
        this.setScrollWidth();

        this.isDesktop = !('ontouchstart' in window);
        this.savedInnerWidth = window.innerWidth;

        this.html = document.getElementById(appId);
        this.html.setAttribute("id", "app");

        this.boxesWrapper = this.html.appendChild(document.createElement("div"));
        this.boxesWrapper.className = "boxesWrapper";

        this.boxes = [];

        for (let i = 0; i < pairs.length; i++) {
            this.boxes.push(new _Box_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.boxesWrapper, "#" + (i + 1), pairs[i], i + 1));
        }

        this.themeSwitcherHTML = this.html.appendChild(document.createElement("div"));
        this.themeSwitcherHTML.className = "themeSwitcher";

        this.theme = "night";
        this.switchTheme();
        this.themeSwitcherHTML.onclick = this.switchTheme.bind(this);

        window.onresize = this.handleResize.bind(this);
    }

    switchTheme() {
        if (this.theme === "day") {
            this.theme = "night";
        } else {
            this.theme = "day";
        }

        switch (this.theme) {
            case "day":
                this.themeSwitcherHTML.textContent = "Switch to Night Mode";
                window.theme = _themes_js__WEBPACK_IMPORTED_MODULE_1__["default"].day;
                break;
            case "night":
                this.themeSwitcherHTML.textContent = "Switch to Day Mode";
                window.theme = _themes_js__WEBPACK_IMPORTED_MODULE_1__["default"].night;
                break;
        }
        window.themeType = this.theme;

        this.boxes.forEach(item => item.setTheme());
        document.body.style.background = window.theme.background;
    }

    handleResize() {
        if (!this.isDesktop) {
            if (window.innerWidth === this.savedInnerWidth) {
                return;
            } else {
                this.savedInnerWidth = window.innerWidth;
            }
        }
        this.boxes.forEach(item => item.onResize());
    }

    setScrollWidth() {
        let div = document.createElement('div');

        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';

        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);

        window.scrollWidth = scrollWidth;
    }

}

/***/ }),

/***/ "./app/Box.js":
/*!********************!*\
  !*** ./app/Box.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Box; });
/* harmony import */ var _Checks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Checks.js */ "./app/Checks.js");
/* harmony import */ var _MainController_Upper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainController/Upper.js */ "./app/MainController/Upper.js");
/* harmony import */ var _MainController_Lower_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MainController/Lower.js */ "./app/MainController/Lower.js");
/* harmony import */ var _MainController_Slider_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MainController/Slider.js */ "./app/MainController/Slider.js");
/* harmony import */ var _dataHandler_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dataHandler.js */ "./app/dataHandler.js");
/* harmony import */ var _parseUnixtime_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./parseUnixtime.js */ "./app/parseUnixtime.js");









class Box {
    constructor(parentHTML, title, types, typeIndex) {
        this.data = {};

        this.types = types;
        this.typeIndex = typeIndex;

        this.sliderK = .95;

        this.html = parentHTML.appendChild(document.createElement("div"));
        this.html.className = "box";

        this.ratio = [5, 62, 11, 22];

        this.tumblerLimiter = 7;

        this.zoomedScopeStartK = types[0][0] === "daily" ? 1 : 7;

        //хэдэр
        this.title = title;

        this.transDur = 200;
        this.transitionHappens = false;

        this.buildHeader();
        this.buildCanvases();

        this.loaderHTML = this.html.appendChild(document.createElement("div"));
        this.loaderHTML.className = "loaderBox";
        let spin = this.loaderHTML.appendChild(document.createElement("div"));
        spin.className = "cssload-speeding-wheel";

        this.setSizes();

        this.tooltipHTML = this.html.appendChild(document.createElement("div"));
        this.tooltipHTML.style.zIndex = 1;
        this.tooltipHTML.className = "tooltip";

        this.tooltipAreaHTML = this.html.appendChild(document.createElement("div"));
        this.tooltipAreaHTML.style.position = "absolute";
        this.tooltipAreaHTML.style.zIndex = 2;
        this.tooltipAreaHTML.className = "tooltipArea";

        this.getDataFromServer()
            .then(json => {
                //тут будет запрос на них на сервер, вот и все
                this.data = Object(_dataHandler_js__WEBPACK_IMPORTED_MODULE_4__["getDataFromJSON"])(json);
                this.data.names.length === 1 || this.buildCheckBoxes();
                this.setSizes();
                this.initCanvases();
            });
    }

    getDataFromServer(folder, item) {
        let showingLoad = false;
        let timer = setTimeout(() => {
            this.loaderHTML.style.display = "flex";
            this.loaderHTML.style.opacity = 1;
            showingLoad = true;
        }, 100);

        let path = folder && this.typeIndex != 5 ? `${this.typeIndex}/${folder}/${item}` : this.typeIndex;
        return fetch(`http://a0243986.xsph.ru/getTelechartData/${path}`)
            .then(
                response => {
                    clearTimeout(timer);
                    if (showingLoad === true) {
                        setTimeout(() => (this.loaderHTML.style.display = "none"), 600);
                        this.loaderHTML.style.opacity = 0;
                    }
                    return response.json();
                }
            )
            .catch(err => {
                this.loaderHTML.style.display = "none";
                this.loaderHTML.style.opacity = 0;
                alert("Connection Error");
                return null;
            });
    }

    defineZoomRange(zoomObj) {
        let l = zoomObj.l;
        let middleIndex = zoomObj.i - l;
        let d = this.zoomedScopeStartK,
            dd = Math.floor(this.zoomedScopeStartK / 2);
        let i1 = middleIndex - dd, i2 = middleIndex + dd;
        i1 === i2 && i2++;

        let lastInScope = zoomObj.coordsX.length - 1;
        if (i1 < 0) {
            i1 = 0;
            i2 = d - 1;
        } else if (i2 > lastInScope) {
            i2 = lastInScope;
            i1 = i2 - d + 1;
        }

        return [i1, i2];
    }

    setZoomParams(zoomObj, range) {
        let [i1, i2] = range;
        let x1 = zoomObj.coordsX[i1], x2 = zoomObj.coordsX[i2];
        let w = this.sizes.w;

        this.upperXZoomParams = {
            leftK: x1 / w,
            middleK: (x2 - x1) / w
        };

        this.globalZoomOffset = zoomObj.i / this.data.valuesNumber;
        this.lowerXZoomParams = {
            leftK: this.globalZoomOffset,
            middleK: this.zoomedScopeStartK / this.data.valuesNumber
        };
    }

    applyZoomParams(xScopeObj, xParams, dir) {
        let lW = this.sizes.lW;
        let curTW = this.slider.tumblerWidth;

        let zoomAreaRelWidth = xParams.middleK * lW,
            zoomAreaRelLeft = xParams.leftK * lW;

        let obj1 = {
            tumblerStart: - (zoomAreaRelLeft / zoomAreaRelWidth * lW),
            tumblerWidth: lW * lW / zoomAreaRelWidth
        };
        let obj2 = {
            tumblerStart: this.globalZoomOffset * lW - (curTW * xParams.middleK) / 2,
            tumblerWidth: curTW * xParams.middleK
        };

        if (dir === 1) {
            xScopeObj.from = obj1;
            xScopeObj.to = obj2;
        } else if (dir === -1) {
            xScopeObj.from = obj2;
            xScopeObj.to = obj1;
        }
    }

    onZoom(zoomObj, day, month, year) {
        if (this.transitionHappens === true) return;
        this.transitionHappens = true;

        let range = this.defineZoomRange(zoomObj);
        this.setZoomParams(zoomObj, range);

        let monthNumber = String(_parseUnixtime_js__WEBPACK_IMPORTED_MODULE_5__["monthLabels"].indexOf(month) + 1);
        monthNumber.length === 1 && (monthNumber = "0" + monthNumber);
        let folder = `${year}-${monthNumber}`;
        let item = String(day);
        item.length === 1 && (item = "0" + item);

        if (this.typeIndex === 5) {
            this.data2 = this.data;
            let l = zoomObj.l;
            this.data = Object(_dataHandler_js__WEBPACK_IMPORTED_MODULE_4__["sliceData"])(this.data2, l + range[0], l + range[1]);
            handle.call(this);
        } else {
            this.getDataFromServer(folder, item)
                .then(result => {
                    if (result === null) {
                        this.transitionHappens = false;
                        return;
                    }
                    this.data2 = this.data;
                    this.data = Object(_dataHandler_js__WEBPACK_IMPORTED_MODULE_4__["getDataFromJSON"])(result);
                    handle.call(this);
                });
        }

        function handle() {
            this.titleHTML.textContent = "Zoom Out";
            this.headerTitleHTML.style.color = window.theme.zoomOutText;
            this.headerTitleHTML.onclick = this.onZoomOut.bind(this);

            let a = this.headerTitleHTML.appendChild(document.createElementNS('http://www.w3.org/2000/svg', "svg"));
            a.setAttribute("viewBox", "0 0 24 24");
            let path = a.appendChild(document.createElementNS('http://www.w3.org/2000/svg', "path"));
            path.setAttribute("d",
                "M9,2C5.1,2,2,5.1,2,9s3.1,7,7,7c1.7,0,3.3-0.7,4.6-1.7l0.4,0.4V16l5.6,5.6c0.6,0.6,1.4,0.6,2,0s0.6-1.4,0-2L16,14h-1.3 l-0.4-0.4C15.3,12.3,16,10.7,16,9C16,5.1,12.9,2,9,2z M9,4c2.8,0,5,2.2,5,5s-2.2,5-5,5s-5-2.2-5-5S6.2,4,9,4z M10.8,10.1H7.2 c-0.6,0-1.1-0.5-1.1-1.1v0c0-0.6,0.5-1.1,1.1-1.1h3.6c0.6,0,1.1,0.5,1.1,1.1v0C11.9,9.6,11.4,10.1,10.8,10.1z"
            );

            this.makeTransition(...this.types[1], 1);

            //лучше через методы
            this.upper.zoomed = true;
            this.upper.hoursMode = true;
            this.slider.isLive = true;

            this.typeIndex === 5 && (this.lower.chartController.columnMode = true);
        }
    }

    onZoomOut() {
        if (this.slider.isTorn === true) return; // дожидаемся окончания перехода

        this.data = this.data2;

        this.headerTitleHTML.querySelector("svg").remove();
        this.headerTitleHTML.style.color = window.theme.text;
        this.headerTitleHTML.onclick = null;
        this.titleHTML.textContent = this.title;

        this.makeTransition(...this.types[0], -1);

        this.upper.zoomed = false;
        this.upper.hoursMode = false;
        this.slider.isLive = false;

        this.typeIndex === 5 && (this.lower.chartController.columnMode = false);
    }

    makeTransition(upperChartType, lowerChartType, dir) {
        this.tooltipHTML.style.display = "none";
        this.upper.onSelectionChange();
        this.slider.switchInfluence(false);

        let disappearingHTML1 = this.upperHTML;
        let disappearingHTML2 = this.lowerHTML;

        let { w, lW, uH, lH } = this.sizes;
        let tS, tW;

        //год -> дни
        if (dir === 1) {
            this.savedSliderParams = {
                tumblerStart: this.slider.tumblerStart / lW,
                tumblerWidth: this.slider.tumblerWidth / lW
            };
            let d = this.zoomedScopeStartK,
                dd = Math.floor(this.zoomedScopeStartK / 2);
            tS = lW * dd / d;
            tW = lW / d;
            //дни -> год    
        } else if (dir === -1) {
            tS = this.savedSliderParams.tumblerStart * lW;
            tW = this.savedSliderParams.tumblerWidth * lW;
        }

        let upperXScope = {}, lowerXScope = {};
        this.applyZoomParams(upperXScope, this.upperXZoomParams, dir);
        this.applyZoomParams(lowerXScope, this.lowerXZoomParams, dir);

        Promise.all([
            new Promise(handleCharts.bind(this)),
            new Promise(handleSlider.bind(this))
        ])
            .then(() => {
                this.tooltipHTML.style.display = "flex";
                this.switchTooltip(true);

                this.html.removeChild(disappearingHTML1);
                this.types[0][0] === "daily" || this.html.removeChild(disappearingHTML2);

                this.slider.switchInfluence(true, this.upper);
                this.transitionHappens = false;
            });


        function handleCharts(resolve) {
            let [upper, lower] = [this.upper, this.lower];

            //новый html
            this.upperHTML = this.html.appendChild(document.createElement("canvas"));
            this.upperHTML.style.position = "absolute";
            if (this.types[0][0] !== "daily") {
                this.lowerHTML = this.html.appendChild(document.createElement("canvas"));
                this.lowerHTML.style.position = "absolute";
            }

            //новые контроллеры
            let ctx;

            ctx = this.upperHTML.getContext('2d');
            this.upper = new _MainController_Upper_js__WEBPACK_IMPORTED_MODULE_1__["default"](
                upperChartType, ctx, w, uH, this.sliderK, this.data, tS, tW,
                this.upperHTML, this.updateHeaderDate.bind(this), this.onZoom.bind(this)
            );

            ctx = this.lowerHTML.getContext('2d');
            if (this.types[0][0] === "daily") {
                let elems = this.html.querySelectorAll(".lowerBar");
                if (lowerChartType === null) {
                    [].forEach.call(elems, elem => {
                        elem.style.transform = "perspective(10px) translateZ(-10px)";
                        elem.style.opacity = 0;
                    });
                    this.buildCheckBoxes();
                } else {
                    [].forEach.call(elems, elem => {
                        elem.style.transform = "perspective(10px) translateZ(0)";
                        elem.style.opacity = 1;
                    });
                    this.removeCheckBoxes();
                }
            } else {
                this.lower = new _MainController_Lower_js__WEBPACK_IMPORTED_MODULE_2__["default"](
                    lowerChartType, ctx, lW, lH, 1, this.data, 0, lW, this.html
                );
            }

            this.onResize();

            this.upper.initAppearAnimation(upperXScope.from, this.transDur);
            upper.initDisappearAnimation(upperXScope.to, this.transDur, resolve);

            if (this.types[0][0] !== "daily") {
                this.lower.initAppearAnimation(lowerXScope.from, this.transDur);
                lower.initDisappearAnimation(lowerXScope.to, this.transDur, resolve);
            }
        }

        function handleSlider(resolve) {
            this.slider.initAnimateTumbler(tS, tW, this.transDur, resolve);
        }
    }

    switchTooltip(state) {
        let event = state ? "mouseenter" : "mouseleave";
        this.upper.upperListener.areaHTML
            .dispatchEvent(
                new Event(event)
            );
    }

    buildHeader() {
        this.headerHTML = this.html.appendChild(document.createElement("div"));
        this.headerHTML.className = "header";

        this.headerTitleHTML = this.headerHTML.appendChild(document.createElement("div"));
        this.headerTitleHTML.className = "headerTitle";
        this.titleHTML = this.headerTitleHTML.appendChild(document.createElement("div"));
        this.titleHTML.textContent = this.title;

        this.headerDateHTML = this.headerHTML.appendChild(document.createElement("div"));
        this.headerDateHTML.className = "headerDate";
    }

    buildCanvases() {
        this.upperHTML = this.html.appendChild(document.createElement("canvas"));
        this.lowerHTML = this.html.appendChild(document.createElement("canvas"));
        this.sliderHTML = this.html.appendChild(document.createElement("canvas"));

        this.upperHTML.style.position = "absolute";
        this.lowerHTML.style.position = "absolute";
        this.lowerHTML.className = "lowerBar";
        this.sliderHTML.style.position = "absolute";
        this.sliderHTML.className = "lowerBar";
        this.sliderHTML.style.zIndex = 1;
    }

    buildCheckBoxes() {
        this.checks = new _Checks_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.html, this.data,
            this.updateChartChecks.bind(this));
    }

    removeCheckBoxes() {
        this.checks.clear();
    }

    initCanvases() {
        let ctx;
        let { w, lW, lH, uH } = this.sizes;

        ctx = this.upperHTML.getContext('2d');
        this.upper = new _MainController_Upper_js__WEBPACK_IMPORTED_MODULE_1__["default"](
            this.types[0][0], ctx, w, uH, this.sliderK, this.data, 0, lW / this.tumblerLimiter,
            this.upperHTML, this.updateHeaderDate.bind(this), this.onZoom.bind(this)
        );

        ctx = this.lowerHTML.getContext('2d');
        this.lower = new _MainController_Lower_js__WEBPACK_IMPORTED_MODULE_2__["default"](
            this.types[0][1], ctx, lW, lH, 1, this.data, 0, lW, this.html
        );

        ctx = this.sliderHTML.getContext('2d');
        this.slider = new _MainController_Slider_js__WEBPACK_IMPORTED_MODULE_3__["default"](
            ctx, this.sliderHTML, lW, lH, this.tumblerLimiter, this.upper
        );

        this.upper.animate(true);
        this.lower.animate(true);

        this.slider.update(0, lW / this.tumblerLimiter);
    }

    updateChartChecks(index, state) {
        this.switchTooltip(false);
        this.upper.onCheckBoxesStateChange(index, state);
        this.types[0][0] === "daily" ||
            this.lower.onCheckBoxesStateChange(index, state);
    }

    updateHeaderDate(dateLabels, zoomed) {
        if (this.prevDateLabels === dateLabels) {
            return;
        }
        this.prevDateLabels = dateLabels;

        let h = this.headerDateHTML;
        let labelString = buildLabel();

        if (zoomed === true) {
            h.style.opacity = 0;
            h.style.transformOrigin = "left top";
            h.style.transform = "scale(.5)";
            setTimeout(() => {
                h.style.opacity = 1;
                h.style.transformOrigin = "right bottom";
                h.style.transform = "scale(1)";
                h.textContent = labelString;
            }, 100);
        } else {
            h.textContent = labelString;
        }

        function buildLabel() {
            let string = "";
            dateLabels[0].forEach(item => {
                string += item + " ";
            });
            if (dateLabels[1]) {
                string += "- ";
                dateLabels[1].forEach(item => {
                    string += item + " ";
                });
            }
            return string;
        }
    }

    onResize() {
        this.setSizes();

        let { w, lW, uH, lH } = this.sizes;
        this.upper.onResize(w, uH);
        this.lower.onResize(lW, lH);
        this.slider.onResize(lW, lH);
    }

    setSizes() {
        let screenWidth = window.innerWidth - window.scrollWidth;
        let sidePadding = screenWidth * .03;

        let h = document.documentElement.clientHeight;
        h < 600 && (h = 600);
        this.sizes = {
            w: screenWidth - sidePadding,
            lW: (screenWidth - sidePadding) * this.sliderK,
            hH: h * this.ratio[0] / 100,
            uH: h * this.ratio[1] / 100,
            lH: h * this.ratio[2] / 100
        };

        let { w, lW, hH, uH, lH } = this.sizes;

        this.html.style.left = sidePadding / 2;
        this.html.style.width = w;
        this.html.style.height = h;

        this.upperHTML.style.top = hH;
        this.upperHTML.setAttribute("width", w);
        this.upperHTML.setAttribute("height", uH);

        this.lowerHTML.style.top = hH + uH;
        this.lowerHTML.setAttribute("width", lW);
        this.lowerHTML.setAttribute("height", lH);

        this.sliderHTML.style.top = hH + uH;
        this.sliderHTML.setAttribute("width", lW);
        this.sliderHTML.setAttribute("height", lH);

        this.headerHTML.style.height = hH;
        this.headerHTML.style.lineHeight = hH + "px";
        this.headerHTML.style.width = w;

        this.loaderHTML.style.height = hH + uH + lH;

        let cBT = hH + uH + lH, bH = cBT;

        if (this.types[0][0] === "daily") {
            if (this.checks) {
                this.checks.html.style.top = cBT - lH;
            }
            bH += lH;
        } else {
            if (this.checks) {
                this.checks.html.style.top = cBT;
                bH += this.checks.html.offsetHeight;
            }
        }
        this.html.style.height = bH;
    }

    setTheme() {
        let upperIsZoomed = this.upper && this.upper.zoomed;
        this.headerTitleHTML.style.color = upperIsZoomed ? window.theme.zoomOutText : window.theme.text;
        this.headerDateHTML.style.color = window.theme.text;
        this.tooltipHTML.style.background = window.theme.tooltip;
        this.tooltipHTML.style.color = window.theme.tooltipText;
        this.loaderHTML.style.background = window.theme.background;

        this.upper && this.onResize();
    }
}

/***/ }),

/***/ "./app/ChartController/Base/Base.js":
/*!******************************************!*\
  !*** ./app/ChartController/Base/Base.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
class Base {
    constructor(ctx, width, height, marginTop, data, drawPopup, deletePopup) {
        this.ctx = ctx;

        this.width = width;
        this.height = height;
        this.marginTop = marginTop;
        this.chartHeight = height + marginTop;

        this.data = data;

        this.drawPopup = drawPopup;
        this.deletePopup = deletePopup;

        this.items = [];
        this.amounts = [];

        this.isHightlight = false;
        this.animationHappens = false;

        this.axisYAnimationDuration = 200;

        this.axisYmax = {
            curV: 0,
            newV: null,
            lastSavedNewV: null,
            animBias: 0,
            animDuration: this.axisYAnimationDuration
        };

        this.axisYmin = {
            curV: 0,
            newV: null,
            lastSavedNewV: null,
            animBias: 0,
            animDuration: this.axisYAnimationDuration
        };

        this.lastTime = 0;

        this.checks = new Array(this.data.valuesY.length).fill(true);
    }


    onResize(width, height, marginTop) {
        this.width = width;
        this.height = height;
        this.marginTop = marginTop;
        this.chartHeight = height + marginTop;

        this.items.forEach(item => {
            item.width = width;
            item.height = height;
            item.marginTop = marginTop;
        });
    }

    //возвращает: 

    //если 0 - нет анимации
    //если 1 - инициация впервые
    //если 2 - иницация 
    //если 3 - идет анимация
    //если 4 - анимация окончена    

    animate(o) {
        let dif = o.newV - o.curV;

        if (dif !== 0) {

            if (o.lastSavedNewV === null) {
                o.lastSavedNewV = o.curV = o.newV;

                return 1;
            } else if (o.lastSavedNewV !== o.newV) {
                o.lastSavedNewV = o.newV;
                o.animBias = Math.round(100 * (dif / o.animDuration)) / 100;

                return 2;
            }

            let s = Math.round(100 * (o.curV + o.animBias * this.dt)) / 100;

            if ((dif > 0 && s < o.newV) || (dif < 0 && s > o.newV)) {
                o.curV = s;

                return 3;
            } else {
                o.curV = o.newV;

                return 4;
            }
        }
        return 0;
    }

    updateDT() {
        let now = Date.now();
        this.dt = now - this.lastTime;
        this.lastTime = now;
    }

    animateMarking() { }

    animateVisibility(index, state) {
        this.items[index].initVisibilityAnimation(state, this.axisYAnimationDuration);
        this.checks[index] = state;
    }

    unhighlight() {
        this.isHightlight = false;
    }

    prepareValue(value) {
        return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }

    drawVerticalLine() {
        let ctx = this.ctx;
        ctx.strokeStyle = window.theme.gridLines;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.focusX, 0);
        ctx.lineTo(this.focusX, this.chartHeight);
        ctx.stroke();
    }
}

/***/ }),

/***/ "./app/ChartController/Base/ItemBase.js":
/*!**********************************************!*\
  !*** ./app/ChartController/Base/ItemBase.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ItemBase; });
function hexDec(h) {
    var m = h.slice(1).match(/.{2}/g);

    m[0] = parseInt(m[0], 16);
    m[1] = parseInt(m[1], 16);
    m[2] = parseInt(m[2], 16);

    return m.join(',');
};

class ItemBase {
    constructor(ctx, height, marginTop, color, values) {
        this.ctx = ctx;

        this.height = height;
        this.marginTop = marginTop;

        this.color = hexDec(color);

        this.values = values;

        this.visibility = 1;

        this.coordsY = [];

        this.animationHappens = false;
    }

    //синхронизация не треубуется, можно не заморачиваться
    //и анимировать локально
    initVisibilityAnimation(dir, dur) {
        cancelAnimationFrame(this.requestID);

        this.animStep = 1 / dur;
        this.lastTime = Date.now();
        this.animateVisibility(dir);
    }

    animateVisibility(dir) {
        let now = Date.now();
        this.dt = now - this.lastTime;
        this.lastTime = now;

        if (dir === true) {
            this.visibility += this.animStep * this.dt;
            this.visibility >= 1 && (this.visibility = 1);
        } else {
            this.visibility -= this.animStep * this.dt;
            this.visibility <= 0 && (this.visibility = 0);
        }

        let target = +dir;
        if (this.visibility === target) {
            this.animationHappens = false;
        } else {
            this.animationHappens = true;
            (this.requestID = requestAnimationFrame(() => this.animateVisibility(dir)));
        }
    }

}

/***/ }),

/***/ "./app/ChartController/Daily.js":
/*!**************************************!*\
  !*** ./app/ChartController/Daily.js ***!
  \**************************************/
/*! exports provided: Daily, DailyL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Daily", function() { return Daily; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DailyL", function() { return DailyL; });
/* harmony import */ var _Base_Base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base/Base.js */ "./app/ChartController/Base/Base.js");


function hexDec(h) {
    var m = h.slice(1).match(/.{2}/g);

    m[0] = parseInt(m[0], 16);
    m[1] = parseInt(m[1], 16);
    m[2] = parseInt(m[2], 16);

    return m.join(',');
};

class DailyBase extends _Base_Base_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(ctx, width, height, marginTop, data,
        drawPopup) {
        super(ctx, width, height, marginTop, data, drawPopup);
    }

    updateCoordsY(l, r) {
        this.coordsY = [];
        for (let i = 0; i < r - l + 1; i++) {
            let y = this.height - this.data.valuesY[0][i + l] *
                (this.height / this.axisYmax.curV)
                + this.marginTop;
            this.coordsY.push(Math.round(y * 100) / 100);
        }
    }

    // метод, инициирующий анимацию масштаба по оси Y
    updateVerticalBounds(l, r) {
        let res = this.defineVerticalBounds(l, r);
        this.axisYmax.newV = res.max;
    }

    defineVerticalBounds(l, r) {
        return {
            max: Math.max(...this.data.valuesY[0].slice(
                l, r)), min: 0
        };
    }

    draw(shouldUpdate, coordsX, leftBoundIndex, rightBoundIndex) {
        let input = false;

        if (shouldUpdate) {
            this.updateDT();

            let res = this.animate(this.axisYmax);
            input = !!res || input;

            if (res === 2) {
                this.animateMarking(this.axisYAnimationDuration,
                    this.axisYmax.newV, 0);
            }
            this.updateCoordsY(leftBoundIndex, rightBoundIndex);
        }

        let ctx = this.ctx;
        ctx.beginPath();

        let scaleX = coordsX[1] - coordsX[0];
        let lastX = coordsX[coordsX.length - 1] + scaleX;

        let prevY = this.height + this.marginTop;
        for (let i = 0; i < this.coordsY.length; i++) {
            prevY = this.drawSegment(
                prevY, coordsX[i], this.coordsY[i]
            );
        }

        ctx.lineTo(lastX, prevY);
        ctx.lineTo(lastX, this.height + this.marginTop);

        ctx.fillStyle = `rgba(${this.color}, ${this.visibility})`;
        ctx.fill();

        this.isHightlight === true && this.drawMask(coordsX, scaleX);

        return input;
    }

    drawSegment(prevY, x, y) {
        this.ctx.lineTo(x, prevY);
        this.ctx.lineTo(x, y);
        return y;
    }
}

class Daily extends DailyBase {
    constructor(ctx, width, height, marginTop, data,
        drawPopup, animateMarking) {

        super(ctx, width, height, marginTop, data, drawPopup);

        this.color = hexDec(this.data.colors[0]);
        this.visibility = 1;

        this.chartHeight = height + marginTop;

        this.animateMarking = animateMarking;
    }


    highlightItem(x, y, coordsX, scaleX, leftBoundIndex) {
        this.focusX = x;
        this.focusY = y;

        this.isHightlight = true;
        let index = Math.floor((x - coordsX[0]) / scaleX); //вместо round
        index < 0 && (index = 0);

        this.highlightedIndex = index;

        let dockets = [{
            name: this.data.names[0],
            value: this.prepareValue(this.data.valuesY[0][index + leftBoundIndex]),
        }];

        this.drawPopup(index, dockets);
    }

    unhighlight() {
        this.isHightlight = false;
        this.visibility = 1;
    }

    //rep
    drawMask(coordsX, scaleX) {
        let ctx = this.ctx;

        let i = this.highlightedIndex;
        ctx.beginPath();

        ctx.moveTo(0, 0);
        ctx.lineTo(0, this.height + this.marginTop);
        ctx.lineTo(coordsX[i], this.height + this.marginTop);
        ctx.lineTo(coordsX[i], this.coordsY[i]);
        ctx.lineTo(coordsX[i] + scaleX, this.coordsY[i]);
        ctx.lineTo(coordsX[i] + scaleX, this.height + this.marginTop);
        ctx.lineTo(this.width, this.height + this.marginTop);
        ctx.lineTo(this.width, 0);

        ctx.fillStyle = window.theme.highlightMask;
        ctx.fill();
    }

}

// буду делать наследование с немного разным функционалом
class DailyL extends DailyBase {
    constructor(ctx, width, height, marginTop, data) {
        super(ctx, width, height, marginTop, data);

        this.color = hexDec(this.data.colors[0]);
        this.visibility = 1;
    }

}


/***/ }),

/***/ "./app/ChartController/Item/Lines.js":
/*!*******************************************!*\
  !*** ./app/ChartController/Item/Lines.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Item; });
/* harmony import */ var _Base_ItemBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Base/ItemBase.js */ "./app/ChartController/Base/ItemBase.js");



class Item extends _Base_ItemBase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(ctx, height, marginTop, color, values, lineWidth) {
        super(ctx, height, marginTop, color, values);

        this.circleRadius = 6;
        this.lineWidth = lineWidth;
    }

    updateCoordsY(l, r, max, min) {
        // debugger;
        this.coordsY = [];
        for (let i = 0; i < r - l + 1; i++) {
            let range = max - min;
            let y = (max - this.values[i + l]) / range * this.height
                + this.marginTop;
            this.coordsY.push(Math.round(y * 100) / 100);
        }
    }

    draw(coordsX) {
        if (this.visibility !== 0) {
            let ctx = this.ctx;

            ctx.strokeStyle = `rgba(${this.color}, ${this.visibility})`;
            ctx.lineWidth = this.lineWidth;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.beginPath();

            for (let i = 0; i < coordsX.length; i++) {
                this.ctx.lineTo(coordsX[i], this.coordsY[i]);
            }
            ctx.stroke();
        }

        return this.animationHappens;
    }

    // анимировать нужно только X. Затем каждая линия должна сама понять, какой нужен Y
    // имея в наличии X и coordsX


    drawCircleInPoint(x, coordsX) {
        if (this.visibility === 0) return;

        let ctx = this.ctx;
        ctx.strokeStyle = `rgba(${this.color}, ${this.visibility})`;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();

        let dx = coordsX[1] - coordsX[0];

        let i = Math.floor((x - coordsX[0]) / dx);
        i < 0 && (i = 0);

        let dy = (this.coordsY[i + 1] - this.coordsY[i]) || 0;
        let y = this.coordsY[i] + dy * (x - coordsX[i]) / dx;

        ctx.arc(x, y, this.circleRadius, 0, 2 * Math.PI, true);
        ctx.stroke();

        ctx.fillStyle = window.theme.background;
        ctx.arc(x, y, this.circleRadius - this.lineWidth, 0, 2 * Math.PI, true);
        ctx.fill();
    }

}

/***/ }),

/***/ "./app/ChartController/Item/Percentage.js":
/*!************************************************!*\
  !*** ./app/ChartController/Item/Percentage.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Item; });
/* harmony import */ var _Base_ItemBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Base/ItemBase.js */ "./app/ChartController/Base/ItemBase.js");


class Item extends _Base_ItemBase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(ctx, height, marginTop, color, values) {
        super(ctx, height, marginTop, color, values);

    }

    updateCoordsY(l, r, curAmounts, amounts) {
        this.coordsY = [];

        for (let i = 0; i < amounts.length; i++) {
            // amounts[i] не дб равен 0
            let y = curAmounts[i] / amounts[i] *
                this.height +
                this.marginTop;
            //тут мб что-то неприятное
            this.coordsY.push(Math.round(y * 100) / 100);

            curAmounts[i] += this.values[i + l] * this.visibility;
        }

        return curAmounts;
    }

    draw(coordsX, columnMode = false, width) {
        if (this.visibility !== 0) {
            let ctx = this.ctx;

            ctx.beginPath();
            ctx.lineTo(coordsX[0], this.height + this.marginTop);
            if (columnMode === true) {
                let prevY = this.coordsY.reduce(drawColumnSegment, this.height + this.marginTop);
                ctx.lineTo(width, prevY);
                ctx.lineTo(width, this.height + this.marginTop);
            } else {
                this.coordsY.forEach(drawSegment);
            }
            ctx.lineTo(
                coordsX[coordsX.length - 1],
                this.height + this.marginTop
            );

            ctx.fillStyle = `rgba(${this.color}, ${this.visibility})`;
            ctx.fill();

            function drawSegment(curVal, i) {
                let x = coordsX[i];
                ctx.lineTo(x, curVal);
            }

            function drawColumnSegment(prevVal, curVal, i) {
                let x = coordsX[i];

                ctx.lineTo(x, prevVal);
                ctx.lineTo(x, curVal);

                return curVal;
            }
        }
        return this.animationHappens;
    }

}

/***/ }),

/***/ "./app/ChartController/Item/Pie.js":
/*!*****************************************!*\
  !*** ./app/ChartController/Item/Pie.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Item; });
/* harmony import */ var _Base_ItemBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Base/ItemBase.js */ "./app/ChartController/Base/ItemBase.js");


class Item extends _Base_ItemBase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(ctx, centerX, centerY, radius, color) {
        super(ctx, null, null, color);

        this.centerX0 = centerX;
        this.centerY0 = centerY;

        this.centerX = centerX;
        this.centerY = centerY;

        this.radius = radius;
        this.maxLabelSize = this.radius * 2 / 5;

        this.animationHappens2 = false;

        this.pushOffset = 0;
    }

    update(startAngle, value, total) {
        this.value = value;

        let angle = 2 * Math.PI * value / total;

        this.startAngle = startAngle;
        this.endAngle = startAngle + angle;

        let percentage = Math.round(value / total * 100);
        this.label = percentage + "%";
        this.size = this.defineLabelSize(percentage);

        return this.endAngle;
    }

    updateDT() {
        let now = Date.now();
        this.dt = now - this.lastTime;
        this.lastTime = now;
    }

    initPushAnimation(dir, dur) {
        if (dir === this.pushDir) return;

        this.updateDT();
        this.animStep = 1 / dur;
        this.pushDir = dir;

        cancelAnimationFrame(this.requestID2);
        this.animationHappens2 = true;
        this.animatePush(dir);
    }

    animatePush(dir) {
        this.updateDT();

        if (dir === true) {
            let a = this.pushOffset + this.animStep * this.dt
            this.pushOffset = a >= 1 ? 1 : a;
        } else {
            let a = this.pushOffset - this.animStep * this.dt;
            this.pushOffset = a <= 0 ? 0 : a;
        }

        let angle = this.startAngle - (this.startAngle - this.endAngle) / 2;
        let offset = 15;

        this.centerX = this.centerX0 + this.pushOffset * Math.cos(angle) * offset;
        this.centerY = this.centerY0 + this.pushOffset * Math.sin(angle) * offset;

        if (this.pushOffset === +dir) {
            this.animationHappens2 = false;
        } else {
            this.requestID2 = requestAnimationFrame(() => this.animatePush(dir));
        }
    }

    drawPieSliceLabel(label, size, startAngle, endAngle) {
        let fontRatio = 0.8;

        let angle = startAngle - (startAngle - endAngle) / 2;

        let width = size * (label.toString().length) * fontRatio;
        let biasY = size / 2;
        let biasX = width / 2;
        let radius = this.radius - (size + width) / 4;

        let radiusK = 1 - (Math.abs(startAngle - endAngle) / (2 * Math.PI));

        let x = this.centerX + radius * radiusK * Math.cos(angle) - biasX;
        let y = this.centerY + radius * radiusK * Math.sin(angle) + biasY;

        let ctx = this.ctx;

        ctx.font = `${size}px Verdana`;
        ctx.fillStyle = "white";
        ctx.fillText(label, x, y);
    }

    //в кусочек
    defineLabelSize(percentage) {
        let sizeK;

        if (percentage < 20) {
            sizeK = 20;
        } else {
            sizeK = percentage;
        }

        return sizeK / 100 * this.maxLabelSize;
    }

    //в кусочек
    drawPieSlice(startAngle, endAngle) {
        let ctx = this.ctx;

        ctx.fillStyle = `rgba(${this.color}, ${this.visibility})`;
        ctx.beginPath();
        ctx.moveTo(this.centerX, this.centerY);
        ctx.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
    }


    draw() {
        if (this.visibility !== 0) {
            this.ctx.globalCompositeOperation = "destination-over";
            this.drawPieSlice(this.startAngle, this.endAngle);
            this.ctx.globalCompositeOperation = "source-over";
            this.drawPieSliceLabel(this.label, this.size, this.startAngle, this.endAngle);
        }

        return this.animationHappens || this.animationHappens2;
    }


}

/***/ }),

/***/ "./app/ChartController/Item/Stacked.js":
/*!*********************************************!*\
  !*** ./app/ChartController/Item/Stacked.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Item; });
/* harmony import */ var _Base_ItemBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Base/ItemBase.js */ "./app/ChartController/Base/ItemBase.js");


class Item extends _Base_ItemBase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(ctx, height, marginTop, color, values) {
        super(ctx, height, marginTop, color, values);
    }

    updateCoordsY(l, r, max, amounts) {
        this.coordsY = [];

        // console.log(amounts);

        for (let i = 0; i < amounts.length; i++) {
            let y = this.height -
                amounts[i] * this.height / max
                + this.marginTop;
            this.coordsY.push(Math.round(y * 100) / 100);

            amounts[i] -= this.values[i + l] * this.visibility;
        }

        return amounts;
    }

    draw(coordsX, lastX) {
        if (this.visibility !== 0) {
            let ctx = this.ctx;

            ctx.beginPath();
            let lastY = this.coordsY.reduce(drawSegment, this.height + this.marginTop);
            ctx.lineTo(lastX, lastY);
            ctx.lineTo(lastX, this.height + this.marginTop);

            ctx.fillStyle = `rgba(${this.color}, ${this.visibility})`;
            ctx.fill();

            function drawSegment(prevVal, curVal, i) {
                let x = coordsX[i];

                ctx.lineTo(x, prevVal);
                ctx.lineTo(x, curVal);

                return curVal;
            }
        }

        return this.animationHappens;;
    }


}

/***/ }),

/***/ "./app/ChartController/Lines.js":
/*!**************************************!*\
  !*** ./app/ChartController/Lines.js ***!
  \**************************************/
/*! exports provided: Lines, LinesL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Lines", function() { return Lines; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinesL", function() { return LinesL; });
/* harmony import */ var _Base_Base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base/Base.js */ "./app/ChartController/Base/Base.js");
/* harmony import */ var _Item_Lines_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Item/Lines.js */ "./app/ChartController/Item/Lines.js");




class Lines extends _Base_Base_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(ctx, width, height, marginTop, data,
        drawPopup, animateMarking,
    ) {
        super(ctx, width, height, marginTop, data, drawPopup);

        this.lineWidth = 3;

        data.valuesY.forEach((item, i) =>
            this.items.push(new _Item_Lines_js__WEBPACK_IMPORTED_MODULE_1__["default"](
                this.ctx, height, marginTop, data.colors[i],
                item, this.lineWidth)
            )
        );
        this.animateMarking = animateMarking;

        this.verticalLineOpacity = .5;

        this.circlesAnim = {
            curV: 0,
            newV: null,
            lastSavedNewV: null,
            animBias: 0,
            animDuration: 100,
        };

    }

    updateVerticalBounds(l, r) {
        let res = this.defineVerticalBounds(l, r);
        this.axisYmax.newV = res.max;
        this.axisYmin.newV = res.min;
    }

    defineVerticalBounds(l, r) {
        let [maxs, mins] = [[], []];

        this.checks.forEach((item, i) => {
            if (item === false) return;
            let slice = this.data.valuesY[i].slice(l, r);
            maxs.push(Math.max(...slice));
            mins.push(Math.min(...slice));
        });
        //тут можно ловить инфинити, когда чеков 0, но оно нигде не вредит

        return { max: Math.max(...maxs), min: Math.min(...mins) };
    }

    draw(shouldUpdate, coordsX, leftBoundIndex, rightBoundIndex) {
        let input = false;

        if (shouldUpdate) {
            this.updateDT();

            let res1 = this.animate(this.axisYmax);
            let res2 = this.animate(this.axisYmin);

            if (res1 === 2 || res2 === 2) {
                this.animateMarking(this.axisYAnimationDuration,
                    this.axisYmax.newV, this.axisYmin.newV);
            }

            input = !!res1 || !!res2 || input;

            this.items.forEach(item =>
                item.updateCoordsY(
                    leftBoundIndex, rightBoundIndex,
                    this.axisYmax.curV, this.axisYmin.curV)
            );
        }

        input = this.items.reduce((accum, item) => {
            return item.draw(coordsX) || accum;
        }, false) || input;

        if (this.isHightlight === true) {
            if (window.sliderDown !== true) {
                input = !!this.animate(this.circlesAnim) || input;
                this.items.forEach(item =>
                    item.drawCircleInPoint(this.circlesAnim.curV, coordsX)
                );
            }
            this.drawVerticalLine();
        } else {
            this.circlesAnim.lastSavedNewV = null;
        }

        return input;
    }

    highlightItem(x, y, coordsX, scaleX, leftBoundIndex) {
        this.focusX = x; //зачем?
        this.focusY = y;

        this.isHightlight = true;
        let index = Math.floor((x - coordsX[0]) / scaleX); //вместо round
        index < 0 && (index = 0);

        this.circlesAnim.newV = coordsX[index];

        let dockets = this.items.reduce((accum, item, i) => {
            if (this.checks[i] === true) {
                accum.push({
                    name: this.data.names[i],
                    value: this.prepareValue(this.data.valuesY[i][index + leftBoundIndex]),
                });
            } else {
                //не забыть
                accum.push({ name: "", value: "", });
            }
            return accum;
        }, []);

        this.drawPopup(index, dockets);
    }

    // функция должна взять старый сохраненный X0, по индексу вычислить новый X, 
    // произвести анимацию от X0 к X на каждом шаге отрисовки, заставляя линию перерисовываться


}

// буду делать наследование с немного разным функционалом
class LinesL extends _Base_Base_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(ctx, width, height, marginTop, data) {
        super(ctx, width, height, marginTop, data);

        this.lineWidth = 2;

        data.valuesY.forEach((item, i) =>
            this.items.push(new _Item_Lines_js__WEBPACK_IMPORTED_MODULE_1__["default"](
                this.ctx, height, marginTop, data.colors[i],
                item, this.lineWidth)
            )
        );

    }

    updateVerticalBounds(l, r) {
        let res = this.defineVerticalBounds(l, r);
        this.axisYmax.newV = res.max;
        this.axisYmin.newV = res.min;
    }

    defineVerticalBounds(l, r) {
        let [maxs, mins] = [[], []];

        this.checks.forEach((item, i) => {
            if (item === false) return;
            let slice = this.data.valuesY[i].slice(l, r);
            maxs.push(Math.max(...slice));
            mins.push(Math.min(...slice));
        });

        return { max: Math.max(...maxs), min: Math.min(...mins) };
    }

    draw(shouldUpdate, coordsX, leftBoundIndex, rightBoundIndex) {
        let input = false;
        this.updateDT();

        let res1 = !!this.animate(this.axisYmax);
        let res2 = !!this.animate(this.axisYmin);
        input = !!res1 || !!res2 || input;

        this.items.forEach(item =>
            item.updateCoordsY(
                leftBoundIndex, rightBoundIndex,
                this.axisYmax.curV, this.axisYmin.curV)
        );

        input = this.items.reduce((accum, item) => {
            return item.draw(coordsX) || accum;
        }, false) || input;

        return input;
    }

}


/***/ }),

/***/ "./app/ChartController/Lines2Y.js":
/*!****************************************!*\
  !*** ./app/ChartController/Lines2Y.js ***!
  \****************************************/
/*! exports provided: Lines2Y, Lines2YL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Lines2Y", function() { return Lines2Y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Lines2YL", function() { return Lines2YL; });
/* harmony import */ var _Base_Base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base/Base.js */ "./app/ChartController/Base/Base.js");
/* harmony import */ var _Item_Lines_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Item/Lines.js */ "./app/ChartController/Item/Lines.js");



class Lines2Y extends _Base_Base_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(ctx, width, height, marginTop, data,
        drawPopup, animateMarking
    ) {
        super(ctx, width, height, marginTop, data, drawPopup);

        this.lineWidth = 3;

        for (let i = 0; i < 2; i++) {
            let vY = data.valuesY[i];
            this.items.push(new _Item_Lines_js__WEBPACK_IMPORTED_MODULE_1__["default"](
                this.ctx, height, marginTop, data.colors[i],
                vY, this.lineWidth)
            );
        }

        this.animateMarking = animateMarking;

        this.verticalLineOpacity = .5;

        this.axisYmax2 = {
            curV: 0,
            newV: null,
            lastSavedNewV: null,
            animBias: 0,
            animDuration: this.axisYAnimationDuration
        };

        this.axisYmin2 = {
            curV: 0,
            newV: null,
            lastSavedNewV: null,
            animBias: 0,
            animDuration: this.axisYAnimationDuration
        };

        this.circlesAnim = {
            curV: 0,
            newV: null,
            lastSavedNewV: null,
            animBias: 0,
            animDuration: 100,
        };
    }

    updateVerticalBounds(l, r) {
        let res = this.defineVerticalBounds(l, r);

        this.axisYmax.newV = res.max;
        this.axisYmin.newV = res.min;
        this.axisYmax2.newV = res.max2;
        this.axisYmin2.newV = res.min2;
    }

    defineVerticalBounds(l, r) {
        let slice = this.data.valuesY[0].slice(l, r);
        let slice2 = this.data.valuesY[1].slice(l, r);

        return {
            max: Math.max(...slice),
            min: Math.min(...slice),
            max2: Math.max(...slice2),
            min2: Math.min(...slice2)
        };
    }

    draw(shouldUpdate, coordsX, leftBoundIndex, rightBoundIndex) {
        let input = false;
        if (shouldUpdate) {
            this.updateDT();

            let res1 = this.animate(this.axisYmax);
            let res2 = this.animate(this.axisYmin);
            let res3 = this.animate(this.axisYmax2);
            let res4 = this.animate(this.axisYmin2);

            input = !!res1 || !!res2 || !!res3 || !!res4 || input;

            if (res1 === 2 || res2 === 2) {
                this.animateMarking(this.axisYAnimationDuration,
                    this.axisYmax.newV, this.axisYmin.newV, 0);
            }
            if (res3 === 2 || res4 === 2) {
                this.animateMarking(this.axisYAnimationDuration,
                    this.axisYmax2.newV, this.axisYmin2.newV, 1);
            }

            this.items[0].updateCoordsY(
                leftBoundIndex, rightBoundIndex,
                this.axisYmax.curV, this.axisYmin.curV);
            this.items[1].updateCoordsY(
                leftBoundIndex, rightBoundIndex,
                this.axisYmax2.curV, this.axisYmin2.curV);
        }

        input = this.items.reduce((accum, item) => {
            return item.draw(coordsX) || accum;
        }, false) || input;

        if (this.isHightlight === true) {
            if (window.sliderDown !== true) {
                input = !!this.animate(this.circlesAnim) || input;
                this.items.forEach(item =>
                    item.drawCircleInPoint(this.circlesAnim.curV, coordsX)
                );
            }
            this.drawVerticalLine();
        } else {
            this.circlesAnim.lastSavedNewV = null;
        }

        return input;
    }

    highlightItem(x, y, coordsX, scaleX, leftBoundIndex) {
        this.focusX = x; //зачем?
        this.focusY = y;

        this.isHightlight = true;
        let index = Math.floor((x - coordsX[0]) / scaleX); //вместо round
        index < 0 && (index = 0);

        this.circlesAnim.newV = coordsX[index];

        let dockets = this.items.reduce((accum, item, i) => {
            if (this.checks[i] === true) {
                accum.push({
                    name: this.data.names[i],
                    value: this.prepareValue(this.data.valuesY[i][index + leftBoundIndex]),
                });
            } else {
                accum.push({ name: "", value: "", });
            }
            return accum;
        }, []);

        this.drawPopup(index, dockets);
    }


}


class Lines2YL extends _Base_Base_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(ctx, width, height, marginTop, data,
        drawPopup
    ) {
        super(ctx, width, height, marginTop, data, drawPopup);

        this.linesWidth = 2;

        for (let i = 0; i < 2; i++) {
            let vY = data.valuesY[i];
            this.items.push(new _Item_Lines_js__WEBPACK_IMPORTED_MODULE_1__["default"](
                this.ctx, height, marginTop, data.colors[i],
                vY, this.lineWidth)
            );
        }

        this.axisYmax2 = {
            curV: 0,
            newV: null,
            lastSavedNewV: null,
            animBias: 0,
            animDuration: this.axisYAnimationDuration
        };

        this.axisYmin2 = {
            curV: 0,
            newV: null,
            lastSavedNewV: null,
            animBias: 0,
            animDuration: this.axisYAnimationDuration
        };
    }

    updateVerticalBounds(l, r) {
        let res = this.defineVerticalBounds(l, r);

        this.axisYmax.newV = res.max;
        this.axisYmin.newV = res.min;
        this.axisYmax2.newV = res.max2;
        this.axisYmin2.newV = res.min2;
    }

    defineVerticalBounds(l, r) {
        let slice = this.data.valuesY[0].slice(l, r);
        let slice2 = this.data.valuesY[1].slice(l, r);

        return {
            max: Math.max(...slice),
            min: Math.min(...slice),
            max2: Math.max(...slice2),
            min2: Math.min(...slice2)
        };
    }

    draw(shouldUpdate, coordsX, leftBoundIndex, rightBoundIndex) {
        let input = false;
        this.updateDT();

        let res1 = this.animate(this.axisYmax);
        let res2 = this.animate(this.axisYmin);
        let res3 = this.animate(this.axisYmax2);
        let res4 = this.animate(this.axisYmin2);

        input = !!res1 || !!res2 || !!res3 || !!res4 || input;

        this.items[0].updateCoordsY(
            leftBoundIndex, rightBoundIndex,
            this.axisYmax.curV, this.axisYmin.curV);
        this.items[1].updateCoordsY(
            leftBoundIndex, rightBoundIndex,
            this.axisYmax2.curV, this.axisYmin2.curV);

        input = this.items.reduce((accum, item) => {
            return item.draw(coordsX) || accum;
        }, false) || input;

        return input;
    }

}


/***/ }),

/***/ "./app/ChartController/Percentage.js":
/*!*******************************************!*\
  !*** ./app/ChartController/Percentage.js ***!
  \*******************************************/
/*! exports provided: Percentage, PercentageL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Percentage", function() { return Percentage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PercentageL", function() { return PercentageL; });
/* harmony import */ var _Base_Base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base/Base.js */ "./app/ChartController/Base/Base.js");
/* harmony import */ var _Item_Percentage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Item/Percentage.js */ "./app/ChartController/Item/Percentage.js");



class PercentageBase extends _Base_Base_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(ctx, width, height, marginTop, data,
        drawPopup
    ) {
        super(ctx, width, height, marginTop, data, drawPopup);

        data.valuesY.forEach((item, i) =>
            this.items.push(new _Item_Percentage_js__WEBPACK_IMPORTED_MODULE_1__["default"](
                this.ctx,
                height, marginTop,
                data.colors[i],
                item
            ))
        );

        this.columnMode = false;
    }

    // метод, инициирующий анимацию масштаба по оси Y
    updateVerticalBounds(leftBoundIndex, rightBoundIndex) {
        // this.amounts = this.calcAmounts(leftBoundIndex, rightBoundIndex, true);
    }

    calcOneAmount(index) {
        let sum = 0;
        this.data.valuesY.forEach((valuesY, i) => {
            sum += valuesY[index] * Number(this.checks[i]);
        });
        return sum;
    }

    calcAmounts(leftBoundIndex, rightBoundIndex, forward = true) {
        let range = rightBoundIndex - leftBoundIndex + 1;
        range < 0 && (range = 0);

        let accum = new Array(range).fill(0);

        return forward ?
            this.data.valuesY.reduce(calcAmountsForward.bind(this), accum) :
            this.data.valuesY.reduce(calcAmounts.bind(this), accum);

        function calcAmounts(accum, valuesYItem, i) {
            let slice = valuesYItem.slice(leftBoundIndex, rightBoundIndex + 1);
            slice.forEach((val, j) => {
                accum[j] += val * this.items[i].visibility;
            });

            return accum;
        }

        function calcAmountsForward(accum, valuesYItem, i) {
            let slice = valuesYItem.slice(leftBoundIndex, rightBoundIndex + 1);
            slice.forEach((val, j) => {
                accum[j] += val * Number(this.checks[i]);
            });

            return accum;
        }
    }

    // отрисовка
    draw(shouldUpdate, coordsX, leftBoundIndex, rightBoundIndex) {
        let l = this.items.length - 1;

        if (shouldUpdate) {
            let amounts = this.calcAmounts(leftBoundIndex, rightBoundIndex, false);
            let curAmounts = new Array(amounts.length).fill(0);
            for (let i = 0; i < this.items.length; i++) {
                curAmounts = this.items[l - i].updateCoordsY(
                    leftBoundIndex, rightBoundIndex,
                    curAmounts, amounts);
            }
        }

        let input = false;

        for (let i = 0; i < this.items.length; i++) {
            input = this.items[l - i].draw(coordsX, this.columnMode, this.width) || input;
        }
        this.isHightlight === true && this.drawVerticalLine(coordsX);

        return input;
    }

    highlightItem(x, y, coordsX, scaleX, leftBoundIndex) {
        this.focusX = x; //зачем?
        this.focusY = y;

        this.isHightlight = true;
        let index = Math.floor((x - coordsX[0]) / scaleX); //вместо round
        index < 0 && (index = 0);

        this.highlightedIndex = index;

        let amount = this.calcOneAmount(index + leftBoundIndex);
        let dockets = this.items.reduce((accum, item, i) => {
            if (this.checks[i] === true) {
                let v = this.data.valuesY[i][index + leftBoundIndex];
                accum.push({
                    percentage: Math.round(v / amount * 100) + "%",
                    name: this.data.names[i],
                    value: this.prepareValue(v),
                });
            } else {
                accum.push({ percentage: "", name: "", value: "" });
            }
            return accum;
        }, []);

        this.drawPopup(index, dockets);
    }

    drawVerticalLine(coordsX) {
        let ctx = this.ctx;
        ctx.strokeStyle = window.theme.gridLines;
        ctx.lineWidth = 1;
        ctx.beginPath();
        let x = coordsX[this.highlightedIndex];
        ctx.moveTo(x, 0);
        ctx.lineTo(x, this.chartHeight);
        ctx.stroke();
    }

}


class Percentage extends PercentageBase {
    constructor(ctx, width, height, marginTop, data,
        drawPopup
    ) {
        super(ctx, width, height, marginTop, data, drawPopup);
        this.axisYmax.newV = 100;
        this.axisYmin.newV = 0;
    }
}

class PercentageL extends PercentageBase {
    constructor(ctx, width, height, marginTop, data) {
        super(ctx, width, height, marginTop, data);

    }
}

/***/ }),

/***/ "./app/ChartController/Pie.js":
/*!************************************!*\
  !*** ./app/ChartController/Pie.js ***!
  \************************************/
/*! exports provided: Pie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pie", function() { return Pie; });
/* harmony import */ var _Item_Pie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Item/Pie.js */ "./app/ChartController/Item/Pie.js");


class Pie {
    constructor(ctx, width, height, marginTop, data,
        drawPopup) {
        this.ctx = ctx;

        this.width = width;
        this.height = height;
        this.marginTop = marginTop;

        this.data = data;

        this.drawPopup = drawPopup;

        this.radius = this.height / 2;

        this.centerX = this.width / 2;
        this.centerY = this.height / 2 + this.marginTop;

        this.animationDuration = 200;

        this.checks = new Array(this.data.valuesY.length).fill(true);

        this.items = [];
        data.valuesY.forEach((item, i) =>
            this.items.push(new _Item_Pie_js__WEBPACK_IMPORTED_MODULE_0__["default"](
                this.ctx,
                this.centerX, this.centerY, this.radius,
                data.colors[i]
            ))
        );

        this.total = 0;
        this.pieSlicesTotal = [];

        this.isHightlight = false;
        this.animationHappens = false;
    }

    onResize(width, height, marginTop) {
        this.height = height;
        this.marginTop = marginTop;
        this.width = width;

        this.radius = this.height / 2;

        this.centerX = this.width / 2;
        this.centerY = this.height / 2 + this.marginTop;

        this.items.forEach(item => {
            item.centerX0 = this.centerX;
            item.centerY0 = this.centerY;
            item.centerX = this.centerX;
            item.centerY = this.centerY;

            item.radius = this.radius;
            item.maxLabelSize = this.radius * 2 / 5;
        });

        this.draw(true);
    }


    updateVerticalBounds(leftBoundIndex, rightBoundIndex) {
        this.leftBoundIndex = leftBoundIndex;
        this.rightBoundIndex = rightBoundIndex;
    }

    checkEnteringTheCircle(x, y) {
        return (
            (x - this.centerX) * (x - this.centerX) +
            (y - this.centerY) * (y - this.centerY)
            <= this.radius * this.radius
        );
    }

    highlightItem(x, y) {
        this.focusX = x;
        this.focusY = y;

        if (this.checkEnteringTheCircle(x, y)) {
            this.isHightlight = true;

            let atan = Math.atan2((y - this.centerY), (x - this.centerX));
            atan < 0 && (atan += 2 * Math.PI);
            let dockets = new Array(this.items.length).fill({ name: "", value: "" });

            for (let i = 0; i < this.items.length; i++) {
                let item = this.items[i];

                if (atan > this.items[i].startAngle && atan < this.items[i].endAngle) {
                    dockets[i] = {
                        name: this.data.names[i],
                        value: this.prepareValue(this.items[i].value.toFixed()),
                    };

                    // let angle = item.startAngle - (item.startAngle - item.endAngle) / 2;
                    // let popupX = item.centerX + item.radius / 2 * Math.cos(angle);
                    // let popupY = item.centerY + item.radius / 2 * Math.sin(angle);

                    this.drawPopup(i, dockets);
                    let count = 0;
                    for (let i = 0; i < this.checks.length; ++i) {
                        if (this.checks[i] == true) count++;
                    }
                    count === 1 || item.initPushAnimation(true, this.animationDuration);
                } else {
                    item.initPushAnimation(false, this.animationDuration);
                }
            }
        } else {
            return false;
        }
    }


    prepareValue(value) {
        return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }

    unhighlight() {
        this.items.forEach(item => {
            item.initPushAnimation(false, this.animationDuration);
        });
        this.isHightlight = false;
    }

    animateVisibility(index, state) {
        this.items[index].initVisibilityAnimation(state, this.animationDuration);
        this.checks[index] = state;
        this.unhighlight();
    }

    //считать с учетом кусочка
    calcTotals() {
        this.pieSlicesTotal = [];

        for (let i = 0; i < this.data.valuesY.length; i++) {
            let slicesValuesYItem = this.data.valuesY[i].slice(
                this.leftBoundIndex, this.rightBoundIndex + 1
            );

            let sum = 0;
            for (let j = 0; j < slicesValuesYItem.length; j++) {
                sum += slicesValuesYItem[j] *
                    this.items[i].visibility;
            }

            this.pieSlicesTotal[i] = Math.floor(sum / this.data.freq);
        }

        return this.calcSumInArray(this.pieSlicesTotal);
    }

    calcSumInArray(array) {
        return array.reduce((accum, item) => {
            return (accum += item);
        }, 0);
    }

    draw(shouldUpdate) {
        if (shouldUpdate) {
            let total = this.calcTotals();
            this.items.reduce((startAngle, item, i) =>
                item.update(startAngle, this.pieSlicesTotal[i], total),
                0);
        }

        return this.items.reduce((accum, item) => {
            return item.draw() || accum;
        }, false);
    }

}


/***/ }),

/***/ "./app/ChartController/Stacked.js":
/*!****************************************!*\
  !*** ./app/ChartController/Stacked.js ***!
  \****************************************/
/*! exports provided: Stacked, StackedL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stacked", function() { return Stacked; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StackedL", function() { return StackedL; });
/* harmony import */ var _Base_Base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base/Base.js */ "./app/ChartController/Base/Base.js");
/* harmony import */ var _Item_Stacked_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Item/Stacked.js */ "./app/ChartController/Item/Stacked.js");




class StackedBase extends _Base_Base_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(ctx, width, height, marginTop, data,
        drawPopup
    ) {
        super(ctx, width, height, marginTop, data, drawPopup);

        data.valuesY.forEach((item, i) =>
            this.items.push(new _Item_Stacked_js__WEBPACK_IMPORTED_MODULE_1__["default"](
                this.ctx,
                height, marginTop, data.colors[i],
                item
            ))
        );

        this.lastAction = 0;
    }

    updateVerticalBounds(l, r, action = 0) {
        let res = this.defineVerticalBounds(l, r);
        this.axisYmax.newV = res.max;
        this.lastAction = action;
    }

    defineVerticalBounds(l, r) {
        let a = this.calcAmounts(l, r, true);
        return { amounts: a, max: Math.max(...a), min: 0 };
    }

    calcOneAmount(index) {
        let sum = 0;
        this.data.valuesY.forEach((valuesY, i) => {
            sum += valuesY[index] * Number(this.checks[i]);
        });
        return sum;
    }

    calcAmounts(leftBoundIndex, rightBoundIndex, forward = true) {
        let range = rightBoundIndex - leftBoundIndex + 1;
        range < 0 && (range = 0);

        let accum = new Array(range).fill(0);

        return forward ?
            this.data.valuesY.reduce(calcAmountsForward.bind(this), accum) :
            this.data.valuesY.reduce(calcAmounts.bind(this), accum);

        function calcAmounts(accum, valuesYItem, i) {
            let slice = valuesYItem.slice(leftBoundIndex, rightBoundIndex + 1);
            slice.forEach((val, j) => {
                accum[j] += val * this.items[i].visibility;
            });

            return accum;
        }

        function calcAmountsForward(accum, valuesYItem, i) {
            let slice = valuesYItem.slice(leftBoundIndex, rightBoundIndex + 1);
            slice.forEach((val, j) => {
                accum[j] += val * Number(this.checks[i]);
            });

            return accum;
        }
    }

    // отрисовка
    draw(shouldUpdate, coordsX, leftBoundIndex, rightBoundIndex) {
        let input = false;
        let l = this.items.length - 1;

        if (shouldUpdate) {
            this.updateDT();

            let res = this.animate(this.axisYmax);

            if (res === 2) {
                this.animateMarking(this.axisYAnimationDuration,
                    this.axisYmax.newV, 0);
            }

            input = !!res || input;

            let amounts = this.calcAmounts(leftBoundIndex, rightBoundIndex, false),
                max = this.lastAction === 0 ? this.axisYmax.curV : Math.max(...amounts);
            for (let i = 0; i < this.items.length; i++) {
                amounts = this.items[l - i].updateCoordsY(
                    leftBoundIndex, rightBoundIndex,
                    max, amounts);
            }
        }

        let scaleX = coordsX[1] - coordsX[0];
        let lastX = coordsX[coordsX.length - 1] + scaleX;

        for (let i = 0; i < this.items.length; i++) {
            input = this.items[l - i].draw(coordsX, lastX) || input;
        }

        this.isHightlight === true && this.drawMask(coordsX, scaleX);

        return input;
    }
}

class Stacked extends StackedBase {
    constructor(ctx, width, height, marginTop, data,
        drawPopup, animateMarking
    ) {
        super(ctx, width, height, marginTop, data, drawPopup);

        this.animateMarking = animateMarking;
    }


    highlightItem(x, y, coordsX, scaleX, leftBoundIndex) {
        this.focusX = x; //зачем?
        this.focusY = y;

        this.isHightlight = true;
        let index = Math.floor((x - coordsX[0]) / scaleX); //вместо round
        index < 0 && (index = 0);

        this.highlightedIndex = index;

        let amount = this.calcOneAmount(index + leftBoundIndex);
        this.highlightedAmount = amount;
        let dockets = this.items.reduce((accum, item, i) => {
            if (this.checks[i] === true) {
                accum.push({
                    name: this.data.names[i],
                    value: this.prepareValue(this.data.valuesY[i][index + leftBoundIndex]),
                });
            } else {
                //не забыть
                accum.push({ name: "", value: "", });
            }
            return accum;
        }, []);

        dockets.push({ name: "All", value: this.prepareValue(amount) });

        this.drawPopup(index, dockets);
    }

    //no rep!!! но можно сделать, чтобы повторялось, если отправлять аргументом y ?
    drawMask(coordsX, scaleX) {
        let ctx = this.ctx;

        let i = this.highlightedIndex;
        ctx.beginPath();

        //посылать аргументом?
        let y = this.height - this.highlightedAmount *
            this.height / this.axisYmax.curV +
            this.marginTop;

        ctx.moveTo(0, 0);
        ctx.lineTo(0, this.height + this.marginTop);
        ctx.lineTo(coordsX[i], this.height + this.marginTop);
        ctx.lineTo(coordsX[i], y);
        ctx.lineTo(coordsX[i] + scaleX, y);
        ctx.lineTo(coordsX[i] + scaleX, this.height + this.marginTop);
        ctx.lineTo(this.width, this.height + this.marginTop);
        ctx.lineTo(this.width, 0);

        ctx.fillStyle = window.theme.highlightMask;
        ctx.fill();
    }

}

// буду делать наследование с немного разным функционалом
class StackedL extends StackedBase {
    constructor(ctx, width, height, marginTop, data) {
        super(ctx, width, height, marginTop, data);
    }
}


/***/ }),

/***/ "./app/Checks.js":
/*!***********************!*\
  !*** ./app/Checks.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Checks; });
class Checks {
    constructor(parentHTML, data, onChange) {
        this.parentHTML = parentHTML;

        this.html = parentHTML.appendChild(document.createElement("div"));
        this.html.className = "check";

        this.items = [];
        data.names.forEach((name, i) => {
            this.items.push(new CheckBox(
                this.html, data.colors[i], name, i,
                onChange
            ));
        });
        setTimeout(() =>
            this.items.forEach(item => {
                item.html.style.opacity = 1;
                item.html.style.transform = "perspective(10px) translateZ(0)";
            }), 0);

        this.events = ('ontouchstart' in window) ?
            {
                down: "ontouchstart",
                up: "ontouchend",
            } :
            {
                down: "onmousedown",
                up: "onmouseup",
            };

        this.html[this.events.down] = this.handleBehaviour.bind(this);
    }

    handleBehaviour(e) {
        let target = e.target;
        if (target === this.html) return;
        while (!target.classList.contains("checkBox")) {
            target = target.parentNode;
        }
        let index = +target.getAttribute("id");

        let t = setTimeout(() => {
            this.html[this.events.up] = null;
            this.delegateGroup(index);
        }, 500);

        this.html[this.events.up] = () => {
            clearTimeout(t);
            this.delegate(index);
            this.html[this.events.up] = null;
        }
    }

    delegateGroup(index) {
        if (this.isOneActive(index)) {
            this.items.forEach(item => item.react(true));
        } else {
            this.items.forEach((item, i) => {
                if (index === i) {
                    item.react(true);
                } else {
                    item.react(false);
                }
            });
        }
    }

    delegate(index) {
        if (this.isOneActive(index)) {
            this.items[index].shake();
            return;
        }

        let newState = !this.items[index].state;
        this.items[index].react(newState);
    }

    isOneActive(index) {
        let sum;
        sum = [].reduce.call(this.html.childNodes, (accum, item, i) => {
            return index === i ? accum : accum += +item.dataset.isActive;
        }, 0);
        return sum === 0;
    }

    clear() {
        this.items.forEach(item => {
            item.html.style.opacity = 0;
            item.html.style.transform = "perspective(10px) translateZ(-10px)";
        });
        setTimeout(() => this.html.remove(), 200);
    }
}


class CheckBox {
    constructor(parentHTML, color, name, index, onChange) {
        this.name = name;
        this.color = color;

        this.parentHTML = parentHTML;

        this.buildHTML(index);

        this.state = true;

        this.index = index;
        this.onChange = onChange;

        this.html.dataset.isActive = 1;
    }

    shake() {
        let c = this.html.classList;
        if (c.contains("shakingBlock")) return;
        c.add("shakingBlock");
        setTimeout(() => c.remove("shakingBlock"), 800);
    }

    react(state) {
        this.html.dataset.isActive = +state;
        this.state = state;
        this.onChange(this.index, state);
        this.reDraw(state);
    }

    reDraw(state) {
        if (state) {
            this.html.style.background = this.color;
            this.label.style.color = "white";
            this.stateMarkHTML.style.transform = "scale(1)";
        } else {
            this.html.style.background = "rgba(0,0,0,0)"
            this.label.style.color = this.color;
            this.stateMarkHTML.style.transform = "scale(0)";
        }
    }

    buildHTML(id) {
        let parentHTML = this.parentHTML;
        this.html = parentHTML.appendChild(document.createElement("div"));
        let h = this.html;
        h.className = "checkBox";
        h.style.background = this.color;
        h.style.borderColor = this.color;
        h.id = id;

        this.stateMarkHTML = h.appendChild(document.createElementNS('http://www.w3.org/2000/svg', "svg"));
        let a = this.stateMarkHTML;
        a.setAttribute("viewBox", "0 0 46 46");
        a.setAttribute("class", "checkMark");
        let path = a.appendChild(document.createElementNS('http://www.w3.org/2000/svg', "path"));
        path.setAttribute("d",
            "M20.687,38.332c-2.072,2.072-5.434,2.072-7.505,0L1.554,26.704c-2.072-2.071-2.072-5.433,0-7.504    c2.071-2.072,5.433-2.072,7.505,0l6.928,6.927c0.523,0.522,1.372,0.522,1.896,0L36.642,7.368c2.071-2.072,5.433-2.072,7.505,0    c0.995,0.995,1.554,2.345,1.554,3.752c0,1.407-0.559,2.757-1.554,3.752L20.687,38.332z"
        );

        this.label = h.appendChild(document.createElement("div"));
        this.label.textContent = this.name;
        this.label.className = "checkLabel";

    }

}

/***/ }),

/***/ "./app/MainController/Base/Base.js":
/*!*****************************************!*\
  !*** ./app/MainController/Base/Base.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
class Base {
    constructor(type, ctx, width, height, sliderK, data, boxHTML) {
        this.chartType = type;

        this.ctx = ctx;

        this.width = width;
        this.height = height;

        this.sliderK = sliderK;
        this.sliderWidth = width * sliderK;

        this.data = data;

        this.boxHTML = boxHTML;

        this.animationHappens = true;
    }

    onResize(width, height) {
        this.width = width;
        this.height = height;
        this.sliderWidth = this.sliderK * width;

        this.chartHeight = this.height * this.ratio[1] / 100,
            this.chartMarginTop = this.height * this.ratio[0] / 100;

        this.chartController.onResize(this.width, this.chartHeight, this.chartMarginTop);
    }

    onTumblerUpdate(tumblerStart, tumblerWidth, flagHeaderUpdate) {
        this.shouldChartsUpdate = true;

        this.tumblerStart = tumblerStart;
        this.tumblerWidth = tumblerWidth;

        let valuesNumber = this.data.valuesY[0].length,
            n = valuesNumber - 1;

        this.leftBoundIndex = Math.ceil(n * tumblerStart / this.sliderWidth);
        this.rightBoundIndex = Math.floor((n * (tumblerStart + tumblerWidth)) / this.sliderWidth);
        this.rightBoundIndex < this.leftBoundIndex && (this.leftBoundIndex = this.rightBoundIndex);

        this.transitionHappens === true ||
            this.chartController.updateVerticalBounds(this.leftBoundIndex, this.rightBoundIndex);

        flagHeaderUpdate && this.updateHeaderDate(this.defineHeaderDateLabel(
            this.leftBoundIndex, this.rightBoundIndex), this.zoomed);

        this.scaleX = (this.width / valuesNumber) * (this.sliderWidth / tumblerWidth);
    }

    setChecks() {
        [].forEach.call(
            this.boxHTML.querySelectorAll(".checkBox"),
            (item, i) => {
                let state = !!(parseInt(item.dataset.isActive));
                if (state === false) {
                    this.chartController.items[i].visibility = 0;
                    this.chartController.checks[i] = false;
                }
            }
        );
    }

    calcCoordsX(leftBoundIndex, rightBoundIndex, scaleX, offset) {
        let coordsX = [];

        for (let i = 0; i < rightBoundIndex - leftBoundIndex + 1; i++) {
            let x0 = (this.data.valuesNumber - leftBoundIndex - i) * scaleX,
                x = this.width - x0 + offset;
            coordsX.push(Math.round(x * 100) / 100);
        }

        return coordsX;
    }

    onCheckBoxesStateChange(index, state) {
        if (this.markings) {
            if (this.chartType === "lines2Y") {
                this.markings[index].initVisibilityAnimation(state);
                if (index === 0) {
                    this.markings[1].setStaticVisibility(!state);
                }
            }
        }
        this.chartController.animateVisibility(index, state);
        this.chartController.updateVerticalBounds(this.leftBoundIndex, this.rightBoundIndex, 1);

        this.shouldChartsUpdate = true;
        this.animationHappens || this.draw();
    }

    animate(animationHappens) {
        if (animationHappens) {
            this.animationHappens = true;
        } else {
            this.shouldChartsUpdate = false;
            this.animationHappens = false;
            return;
        }

        this.animationHappens && requestAnimationFrame(() => this.draw());
    }

    updateDT() {
        let now = Date.now();
        this.dt = now - this.lastTime;
        this.lastTime = now;
    }


    //всегда отнимаем to - xFrom
    initAppearAnimation(xFrom, dur) {
        this.updateDT();
        this.dur = dur;
        this.durProgress = 0;

        this.ctx.globalAlpha = 0;

        this.transitionHappens = true;
        this.animate(true);

        this.transitionStepOfS = (this.tumblerStart - xFrom.tumblerStart) / dur;
        this.transitionDiffOfTW = this.tumblerWidth - xFrom.tumblerWidth; //нужен для определения прозрачности
        this.transitionStepOfTW = this.transitionDiffOfTW / dur;

        this.zoomDir = Math.sign(this.transitionStepOfTW);

        //это по сути to
        this.targetStart = this.tumblerStart;
        this.targetTumblerWidth = this.tumblerWidth;

        this.tumblerStart = xFrom.tumblerStart;
        this.tumblerWidth = xFrom.tumblerWidth;

        requestAnimationFrame(() =>
            this.animateAppear());
    }

    animateAppear() {
        this.updateDT();
        this.durProgress += this.dt;

        if (this.durProgress >= this.dur) {
            this.ctx.globalAlpha = 1;
            this.tumblerStart = this.targetStart;
            this.tumblerWidth = this.targetTumblerWidth;
            this.transitionHappens = false;
            this.onTumblerUpdate(this.tumblerStart, this.tumblerWidth, false);

            delete this.targetStart;
            delete this.targetTumblerWidth;
            delete this.zoomDir;
        } else {
            let k1 = this.transitionStepOfS * this.dt,
                k2 = this.transitionStepOfTW * this.dt;

            let ratio = (this.targetTumblerWidth - this.tumblerWidth) / this.transitionDiffOfTW;
            this.ctx.globalAlpha = 1 - ratio;

            this.onTumblerUpdate(this.tumblerStart + k1, this.tumblerWidth + k2, false);


            requestAnimationFrame(() =>
                this.animateAppear());
        }
    }


    initDisappearAnimation(xTo, dur, resolve) {
        this.updateDT();
        this.dur = dur;
        this.durProgress = 0;

        this.transitionHappens = true;
        this.animate(true);

        this.transitionStepOfS = (xTo.tumblerStart - this.tumblerStart) / dur;
        this.transitionDiffOfTW = xTo.tumblerWidth - this.tumblerWidth;
        this.transitionStepOfTW = this.transitionDiffOfTW / dur;

        this.zoomDir = Math.sign(this.transitionStepOfTW);
        this.zoomOffset = Math.sign(this.transitionStepOfTW);

        this.targetStart = xTo.tumblerStart;
        this.targetTumblerWidth = xTo.tumblerWidth;

        requestAnimationFrame(() =>
            this.animateDisappear(resolve));
    }

    animateDisappear(resolve) {
        this.updateDT();
        this.durProgress += this.dt;

        if (this.durProgress >= this.dur) {
            this.ctx.globalAlpha = 0;
            resolve(true);
        } else {
            let k1 = this.transitionStepOfS * this.dt,
                k2 = this.transitionStepOfTW * this.dt;

            let ratio = (this.targetTumblerWidth - this.tumblerWidth) / this.transitionDiffOfTW;
            this.ctx.globalAlpha = ratio;

            this.onTumblerUpdate(this.tumblerStart + k1, this.tumblerWidth + k2, false);

            requestAnimationFrame(() =>
                this.animateDisappear(resolve));
        }
    }

}

/***/ }),

/***/ "./app/MainController/Lower.js":
/*!*************************************!*\
  !*** ./app/MainController/Lower.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Lower; });
/* harmony import */ var _roundRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../roundRect.js */ "./app/roundRect.js");
/* harmony import */ var _Base_Base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base/Base.js */ "./app/MainController/Base/Base.js");
/* harmony import */ var _ChartController_Lines_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ChartController/Lines.js */ "./app/ChartController/Lines.js");
/* harmony import */ var _ChartController_Lines2Y_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ChartController/Lines2Y.js */ "./app/ChartController/Lines2Y.js");
/* harmony import */ var _ChartController_Daily_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ChartController/Daily.js */ "./app/ChartController/Daily.js");
/* harmony import */ var _ChartController_Stacked_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ChartController/Stacked.js */ "./app/ChartController/Stacked.js");
/* harmony import */ var _ChartController_Percentage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ChartController/Percentage.js */ "./app/ChartController/Percentage.js");










class Lower extends _Base_Base_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(type, ctx, width, height, sliderK, data, tumblerStart, tumblerWidth, boxHTML) {
        super(type, ctx, width, height, sliderK, data, boxHTML);

        this.ratio = [0, 100, 0];

        let Chart;

        switch (type) {
            case "lines": Chart = _ChartController_Lines_js__WEBPACK_IMPORTED_MODULE_2__["LinesL"];
                break;
            case "lines2Y": Chart = _ChartController_Lines2Y_js__WEBPACK_IMPORTED_MODULE_3__["Lines2YL"];
                break;
            case "stacked": Chart = _ChartController_Stacked_js__WEBPACK_IMPORTED_MODULE_5__["StackedL"];
                break;
            case "daily": Chart = _ChartController_Daily_js__WEBPACK_IMPORTED_MODULE_4__["DailyL"];
                break;
            case "percentage": Chart = _ChartController_Percentage_js__WEBPACK_IMPORTED_MODULE_6__["PercentageL"];
        }

        this.chartHeight = this.height * this.ratio[1] / 100;
        this.chartMarginTop = this.height * this.ratio[0] / 100;
        this.chartController = new Chart(
            ctx, width, this.chartHeight, this.chartMarginTop, data
        );

        type === "daily" || this.setChecks();

        this.onTumblerUpdate(tumblerStart, tumblerWidth);
    }

    //метод, реагирующий в ответ на действия слайдера
    onTumblerUpdate(tumblerStart, tumblerWidth) {
        super.onTumblerUpdate(tumblerStart, tumblerWidth);

        this.leftBoundIndex -= 2;
        this.rightBoundIndex += 2;

        let n = this.data.valuesY[0].length - 1;
        this.rightBoundIndex >= n && (this.rightBoundIndex = n);
        this.leftBoundIndex < 0 && (this.leftBoundIndex = 0);

        let k = this.width - (tumblerStart + tumblerWidth),
            offset = k * this.width / tumblerWidth;

        this.coordsX = this.calcCoordsX(
            this.leftBoundIndex, this.rightBoundIndex, this.scaleX, offset
        );

        // инициируем отрисовку, если она анимация спит
        this.animationHappens || this.draw();
    }

    draw() {
        let ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        let input1 = this.chartController.draw(this.shouldChartsUpdate,
            this.coordsX, this.leftBoundIndex,
            this.rightBoundIndex);

        ctx.globalCompositeOperation = "destination-in";
        Object(_roundRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ctx, 0, 0, this.width, this.height, 15, true, false);
        ctx.globalCompositeOperation = "source-over";

        this.animate(input1);
    }

    onResize(width, height) {
        super.onResize(width, height);

        this.onTumblerUpdate(0, this.width);

        this.animationHappens || this.draw();
    }
}

/***/ }),

/***/ "./app/MainController/Slider.js":
/*!**************************************!*\
  !*** ./app/MainController/Slider.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Slider; });
/* harmony import */ var _roundRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../roundRect.js */ "./app/roundRect.js");


class Slider {
    constructor(ctx, html, width, height, tumblerLimiter, upper) {
        this.ctx = ctx;
        this.html = html;
        this.parentHTML = html.parentNode;

        this.width = width;
        this.height = height;

        this.tumblerLimiter = tumblerLimiter;
        this.minTumblerWidth = this.width / tumblerLimiter;
        this.borders = [16, 3];

        this.upper = upper;

        this.liveDur = 300;

        this.events = ('ontouchstart' in window) ?
            {
                isDesktop: false,
                down: "ontouchstart",
                up: "ontouchend",
                move: "ontouchmove",
                leave: "ontouchend"
            } :
            {
                isDesktop: true,
                down: "onmousedown",
                up: "onmouseup",
                move: "onmousemove",
                leave: "onmouseleave"
            };

        this.html[this.events.down] = e => this.handleTumblerDown(e);

        this.isLive = false;
        this.animationHappens = false;
        this.isTorn = false;
    }

    switchInfluence(state, upper) {
        this.isTorn = !state;
        let stub = { onTumblerUpdate: () => { } };
        upper ? this.onUpperUpdate(upper) : this.onUpperUpdate(stub);
    }

    onUpperUpdate(newUpper) {
        this.upper = newUpper;
    }

    onResize(width, height) {
        let ratio = width / this.width;

        this.tumblerStart *= ratio;
        this.tumblerWidth *= ratio;

        this.width = width;
        this.height = height;

        this.minTumblerWidth = this.width / this.tumblerLimiter;

        this.upper.onTumblerUpdate(this.tumblerStart, this.tumblerWidth);
        this.update(this.tumblerStart, this.tumblerWidth);
    }

    handleTumblerDown(e) {
        let tooltipArea = this.parentHTML.querySelector(".tooltipArea");
        tooltipArea.dispatchEvent(
            new Event("mouseleave")
        );

        if (this.isTorn === true) return;

        window.sliderDown = true;

        let x = this.events.isDesktop ? e.clientX : e.changedTouches[0].clientX;
        let offsetLeft = this.html.getBoundingClientRect().left;
        let offsetX = x - offsetLeft;
        let shiftX = offsetX - this.tumblerStart;

        if (shiftX > 0 && shiftX <= this.tumblerWidth) {
            let side = null;

            if (shiftX < 15) {
                side = "l";
            } else if (shiftX > this.tumblerWidth - 15) {
                side = "r";
            }

            if (side === null) {
                this.handleTumblerMove(shiftX);
            } else {
                this.handleTumblerExtend(e, side);
            }

            document[this.events.up] = () => {
                window.sliderDown = false;
                document[this.events.move] = document.onmouseup = null;
            };
        }
    }

    handleTumblerMove(shiftX) {
        document[this.events.move] = e => {
            let x = this.events.isDesktop ? e.clientX : e.changedTouches[0].clientX;
            let offsetLeft = this.html.getBoundingClientRect().left;
            let offsetX = x - offsetLeft;
            let newTumblerLeft = offsetX - shiftX;

            let space = this.width - this.tumblerWidth;

            if (newTumblerLeft < 0) {
                newTumblerLeft = 0;
            } else if (newTumblerLeft > space) {
                newTumblerLeft = space;
            }

            //дублируется
            if (this.isLive) {
                if (!this.animationHappens &&
                    Math.abs(newTumblerLeft - this.tumblerStart) >=
                    this.minTumblerWidth / 2) {
                    let res = this.calcAnimOffset(newTumblerLeft, this.tumblerWidth);
                    this.initAnimateTumbler(res[0], res[1]);
                }
            } else {
                this.upper.onTumblerUpdate(newTumblerLeft, this.tumblerWidth, true);
                this.update(newTumblerLeft, this.tumblerWidth);
            }
        }
    }


    handleTumblerExtend(e, side) {
        let x = this.events.isDesktop ? e.clientX : e.changedTouches[0].clientX;
        let offsetLeft = this.html.getBoundingClientRect().left;
        let offsetX0 = x - offsetLeft;
        let tumblerWidth0 = this.tumblerWidth;
        let tumblerLeft0 = this.tumblerStart;
        let marginRight0 = this.width - (tumblerLeft0 + tumblerWidth0);

        document[this.events.move] = e => {
            let newTumblerWidth, newTumblerLeft;
            let x = this.events.isDesktop ? e.clientX : e.changedTouches[0].clientX;
            let offsetLeft = this.html.getBoundingClientRect().left;
            let offsetX = x - offsetLeft;
            let offset = offsetX - offsetX0;

            if (side === "r") {
                newTumblerWidth = tumblerWidth0 + offset;
                let newMarginRight = newTumblerWidth + tumblerLeft0;
                newMarginRight > this.width && (newTumblerWidth = this.width - tumblerLeft0);
                newTumblerLeft = tumblerLeft0;
            } else {
                newTumblerWidth = tumblerWidth0 - offset;
                newTumblerLeft = this.width - (marginRight0 + newTumblerWidth);

                if (newTumblerLeft < 0) {
                    newTumblerWidth = this.width - marginRight0;
                    newTumblerLeft = 0;
                }
            }

            if (newTumblerWidth < this.minTumblerWidth) {
                newTumblerWidth = this.minTumblerWidth;
                side === "l" &&
                    (newTumblerLeft = this.width - this.minTumblerWidth - marginRight0);
            } else if (newTumblerWidth > this.width) {
                newTumblerWidth = this.width;
            }

            if (this.isLive) {
                if (!this.animationHappens &&
                    Math.abs(newTumblerWidth - this.tumblerWidth) >=
                    this.minTumblerWidth / 2) {
                    let res = this.calcAnimOffset(newTumblerLeft, newTumblerWidth);
                    this.initAnimateTumbler(res[0], res[1]);
                } newTumblerWidth, this.minTumblerWidth
            } else {
                this.upper.onTumblerUpdate(newTumblerLeft, newTumblerWidth, true);
                this.update(newTumblerLeft, newTumblerWidth);
            }
        }
    }

    update(tumblerStart, tumblerWidth) {
        this.tumblerStart = tumblerStart;
        this.tumblerWidth = tumblerWidth;

        this.draw();
    }

    calcAnimOffset(tumblerStart, tumblerWidth) {
        let dif0;

        dif0 = tumblerStart - this.tumblerStart;
        dif0 !== 0 && (tumblerStart = this.tumblerStart +
            this.minTumblerWidth * Math.round(dif0 / this.minTumblerWidth));

        dif0 = tumblerWidth - this.tumblerWidth;
        dif0 !== 0 && (tumblerWidth = this.tumblerWidth +
            this.minTumblerWidth * Math.round(dif0 / this.minTumblerWidth));

        return [tumblerStart, tumblerWidth];
    }

    initAnimateTumbler(newStart, newTumblerWidth, dur = this.liveDur, resolve) {
        this.updateDT();
        this.dur = dur;
        this.durProgress = 0;

        let dif;

        dif = newStart - this.tumblerStart;
        this.animBiasOfStart = dif / dur;

        dif = newTumblerWidth - this.tumblerWidth;
        this.animBiasOfTumblerWidth = dif / dur;


        this.animationHappens = true;
        cancelAnimationFrame(this.requestID);
        this.animateTumbler(newStart, newTumblerWidth, resolve);
    }

    animateTumbler(newStart, newTumblerWidth, resolve) {
        this.updateDT();
        this.durProgress += this.dt;

        let input1 = true;

        let s1 = this.tumblerStart + this.animBiasOfStart * this.dt;
        let s2 = this.tumblerWidth + this.animBiasOfTumblerWidth * this.dt;

        if (this.durProgress < this.dur) {
            this.tumblerStart = s1;
            this.tumblerWidth = s2;
            this.upper.onTumblerUpdate(this.tumblerStart, this.tumblerWidth, false);

        } else {
            this.tumblerStart = newStart;
            this.tumblerWidth = newTumblerWidth;

            this.animationHappens = false;
            input1 = false;

            this.upper.onTumblerUpdate(this.tumblerStart, this.tumblerWidth, true);
        }

        this.update(this.tumblerStart, this.tumblerWidth);

        if (input1) {
            (this.requestID = requestAnimationFrame(
                () => this.animateTumbler(newStart, newTumblerWidth, resolve)
            ));
        } else {
            resolve && resolve(true);
        }
    }

    updateDT() {
        let now = Date.now();
        this.dt = now - this.lastTime;
        this.lastTime = now;
    }

    draw() {
        let ctx = this.ctx;

        ctx.clearRect(0, 0, this.width, this.height);
        ctx.fillStyle = window.theme.sliderMask;
        Object(_roundRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ctx, 0, 0, this.width, this.height, 15, true, false);
        ctx.fillStyle = window.theme.tumbler;

        let stroke = false;
        if (window.themeType === "day") {
            stroke = true;
            ctx.strokeStyle = "white";
            ctx.lineWidth = 1;
        }
        Object(_roundRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ctx, this.tumblerStart, 0, this.tumblerWidth, this.height, 15, true, stroke);

        let a = this.borders[0], b = this.borders[1];
        ctx.clearRect(this.tumblerStart + a, b, this.tumblerWidth - a * 2, this.height - b * 2);
        stroke && ctx.strokeRect(this.tumblerStart + a, b, this.tumblerWidth - a * 2, this.height - b * 2);

        let margin = this.height / 2.5;
        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(this.tumblerStart + a / 2, this.height - margin);
        ctx.lineTo(this.tumblerStart + a / 2, 0 + margin);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.tumblerStart + this.tumblerWidth - a / 2, this.height - margin);
        ctx.lineTo(this.tumblerStart + this.tumblerWidth - a / 2, 0 + margin);
        ctx.stroke();
    }

}

/***/ }),

/***/ "./app/MainController/Upper.js":
/*!*************************************!*\
  !*** ./app/MainController/Upper.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Upper; });
/* harmony import */ var _Base_Base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base/Base.js */ "./app/MainController/Base/Base.js");
/* harmony import */ var _parseUnixtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../parseUnixtime.js */ "./app/parseUnixtime.js");
/* harmony import */ var _ChartController_Lines_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ChartController/Lines.js */ "./app/ChartController/Lines.js");
/* harmony import */ var _ChartController_Lines2Y_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ChartController/Lines2Y.js */ "./app/ChartController/Lines2Y.js");
/* harmony import */ var _ChartController_Daily_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ChartController/Daily.js */ "./app/ChartController/Daily.js");
/* harmony import */ var _ChartController_Stacked_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ChartController/Stacked.js */ "./app/ChartController/Stacked.js");
/* harmony import */ var _ChartController_Percentage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ChartController/Percentage.js */ "./app/ChartController/Percentage.js");
/* harmony import */ var _ChartController_Pie_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ChartController/Pie.js */ "./app/ChartController/Pie.js");
/* harmony import */ var _Scale_Marking_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Scale/Marking.js */ "./app/Scale/Marking.js");
/* harmony import */ var _Scale_DatesBar_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Scale/DatesBar.js */ "./app/Scale/DatesBar.js");
/* harmony import */ var _UpperListener_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./UpperListener.js */ "./app/MainController/UpperListener.js");
















class Upper extends _Base_Base_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(type, ctx, width, height, sliderK, data, tumblerStart, tumblerWidth,
        html, updateHeaderDate, onZoom) {
        super(type, ctx, width, height, sliderK, data, html.parentNode);

        this.html = html;
        this.updateHeaderDate = updateHeaderDate;

        this.ratio = [10, 80, 10];

        this.dates = data.dates.map(item =>
            Object(_parseUnixtime_js__WEBPACK_IMPORTED_MODULE_1__["default"])(item / 1000)
        );

        type === "pie" && this.dividePieData(10);

        let Chart;
        let markingNumber = 1;

        switch (type) {
            case "lines": Chart = _ChartController_Lines_js__WEBPACK_IMPORTED_MODULE_2__["Lines"];
                break;
            case "lines2Y": Chart = _ChartController_Lines2Y_js__WEBPACK_IMPORTED_MODULE_3__["Lines2Y"];
                markingNumber = 2;
                break;
            case "stacked": Chart = _ChartController_Stacked_js__WEBPACK_IMPORTED_MODULE_5__["Stacked"];
                break;
            case "daily": Chart = _ChartController_Daily_js__WEBPACK_IMPORTED_MODULE_4__["Daily"];
                break;
            case "percentage": Chart = _ChartController_Percentage_js__WEBPACK_IMPORTED_MODULE_6__["Percentage"];
                break;
            case "pie": Chart = _ChartController_Pie_js__WEBPACK_IMPORTED_MODULE_7__["Pie"];
                markingNumber = 0;
        }

        if (this.chartType !== "pie") {
            let datesBarMarginTop = this.height *
                ((100 - this.ratio[2]) + this.ratio[2] / 2) / 100;

            this.datesBar = new _Scale_DatesBar_js__WEBPACK_IMPORTED_MODULE_9__["default"](
                this.ctx, data, datesBarMarginTop, width
            );
        } else {
            let stub = { update: () => { }, draw: () => { }, onResize: () => { } };
            this.datesBar = stub;
        }

        this.chartHeight = this.height * this.ratio[1] / 100;
        this.chartMarginTop = this.height * this.ratio[0] / 100;
        this.chartController = new Chart(
            ctx, this.width, this.chartHeight, this.chartMarginTop,
            this.data,
            this.updateTooltip.bind(this),
            this.animateMarking.bind(this),
        );

        type === "daily" || this.setChecks();

        this.markings = [];

        if (markingNumber !== 0) {
            for (let i = 0; i < markingNumber; i++) {
                let vis = 1, color;
                if (type === "lines2Y") {
                    color = this.data.colors[i];
                    vis = Number(this.chartController.checks[i]);
                }
                this.markings.push(
                    new _Scale_Marking_js__WEBPACK_IMPORTED_MODULE_8__["default"](
                        this.ctx, this.width, this.chartHeight, this.chartMarginTop,
                        1, 0, !!i, vis, color
                    )
                );
            }
        }

        this.onTumblerUpdate(tumblerStart, tumblerWidth, true);

        this.markings.forEach((item, i) => {
            let newMax = this.chartController.axisYmax.newV;
            let newMin = this.chartController.axisYmin.newV;
            this.animateMarking(0, newMax, newMin, i);
        });

        this.zoomed = false;

        this.upperListener = new _UpperListener_js__WEBPACK_IMPORTED_MODULE_10__["default"](html, this.onSelectionChange.bind(this),
            () => {
                if (this.zoomed !== false) return;
                let d = this.dates[this.popupIndex];
                onZoom({
                    coordsX: this.coordsX,
                    i: this.popupIndex,
                    l: this.leftBoundIndex
                },
                    d[1], d[2], d[3]);
            });

        this.hoursMode = false;
        this.initTooltip();
    }

    dividePieData(freq) {
        let dividedValuesY = [], dividedDates = [];

        this.dates.forEach((date, i) => {
            let start = i * freq;
            for (let k = start; k < start + freq; k++) {
                dividedDates[k] = date;
            }
        });
        this.dates = dividedDates;

        this.data.valuesY.forEach((valuesYItem, i) => {
            dividedValuesY[i] = [];
            valuesYItem.forEach((valueY, j) => {
                let start = j * freq;
                for (let k = start; k < start + freq; k++) {
                    dividedValuesY[i][k] = valueY;
                }
            });
        });
        this.data = { ...this.data }; //clone
        this.data.freq = freq;
        this.data.valuesY = dividedValuesY;
    }

    initTooltip() {
        let parent = this.html.parentNode;
        this.tooltipHTML = parent.querySelector(".tooltip");

        this.tooltipHTML.innerHTML = "";

        let line;

        line = this.tooltipHTML.appendChild(document.createElement("div"));
        line.className = "tooltipLine";

        line.style.margin = this.chartType === "pie" ? "0" : "5px 0";

        line.appendChild(document.createElement("div")).style.fontWeight = "bold";
        line.appendChild(document.createElement("div"));


        for (let i = 0; i < this.data.valuesY.length + 1; i++) {
            line = this.tooltipHTML.appendChild(document.createElement("div"));
            line.className = "tooltipLine";

            if (this.chartType === "percentage") {
                let a = line.appendChild(document.createElement("div"));
                a.className = "percent";
            }
            let name = line.appendChild(document.createElement("div"));
            name.className = "name";
            let value = line.appendChild(document.createElement("div"));
            value.className = "value";
            value.style.color = this.data.colors[i];
        }
    }

    updateTooltip(index, dockets) {
        let dateLabel = "";
        if (this.chartType !== "pie") {
            this.popupIndex = index + this.leftBoundIndex;
            let date = this.dates[this.popupIndex];

            if (this.hoursMode === true) {
                let d = `${date[4]}:${date[5]}`;
                if (this.singleDate) {
                    dateLabel = d;
                } else {
                    dateLabel = `${date[1]} ${date[2]}, ` + d;
                }
            } else {
                dateLabel = `${date[0].slice(0, 3)}, ${date[1]} ${date[2].slice(0, 3)} ${date[3]}`;
            }
        } else {
            dateLabel = "";
        }

        let lines = this.tooltipHTML.childNodes;
        let line;
        line = lines[0].childNodes;
        line[0].textContent = dateLabel;

        dockets.forEach((item, i) => {
            line = lines[i + 1].childNodes;
            lines[i + 1].style.margin = item.name === "" ? "0" : "5px 0";

            let labels = Object.getOwnPropertyNames(item);
            labels.forEach((label, j) => {
                line[j].textContent = item[label];
            });
        });
    }

    onResize(width, height) {
        super.onResize(width, height);

        this.markings.forEach(item =>
            item.onResize(width, this.chartHeight, this.chartMarginTop));

        let datesBarMarginTop = this.height *
            ((100 - this.ratio[2]) + this.ratio[2] / 2) / 100;

        this.datesBar.onResize(datesBarMarginTop, width);
        this.upperListener.onResize();
    }

    onTumblerUpdate(tumblerStart, tumblerWidth, flagHeaderUpdate) {
        super.onTumblerUpdate(tumblerStart, tumblerWidth, flagHeaderUpdate);

        let datesBarLabelWidth = 50;
        let rightSideMargin = 2,
            leftSideMargin = Math.floor(datesBarLabelWidth / this.scaleX);
        leftSideMargin < 2 && (leftSideMargin = 2);
        this.leftBoundIndex -= leftSideMargin;
        this.rightBoundIndex += rightSideMargin;

        let n = this.data.valuesY[0].length - 1;
        this.rightBoundIndex >= n && (this.rightBoundIndex = n);
        this.leftBoundIndex < 0 && (this.leftBoundIndex = 0);

        let k = this.sliderWidth - (tumblerStart + tumblerWidth),
            offset = k * this.width / tumblerWidth;

        this.coordsX = this.calcCoordsX(
            this.leftBoundIndex, this.rightBoundIndex, this.scaleX, offset
        );

        let scope = (this.width / this.scaleX).toFixed(2);
        this.datesBar.update(this.leftBoundIndex, this.rightBoundIndex,
            scope, this.dates, this.hoursMode);

        this.animationHappens || this.draw();
    }

    defineHeaderDateLabel(l, r) {
        let d1 = this.dates[l],
            d2 = this.dates[r];

        let dL1 = [d1[1], d1[2], d1[3]];
        let dL2 = [d2[1], d2[2], d2[3]];

        if (compare(dL1, dL2)) {
            let weekday = d1[0] + ",";
            dL1 = [weekday, ...dL1];
            this.singleDate = true;
            return [dL1];
        } else {
            this.singleDate = false;
            return [dL1, dL2];
        }

        function compare(a1, a2) {
            return a1.length == a2.length && a1.every((v, i) => v === a2[i]);
        }
    }

    animateMarking(stepsNumber, newMax, newMin, index = 0) {
        this.markings[index].initAnimation(
            stepsNumber, newMax, newMin
        );
    }

    draw() {
        let input = false;

        this.ctx.clearRect(0, 0, this.width, this.height);

        input = this.chartController.draw(this.shouldChartsUpdate,
            this.coordsX, this.leftBoundIndex, this.rightBoundIndex) || input;

        input = this.markings.reduce((accum, item) => {
            return item.draw() || accum;
        }, false) || input;

        input = this.datesBar.draw(this.coordsX, this.leftBoundIndex) || input;

        this.animate(input);
    }

    defineTooltipPosition(x, y) {
        let width = this.tooltipHTML.offsetWidth,
            height = this.tooltipHTML.offsetHeight,
            spaceY = this.height / 15,
            spaceX = this.width / 40,
            offsetX = this.html.offsetLeft,
            offsetY = this.html.offsetTop;

        let dif, lowScreen = false;
        if (height / this.height > .25) {
            lowScreen = true;
            dif = x - width + offsetX - spaceX;
        } else {
            dif = x - width / 2 + offsetX;
        }

        if (dif < 0) {
            x = lowScreen ? x + spaceX : 0;
        } else if (dif > this.width - width + offsetX) {
            x = this.width - width + offsetX;
        } else {
            x = dif;
        }

        if (y - height > -this.height / 10) {
            y = y + offsetY - height - spaceY;
        } else {
            y = y + offsetY + spaceY;
            let b = this.height - height;
            y > b && (y = b);
        }

        return [x, y];
    }

    onSelectionChange(x, y) {
        //эта хуйня происходит раньше, чем обновляются координаты?
        if (x !== undefined && !this.transitionHappens) {
            let result = this.chartController.highlightItem(
                x, y, this.coordsX, this.scaleX, this.leftBoundIndex
            );

            if (result === false) {
                return this.onSelectionChange();
            }

            let newPos = this.defineTooltipPosition(x, y);
            this.tooltipHTML.style.left = newPos[0];
            this.tooltipHTML.style.top = newPos[1];
            this.tooltipHTML.style.opacity = 1;
        } else {
            this.chartController.unhighlight();
            this.tooltipHTML.style.opacity = 0;
        }
        this.animationHappens || this.draw();
    }

}

/***/ }),

/***/ "./app/MainController/UpperListener.js":
/*!*********************************************!*\
  !*** ./app/MainController/UpperListener.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UpperListener; });
class UpperListener {
    constructor(canvasHTML, sendCoords, onZoom) {
        this.canvasHTML = canvasHTML;

        this.sendCoords = sendCoords;
        this.onZoom = onZoom;

        let parent = canvasHTML.parentNode;
        this.areaHTML = parent.querySelector(".tooltipArea");

        this.onResize();

        this.isDesktop = !('ontouchstart' in window);
        this.zoomEvent = this.isDesktop ? "onclick" : "ontouchstart";
        let focusEvent = this.isDesktop ? "onmouseenter" : "onclick";

        this.areaHTML[focusEvent] = this.onFocus.bind(this);
    }

    onFocus(e) {
        this.sendCoords(e.offsetX, e.offsetY);
        this.areaHTML.onmousemove = e => this.sendCoords(e.offsetX, e.offsetY);
        this.areaHTML[this.zoomEvent] = () => {
            if (this.isDesktop) {
                this.onZoom();
            } else {
                let id = setTimeout(this.onZoom, 500);
                this.areaHTML.ontouchend = () => {
                    clearTimeout(id);
                    this.areaHTML.ontouchend = null;
                }
            }
        }

        this.areaHTML.onmouseleave = () => {
            this.sendCoords();
            this.areaHTML.onmousemove = this.areaHTML[this.zoomEvent] = null;
        };
    }

    onResize() {
        let top = this.canvasHTML.style.top,
            height = this.canvasHTML.offsetHeight,
            width = this.canvasHTML.offsetWidth;

        this.areaHTML.style.top = top;
        this.areaHTML.style.height = height;
        this.areaHTML.style.width = width;

    }
}

/***/ }),

/***/ "./app/Scale/DatesBar.js":
/*!*******************************!*\
  !*** ./app/Scale/DatesBar.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DatesBar; });
class DatesBar {
    constructor(ctx, data, marginTop, width) {
        this.ctx = ctx;

        this.data = data;

        this.marginTop = marginTop;

        this.values = [];
        this.xIndexes = [];
        this.visibilities = [];
        this.visibility = 0.5;
        this.animStep = 0.05;

        this.appearance = false;

        this.prevScope = 0;
        this.zoomDir = 1;

        this.scopeK = Math.round(1 / (width / 50) * 100) / 100;
    }

    onResize(marginTop, width) {
        this.marginTop = marginTop;
        this.scopeK = Math.round(1 / (width / 50) * 100) / 100;
    }

    //можно считать остаток только при экстенде
    update(l, r, scope, dates, hoursMode = false) {
        let approximateStep = scope * this.scopeK,
            log = Math.log(approximateStep) / Math.log(2),
            wholeLog = Math.floor(log);
        let pow = wholeLog < 0 ? 0 : wholeLog;
        let step = Math.pow(2, pow) * 3;

        // console.log({ approximateStep: approximateStep, log: wholeLog, step: step });

        let bias = step - l % step;
        bias === step && (bias = 0);

        //скрывать ли смежные даты
        this.appearance = !Math.round(log - wholeLog);

        let zoomDir = Math.sign(scope - this.prevScope);
        if (zoomDir !== 0) {
            (this.zoomDir = zoomDir);
            this.prevScope = scope;
        }

        this.values = [];
        this.xIndexes = [];
        this.visibilities = [];

        for (let i = l + bias; i < r; i += step) {
            this.xIndexes.push(i);
            let curDate;
            if (hoursMode === true &&
                (
                    (step < 12 && this.appearance === false) ||
                    (step < 24 && this.appearance === true)
                )) {
                curDate = `${dates[i][4]}:${dates[i][5]}`;
            } else {
                curDate = dates[i][1] + " " + dates[i][2].slice(0, 3);
            }

            this.values.push(curDate);
            let frequency = 2;
            this.visibilities.push(!!(i % (step * frequency)));
        }
    }

    // имеется в виду прозрачность смежных элементов
    animateVisibilityOfOsculant() {
        if (this.zoomDir === -1) {
            if (this.appearance === true) {
                this.visibility = this.visibility >= 1 ? (this.visibility = 1) : this.visibility + this.animStep;
            } else {
                this.visibility = 0;
            }
        } else {
            if (this.appearance === false) {
                this.visibility = this.visibility <= 0 ? (this.visibility = 0) : this.visibility - this.animStep;
            } else {
                this.visibility = 1;
            }
        }
    }

    draw(coordsX, l) {
        //логично вызывать анимацию отсюда, 
        //потому что даже при отсутсвии update анимация должна продолжаться
        this.animateVisibilityOfOsculant();

        this.ctx.font = "15px Verdana";

        // let scope = this.values.length - 1;

        this.values.forEach((item, i) => {
            let ind = this.xIndexes[i];
            let x = coordsX[ind - l];

            // let labelWidth = item.length * 10; //улучшить  

            // let offset = (scope - i) / scope * labelWidth;

            this.ctx.fillStyle = this.visibilities[i] ? `${window.theme.XYAxis.slice(0, -3)}${this.visibility * .5})` : window.theme.XYAxis;
            this.ctx.fillText(item, x, this.marginTop);
        });

        return Number.isInteger(this.visibility) ? false : true;
    }


}







/***/ }),

/***/ "./app/Scale/Marking.js":
/*!******************************!*\
  !*** ./app/Scale/Marking.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MarkingController; });
function hexDec(h) {
    var m = h.slice(1).match(/.{2}/g);

    m[0] = parseInt(m[0], 16);
    m[1] = parseInt(m[1], 16);
    m[2] = parseInt(m[2], 16);

    return m.join(',');
};

function reduceNumber(value) {
    if (value >= 1000) {
        if (value < 1000000) {
            value = Math.round((value / 1000) * 10) / 10 + "K";
        } else if (value >= 1000000 && value < 1000000000) {
            value = Math.round((value / 1000000) * 10) / 10 + "M";
        } else if (value >= 1000000000) {
            value = Math.round((value / 1000000000) * 10) / 10 + "B";
        }
    }
    return value;
}


class Line {
    constructor(label, value, y, opacity) {
        this.label = label;
        this.y = y;

        //нужно лишь для сравнения с новым поколением
        this.value = value;

        this.opacity = opacity;
        this.step = null;
    }

    setMoveAnimation(endY, dur, targetOpacity) {
        this.targetOpacity = targetOpacity;
        this.opacityStep = (targetOpacity - this.opacity) / dur;
        this.opacitySign = Math.sign(this.opacityStep);
        this.step = (endY - this.y) / dur;
        this.endY = endY;
    }

    animateStep(dt) {
        if (!this.step) return;

        this.opacity += this.opacityStep * dt;
        this.opacity * this.opacitySign >
            this.targetOpacity * this.opacitySign
            && (this.opacity = this.targetOpacity);

        this.y += this.step * dt;
    }

    finishAnimation() {
        this.opacity = this.targetOpacity;
        if (this.step) {
            this.y = this.endY;
            this.step = null;
            delete this.endY;
        }
    }


    draw(ctx, width, visibility, labelColor, labelX, lineColor, maxLineOpacity) {
        let y = this.y;

        ctx.strokeStyle = `rgba(${lineColor}, ${this.opacity * maxLineOpacity * visibility})`;

        ctx.beginPath();

        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        ctx.fillStyle = `rgba(${labelColor}, ${this.opacity * .5 * visibility})`;

        ctx.fillText(this.label, labelX, y - 10);
    }
}

class MarkingController {
    constructor(ctx, width, height, marginTop,
        max = 1, min = 0,
        rightSide = false, visibility, labelColor) {

        this.linesNumber = 5;

        this.ctx = ctx;

        this.height = height;
        this.width = width;
        this.marginTop = marginTop;
        this.bottomBound = marginTop + height;

        this.maxLineOpacity = .1;
        this.lineOpacity = this.maxLineOpacity;
        this.staticVisibility = !rightSide;

        this.visibility = visibility;
        this.rightSide = rightSide;

        labelColor && (this.customLabelColor = hexDec(labelColor));

        this.dif0 = max - min;
        this.min0 = min;

        this.targets = [];
        this.items = [];

        for (let i = 0; i < this.linesNumber; i++) {
            let y = this.bottomBound - i * height / (this.linesNumber - 1);
            this.targets.push({
                label: "",
                value: 0,
                y: y
            });
        }

        this.animationHappens = false;
        this.animationHappens2 = false;
    }

    onResize(width, height, marginTop) {
        this.height = height;
        this.width = width;
        this.marginTop = marginTop;
        this.bottomBound = marginTop + height;

        for (let i = 0; i < this.linesNumber; i++) {
            let y = this.bottomBound - i * height / (this.linesNumber - 1);
            this.targets[i].y = y;
        }

        this.initAnimation(0, this.max, this.min);
    }

    initAnimation(dur, max, min = 0) {
        if (!(isFinite(max) && isFinite(min))) return;

        if (this.staticVisibility === false) {
            this.lineOpacity = this.maxLineOpacity;
        }

        this.animationHappens2 = true;

        this.dur = this.initDur = dur;
        this.lastTime = Date.now();

        this.dif = max - min;
        this.min = min;
        this.max = max;

        //clone
        let targets0 = this.targets.map(a => ({ ...a }));

        //обновляю стоячки
        for (let i = 0; i < this.linesNumber; i++) {
            let value = min + (this.dif / Math.floor(this.linesNumber - 1)) * i;

            let label = reduceNumber(value);
            this.targets[i].value = value;
            this.targets[i].label = label;
        }

        for (let i = 0; i < this.linesNumber; i++) {
            let t0s = targets0;
            let t0 = t0s[i];
            let value0 = t0.value, label0 = t0.label, y = t0.y;
            let t = this.targets[i];
            let value = t.value, label = t.label;

            //отчаливают или мигрируют стоячки
            let index0 = this.items.findIndex(item => {
                return item.label === label0;
            });
            if (~index0) {
                let a = this.targets.find(target => target.label === label0);
                let targetY, targetOpacity;
                if (a === undefined) {
                    let dy = this.calcDY(value0);
                    targetY = t.y + dy;
                    targetOpacity = 0;
                } else {
                    targetY = a.y;
                    targetOpacity = 1;
                }

                let item = this.items[index0];
                item.setMoveAnimation(targetY, this.dur, targetOpacity);
            }

            //причаливают отчаливающие и рождающиеся
            let index = this.items.findIndex(item => item.label === label);
            if (~index) {
                let item = this.items[index];
                item.value = value;
                item.setMoveAnimation(t.y, this.dur, 1);
            } else {
                let dy = this.calcDY(value);
                let line = new Line(label, value, t.y - dy, 0);
                line.setMoveAnimation(t.y, this.dur, 1);
                this.items.push(line);
            }
        }

        this.dif0 = this.dif;
        this.min0 = this.min;

        cancelAnimationFrame(this.requestID2);
        this.animate();
    }

    calcDY(value) {
        let y0 = (value - this.min0) / this.dif0;
        let y = (value - this.min) / this.dif;
        return (y0 - y) * this.height;
    }

    animate() {
        let now = Date.now();
        let dt = now - this.lastTime;
        this.lastTime = now;

        this.dur -= dt;

        this.items.forEach(item => item.animateStep(dt));

        if (this.dur > 0) {
            this.requestID2 = requestAnimationFrame(
                () => this.animate()
            );
        } else {
            this.finishAnimation();
        }
    }

    finishAnimation() {
        this.items = this.items.filter(item => {
            item.finishAnimation();
            return item.opacity !== 0;
        });

        this.lineOpacity = this.staticVisibility ? this.maxLineOpacity : 0;
        this.animationHappens2 = false;
    }

    setStaticVisibility(state) {
        this.staticVisibility = state;
        this.lineOpacity = state ? this.maxLineOpacity : 0;
    }

    draw() {
        let labelColor = this.customLabelColor ? this.customLabelColor :
            window.theme.XYAxis.slice(5, -5); //можно регулярку написать   

        let lineColor = window.theme.gridLines.slice(5, -5);

        let labelX = this.rightSide ? this.width - 50 : 10;

        let args = [this.ctx, this.width,
        this.visibility, labelColor, labelX, lineColor, this.lineOpacity];

        this.ctx.font = "15px Arial";
        this.ctx.lineWidth = 1;

        this.items.forEach(item => item.draw(...args));

        return this.animationHappens || this.animationHappens2;
    }

    initVisibilityAnimation(dir, dur = 200) {
        cancelAnimationFrame(this.requestID);

        this.animStep = 1 / dur;
        this.lastTime = Date.now();
        this.animateVisibility(dir);
    }

    animateVisibility(dir) {
        let now = Date.now();
        this.dt = now - this.lastTime;
        this.lastTime = now;

        if (dir === true) {
            this.visibility = this.visibility >= 1 ? (this.visibility = 1) : this.visibility + this.animStep * this.dt;
        } else {
            this.visibility = this.visibility <= 0 ? (this.visibility = 0) : this.visibility - this.animStep * this.dt;
        }

        let target = +dir;
        if (this.visibility === target) {
            this.animationHappens = false;
        } else {
            this.animationHappens = true;
            (this.requestID = requestAnimationFrame(() => this.animateVisibility(dir)));
        }
    }

}

/***/ }),

/***/ "./app/dataHandler.js":
/*!****************************!*\
  !*** ./app/dataHandler.js ***!
  \****************************/
/*! exports provided: getDataFromJSON, sliceData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataFromJSON", function() { return getDataFromJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sliceData", function() { return sliceData; });
function getDataFromJSON(json) {
    //координаты в куче
    let columns = json.columns;
    //массив значений Y
    let valuesY = columns.map(item => item.slice(1)).slice(1);
    //массив timestamp дат
    let dates = columns[0].slice(1);

    let colors = Object.values(json.colors);
    let names = Object.values(json.names);
    let valuesNumber = valuesY[0].length;

    return {
        valuesY: valuesY,
        dates: dates,
        colors: colors,
        names: names,
        valuesNumber: valuesNumber,
        linesNumber: valuesNumber - 1
    };
}

function sliceData(data, l, r) {
    let d = Object.assign({}, data);
    d.valuesY = d.valuesY.map(item => item.slice(l, r + 1));
    d.dates = d.dates.slice(l, r + 1);
    d.valuesNumber = r - l + 1;
    d.linesNumber = d.valuesNumber - 1;
    return d;
}

/***/ }),

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.js */ "./app/App.js");


let app = new _App_js__WEBPACK_IMPORTED_MODULE_0__["default"]("tg-chart");





/***/ }),

/***/ "./app/parseUnixtime.js":
/*!******************************!*\
  !*** ./app/parseUnixtime.js ***!
  \******************************/
/*! exports provided: monthLabels, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "monthLabels", function() { return monthLabels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseUnixtime; });
let monthLabels = ['January', 'February',
    'March', 'April', 'May',
    'June', 'July', 'August',
    'September', 'October', 'November',
    'December'];

function parseUnixtime(timestamp) {

    let year = Math.ceil(timestamp / 31557600) + 1969;
    let isYearLeap = defineYearLeap(year);

    let leapDays = Math.ceil((year - 1969) / 4);
    let daysSinceTheEpoch = Math.ceil(timestamp / 86400);
    let n = daysSinceTheEpoch - leapDays;
    let daysPassedInTheCurrentYear = n % 365;

    let month, day;

    let secondsInCurDay = timestamp - ((daysSinceTheEpoch - 1) * 86400);
    let hours = Math.floor(secondsInCurDay / 3600);
    if (hours === 24) {
        hours = 0;

        daysPassedInTheCurrentYear++;
        let maxPassedDays = isYearLeap ? 365 : 364;
        if (daysPassedInTheCurrentYear > maxPassedDays) {
            daysPassedInTheCurrentYear = 0;
            year++;
        }
    }

    let monthDaysTable = [
        31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];
    isYearLeap === true && (monthDaysTable[1] = 29);

    let count = 0;

    for (let i = 0; i < 12; i++) {
        count += monthDaysTable[i];
        if (count > daysPassedInTheCurrentYear) {
            month = i;
            day = daysPassedInTheCurrentYear + monthDaysTable[i] - count + 1;
            break;
        }
    }

    let minutes = String(Math.floor(secondsInCurDay / 60) % 60);
    minutes.length === 1 && (minutes = "0" + minutes);

    let weekday = getDay(day, month + 1, year);

    return [weekday, day, monthLabels[month], year, hours, minutes];



    function defineYearLeap(year) {
        let result;

        if (year % 4 === 0) {
            result = true;
        }

        if (year % 100 === 0) {
            result = false;
        }

        if (year % 400 === 0) {
            result = true;
        }

        return result;
    }

    function getDay(day, month, year) {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        day = parseInt(day, 10); //если день двухсимвольный и <10 
        month = parseInt(month, 10); //если месяц двухсимвольный и <10 

        let a = parseInt((14 - month) / 12, 10);
        let y = year - a;
        let m = month + 12 * a - 2;
        let d = (parseInt(day + y + parseInt(y / 4, 10) - parseInt(y / 100, 10) + parseInt(y / 400, 10) + (31 * m) / 12, 10)) % 7;

        return days[d];
    }

}

/***/ }),

/***/ "./app/roundRect.js":
/*!**************************!*\
  !*** ./app/roundRect.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return roundRect; });
/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }

}

/***/ }),

/***/ "./app/themes.js":
/*!***********************!*\
  !*** ./app/themes.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//{color: ..., opacity:... }
//getTransparentColor(...) -> hexDec(...)
let themes = {
    day: {
        background: "white",
        sliderMask: "rgba(226, 238, 249, .6)",
        tumbler: "rgb(192, 209, 225)",
        tooltip: "white",
        tooltipText: "black",
        gridLines: "rgba(24, 45, 59, .1)",
        zoomOutText: "rgb(16, 139, 227)",
        XYAxis: "rgba(37, 37, 41, .5)",
        highlightMask: "rgba(255, 255, 255, .5)",
        text: "black",
    },
    night: {
        background: "rgb(36, 47, 62)",
        sliderMask: "rgba(48, 66, 89, .6)",
        tumbler: "rgb(86, 98, 109)",
        tooltip: "rgb(28, 37, 51)",
        tooltipText: "white",
        gridLines: "rgba(255, 255, 255, .1)",
        zoomOutText: "rgb(72, 170, 240)",
        XYAxis: "rgba(236, 242, 248, .5)",
        highlightMask: "rgba(36, 47, 62, .5)",
        text: "white",
    }
}

/* harmony default export */ __webpack_exports__["default"] = (themes);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvQm94LmpzIiwid2VicGFjazovLy8uL2FwcC9DaGFydENvbnRyb2xsZXIvQmFzZS9CYXNlLmpzIiwid2VicGFjazovLy8uL2FwcC9DaGFydENvbnRyb2xsZXIvQmFzZS9JdGVtQmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvQ2hhcnRDb250cm9sbGVyL0RhaWx5LmpzIiwid2VicGFjazovLy8uL2FwcC9DaGFydENvbnRyb2xsZXIvSXRlbS9MaW5lcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvQ2hhcnRDb250cm9sbGVyL0l0ZW0vUGVyY2VudGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvQ2hhcnRDb250cm9sbGVyL0l0ZW0vUGllLmpzIiwid2VicGFjazovLy8uL2FwcC9DaGFydENvbnRyb2xsZXIvSXRlbS9TdGFja2VkLmpzIiwid2VicGFjazovLy8uL2FwcC9DaGFydENvbnRyb2xsZXIvTGluZXMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL0NoYXJ0Q29udHJvbGxlci9MaW5lczJZLmpzIiwid2VicGFjazovLy8uL2FwcC9DaGFydENvbnRyb2xsZXIvUGVyY2VudGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvQ2hhcnRDb250cm9sbGVyL1BpZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvQ2hhcnRDb250cm9sbGVyL1N0YWNrZWQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL0NoZWNrcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvTWFpbkNvbnRyb2xsZXIvQmFzZS9CYXNlLmpzIiwid2VicGFjazovLy8uL2FwcC9NYWluQ29udHJvbGxlci9Mb3dlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvTWFpbkNvbnRyb2xsZXIvU2xpZGVyLmpzIiwid2VicGFjazovLy8uL2FwcC9NYWluQ29udHJvbGxlci9VcHBlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvTWFpbkNvbnRyb2xsZXIvVXBwZXJMaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvU2NhbGUvRGF0ZXNCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL1NjYWxlL01hcmtpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RhdGFIYW5kbGVyLmpzIiwid2VicGFjazovLy8uL2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvcGFyc2VVbml4dGltZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvcm91bmRSZWN0LmpzIiwid2VicGFjazovLy8uL2FwcC90aGVtZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUEyQjtBQUNNOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7QUFDZjtBQUNBOztB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Z0RBQWdEOztBQUV0RTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3BMQTtBQUFBO0FBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDOzs7Ozs7Ozs7Ozs7QUNsS0E7QUFBQTtBQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVCQUF1QiwwQ0FBMEM7QUFDakU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx5RUFBeUU7QUFDekU7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQzs7Ozs7Ozs7Ozs7O0FDck5BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF3QztBQUNOOztBQUVtQjtBQUNJO0FBQ0o7QUFDSTtBQUNNOzs7QUFHaEQsb0JBQW9CLHFEQUFJO0FBQ3ZDO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxrQ0FBa0MsZ0VBQU07QUFDeEM7QUFDQSxvQ0FBb0Msb0VBQVE7QUFDNUM7QUFDQSxvQ0FBb0Msb0VBQVE7QUFDNUM7QUFDQSxrQ0FBa0MsZ0VBQU07QUFDeEM7QUFDQSx1Q0FBdUMsMEVBQVc7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsNkRBQVM7QUFDakI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNyRkE7QUFBQTtBQUFBO0FBQXdDOztBQUV6QjtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IseUJBQXlCLEVBQUU7QUFDL0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFD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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEM7Ozs7Ozs7Ozs7OztBQ25XQTtBQUFBO0FBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNsREE7QUFBQTtBQUFlO0FBQ2Y7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0IsOERBQThEOztBQUV0RjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FB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O0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixLQUFLO0FBQ0wsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDOzs7Ozs7Ozs7Ozs7QUNuREE7QUFBQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUscUVBQU0sRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2FwcC9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBCb3ggZnJvbSBcIi4vQm94LmpzXCI7XHJcbmltcG9ydCB0aGVtZXMgZnJvbSBcIi4vdGhlbWVzLmpzXCI7XHJcblxyXG5sZXQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID1cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZVxyXG53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xyXG5cclxubGV0IHBhaXJzID0gW1xyXG4gICAgW1tcImxpbmVzXCIsIFwibGluZXNcIl0sIFtcImxpbmVzXCIsIFwibGluZXNcIl1dLFxyXG4gICAgW1tcImxpbmVzMllcIiwgXCJsaW5lczJZXCJdLCBbXCJsaW5lczJZXCIsIFwibGluZXMyWVwiXV0sXHJcbiAgICBbW1wic3RhY2tlZFwiLCBcInN0YWNrZWRcIl0sIFtcInN0YWNrZWRcIiwgXCJzdGFja2VkXCJdXSxcclxuICAgIFtbXCJkYWlseVwiLCBcImRhaWx5XCJdLCBbXCJsaW5lc1wiLCBudWxsXV0sXHJcbiAgICBbW1wicGVyY2VudGFnZVwiLCBcInBlcmNlbnRhZ2VcIl0sIFtcInBpZVwiLCBcInBlcmNlbnRhZ2VcIl1dLFxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIHtcclxuICAgIGNvbnN0cnVjdG9yKGFwcElkKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTY3JvbGxXaWR0aCgpO1xyXG5cclxuICAgICAgICB0aGlzLmlzRGVza3RvcCA9ICEoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KTtcclxuICAgICAgICB0aGlzLnNhdmVkSW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG5cclxuICAgICAgICB0aGlzLmh0bWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhcHBJZCk7XHJcbiAgICAgICAgdGhpcy5odG1sLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiYXBwXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmJveGVzV3JhcHBlciA9IHRoaXMuaHRtbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcclxuICAgICAgICB0aGlzLmJveGVzV3JhcHBlci5jbGFzc05hbWUgPSBcImJveGVzV3JhcHBlclwiO1xyXG5cclxuICAgICAgICB0aGlzLmJveGVzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5ib3hlcy5wdXNoKG5ldyBCb3godGhpcy5ib3hlc1dyYXBwZXIsIFwiI1wiICsgKGkgKyAxKSwgcGFpcnNbaV0sIGkgKyAxKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRoZW1lU3dpdGNoZXJIVE1MID0gdGhpcy5odG1sLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xyXG4gICAgICAgIHRoaXMudGhlbWVTd2l0Y2hlckhUTUwuY2xhc3NOYW1lID0gXCJ0aGVtZVN3aXRjaGVyXCI7XHJcblxyXG4gICAgICAgIHRoaXMudGhlbWUgPSBcIm5pZ2h0XCI7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hUaGVtZSgpO1xyXG4gICAgICAgIHRoaXMudGhlbWVTd2l0Y2hlckhUTUwub25jbGljayA9IHRoaXMuc3dpdGNoVGhlbWUuYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgd2luZG93Lm9ucmVzaXplID0gdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2hUaGVtZSgpIHtcclxuICAgICAgICBpZiAodGhpcy50aGVtZSA9PT0gXCJkYXlcIikge1xyXG4gICAgICAgICAgICB0aGlzLnRoZW1lID0gXCJuaWdodFwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGhlbWUgPSBcImRheVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnRoZW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJkYXlcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMudGhlbWVTd2l0Y2hlckhUTUwudGV4dENvbnRlbnQgPSBcIlN3aXRjaCB0byBOaWdodCBNb2RlXCI7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cudGhlbWUgPSB0aGVtZXMuZGF5O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJuaWdodFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50aGVtZVN3aXRjaGVySFRNTC50ZXh0Q29udGVudCA9IFwiU3dpdGNoIHRvIERheSBNb2RlXCI7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cudGhlbWUgPSB0aGVtZXMubmlnaHQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93LnRoZW1lVHlwZSA9IHRoaXMudGhlbWU7XHJcblxyXG4gICAgICAgIHRoaXMuYm94ZXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uc2V0VGhlbWUoKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kID0gd2luZG93LnRoZW1lLmJhY2tncm91bmQ7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlUmVzaXplKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0Rlc2t0b3ApIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID09PSB0aGlzLnNhdmVkSW5uZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlZElubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJveGVzLmZvckVhY2goaXRlbSA9PiBpdGVtLm9uUmVzaXplKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNjcm9sbFdpZHRoKCkge1xyXG4gICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgZGl2LnN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xyXG4gICAgICAgIGRpdi5zdHlsZS53aWR0aCA9ICc1MHB4JztcclxuICAgICAgICBkaXYuc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xyXG5cclxuICAgICAgICBkaXYuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgbGV0IHNjcm9sbFdpZHRoID0gZGl2Lm9mZnNldFdpZHRoIC0gZGl2LmNsaWVudFdpZHRoO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZGl2KTtcclxuXHJcbiAgICAgICAgd2luZG93LnNjcm9sbFdpZHRoID0gc2Nyb2xsV2lkdGg7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IENoZWNrcyBmcm9tIFwiLi9DaGVja3MuanNcIjtcclxuXHJcbmltcG9ydCBVcHBlciBmcm9tIFwiLi9NYWluQ29udHJvbGxlci9VcHBlci5qc1wiO1xyXG5pbXBvcnQgTG93ZXIgZnJvbSBcIi4vTWFpbkNvbnRyb2xsZXIvTG93ZXIuanNcIjtcclxuaW1wb3J0IFNsaWRlciBmcm9tIFwiLi9NYWluQ29udHJvbGxlci9TbGlkZXIuanNcIjtcclxuXHJcbmltcG9ydCB7IGdldERhdGFGcm9tSlNPTiwgc2xpY2VEYXRhIH0gZnJvbSBcIi4vZGF0YUhhbmRsZXIuanNcIjtcclxuaW1wb3J0IHsgbW9udGhMYWJlbHMgfSBmcm9tIFwiLi9wYXJzZVVuaXh0aW1lLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3gge1xyXG4gICAgY29uc3RydWN0b3IocGFyZW50SFRNTCwgdGl0bGUsIHR5cGVzLCB0eXBlSW5kZXgpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSB7fTtcclxuXHJcbiAgICAgICAgdGhpcy50eXBlcyA9IHR5cGVzO1xyXG4gICAgICAgIHRoaXMudHlwZUluZGV4ID0gdHlwZUluZGV4O1xyXG5cclxuICAgICAgICB0aGlzLnNsaWRlcksgPSAuOTU7XHJcblxyXG4gICAgICAgIHRoaXMuaHRtbCA9IHBhcmVudEhUTUwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgICAgICAgdGhpcy5odG1sLmNsYXNzTmFtZSA9IFwiYm94XCI7XHJcblxyXG4gICAgICAgIHRoaXMucmF0aW8gPSBbNSwgNjIsIDExLCAyMl07XHJcblxyXG4gICAgICAgIHRoaXMudHVtYmxlckxpbWl0ZXIgPSA3O1xyXG5cclxuICAgICAgICB0aGlzLnpvb21lZFNjb3BlU3RhcnRLID0gdHlwZXNbMF1bMF0gPT09IFwiZGFpbHlcIiA/IDEgOiA3O1xyXG5cclxuICAgICAgICAvL9GF0Y3QtNGN0YBcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcblxyXG4gICAgICAgIHRoaXMudHJhbnNEdXIgPSAyMDA7XHJcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uSGFwcGVucyA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmJ1aWxkSGVhZGVyKCk7XHJcbiAgICAgICAgdGhpcy5idWlsZENhbnZhc2VzKCk7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZGVySFRNTCA9IHRoaXMuaHRtbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcclxuICAgICAgICB0aGlzLmxvYWRlckhUTUwuY2xhc3NOYW1lID0gXCJsb2FkZXJCb3hcIjtcclxuICAgICAgICBsZXQgc3BpbiA9IHRoaXMubG9hZGVySFRNTC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcclxuICAgICAgICBzcGluLmNsYXNzTmFtZSA9IFwiY3NzbG9hZC1zcGVlZGluZy13aGVlbFwiO1xyXG5cclxuICAgICAgICB0aGlzLnNldFNpemVzKCk7XHJcblxyXG4gICAgICAgIHRoaXMudG9vbHRpcEhUTUwgPSB0aGlzLmh0bWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgICAgICAgdGhpcy50b29sdGlwSFRNTC5zdHlsZS56SW5kZXggPSAxO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEhUTUwuY2xhc3NOYW1lID0gXCJ0b29sdGlwXCI7XHJcblxyXG4gICAgICAgIHRoaXMudG9vbHRpcEFyZWFIVE1MID0gdGhpcy5odG1sLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEFyZWFIVE1MLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEFyZWFIVE1MLnN0eWxlLnpJbmRleCA9IDI7XHJcbiAgICAgICAgdGhpcy50b29sdGlwQXJlYUhUTUwuY2xhc3NOYW1lID0gXCJ0b29sdGlwQXJlYVwiO1xyXG5cclxuICAgICAgICB0aGlzLmdldERhdGFGcm9tU2VydmVyKClcclxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL9GC0YPRgiDQsdGD0LTQtdGCINC30LDQv9GA0L7RgSDQvdCwINC90LjRhSDQvdCwINGB0LXRgNCy0LXRgCwg0LLQvtGCINC4INCy0YHQtVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gZ2V0RGF0YUZyb21KU09OKGpzb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLm5hbWVzLmxlbmd0aCA9PT0gMSB8fCB0aGlzLmJ1aWxkQ2hlY2tCb3hlcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTaXplcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0Q2FudmFzZXMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0YUZyb21TZXJ2ZXIoZm9sZGVyLCBpdGVtKSB7XHJcbiAgICAgICAgbGV0IHNob3dpbmdMb2FkID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVySFRNTC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVySFRNTC5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgICAgc2hvd2luZ0xvYWQgPSB0cnVlO1xyXG4gICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgIGxldCBwYXRoID0gZm9sZGVyICYmIHRoaXMudHlwZUluZGV4ICE9IDUgPyBgJHt0aGlzLnR5cGVJbmRleH0vJHtmb2xkZXJ9LyR7aXRlbX1gIDogdGhpcy50eXBlSW5kZXg7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vYTAyNDM5ODYueHNwaC5ydS9nZXRUZWxlY2hhcnREYXRhLyR7cGF0aH1gKVxyXG4gICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaG93aW5nTG9hZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+ICh0aGlzLmxvYWRlckhUTUwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiKSwgNjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZXJIVE1MLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZXJIVE1MLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGVySFRNTC5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiQ29ubmVjdGlvbiBFcnJvclwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWZpbmVab29tUmFuZ2Uoem9vbU9iaikge1xyXG4gICAgICAgIGxldCBsID0gem9vbU9iai5sO1xyXG4gICAgICAgIGxldCBtaWRkbGVJbmRleCA9IHpvb21PYmouaSAtIGw7XHJcbiAgICAgICAgbGV0IGQgPSB0aGlzLnpvb21lZFNjb3BlU3RhcnRLLFxyXG4gICAgICAgICAgICBkZCA9IE1hdGguZmxvb3IodGhpcy56b29tZWRTY29wZVN0YXJ0SyAvIDIpO1xyXG4gICAgICAgIGxldCBpMSA9IG1pZGRsZUluZGV4IC0gZGQsIGkyID0gbWlkZGxlSW5kZXggKyBkZDtcclxuICAgICAgICBpMSA9PT0gaTIgJiYgaTIrKztcclxuXHJcbiAgICAgICAgbGV0IGxhc3RJblNjb3BlID0gem9vbU9iai5jb29yZHNYLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgaWYgKGkxIDwgMCkge1xyXG4gICAgICAgICAgICBpMSA9IDA7XHJcbiAgICAgICAgICAgIGkyID0gZCAtIDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpMiA+IGxhc3RJblNjb3BlKSB7XHJcbiAgICAgICAgICAgIGkyID0gbGFzdEluU2NvcGU7XHJcbiAgICAgICAgICAgIGkxID0gaTIgLSBkICsgMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBbaTEsIGkyXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRab29tUGFyYW1zKHpvb21PYmosIHJhbmdlKSB7XHJcbiAgICAgICAgbGV0IFtpMSwgaTJdID0gcmFuZ2U7XHJcbiAgICAgICAgbGV0IHgxID0gem9vbU9iai5jb29yZHNYW2kxXSwgeDIgPSB6b29tT2JqLmNvb3Jkc1hbaTJdO1xyXG4gICAgICAgIGxldCB3ID0gdGhpcy5zaXplcy53O1xyXG5cclxuICAgICAgICB0aGlzLnVwcGVyWFpvb21QYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGxlZnRLOiB4MSAvIHcsXHJcbiAgICAgICAgICAgIG1pZGRsZUs6ICh4MiAtIHgxKSAvIHdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmdsb2JhbFpvb21PZmZzZXQgPSB6b29tT2JqLmkgLyB0aGlzLmRhdGEudmFsdWVzTnVtYmVyO1xyXG4gICAgICAgIHRoaXMubG93ZXJYWm9vbVBhcmFtcyA9IHtcclxuICAgICAgICAgICAgbGVmdEs6IHRoaXMuZ2xvYmFsWm9vbU9mZnNldCxcclxuICAgICAgICAgICAgbWlkZGxlSzogdGhpcy56b29tZWRTY29wZVN0YXJ0SyAvIHRoaXMuZGF0YS52YWx1ZXNOdW1iZXJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5Wm9vbVBhcmFtcyh4U2NvcGVPYmosIHhQYXJhbXMsIGRpcikge1xyXG4gICAgICAgIGxldCBsVyA9IHRoaXMuc2l6ZXMubFc7XHJcbiAgICAgICAgbGV0IGN1clRXID0gdGhpcy5zbGlkZXIudHVtYmxlcldpZHRoO1xyXG5cclxuICAgICAgICBsZXQgem9vbUFyZWFSZWxXaWR0aCA9IHhQYXJhbXMubWlkZGxlSyAqIGxXLFxyXG4gICAgICAgICAgICB6b29tQXJlYVJlbExlZnQgPSB4UGFyYW1zLmxlZnRLICogbFc7XHJcblxyXG4gICAgICAgIGxldCBvYmoxID0ge1xyXG4gICAgICAgICAgICB0dW1ibGVyU3RhcnQ6IC0gKHpvb21BcmVhUmVsTGVmdCAvIHpvb21BcmVhUmVsV2lkdGggKiBsVyksXHJcbiAgICAgICAgICAgIHR1bWJsZXJXaWR0aDogbFcgKiBsVyAvIHpvb21BcmVhUmVsV2lkdGhcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBvYmoyID0ge1xyXG4gICAgICAgICAgICB0dW1ibGVyU3RhcnQ6IHRoaXMuZ2xvYmFsWm9vbU9mZnNldCAqIGxXIC0gKGN1clRXICogeFBhcmFtcy5taWRkbGVLKSAvIDIsXHJcbiAgICAgICAgICAgIHR1bWJsZXJXaWR0aDogY3VyVFcgKiB4UGFyYW1zLm1pZGRsZUtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoZGlyID09PSAxKSB7XHJcbiAgICAgICAgICAgIHhTY29wZU9iai5mcm9tID0gb2JqMTtcclxuICAgICAgICAgICAgeFNjb3BlT2JqLnRvID0gb2JqMjtcclxuICAgICAgICB9IGVsc2UgaWYgKGRpciA9PT0gLTEpIHtcclxuICAgICAgICAgICAgeFNjb3BlT2JqLmZyb20gPSBvYmoyO1xyXG4gICAgICAgICAgICB4U2NvcGVPYmoudG8gPSBvYmoxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblpvb20oem9vbU9iaiwgZGF5LCBtb250aCwgeWVhcikge1xyXG4gICAgICAgIGlmICh0aGlzLnRyYW5zaXRpb25IYXBwZW5zID09PSB0cnVlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uSGFwcGVucyA9IHRydWU7XHJcblxyXG4gICAgICAgIGxldCByYW5nZSA9IHRoaXMuZGVmaW5lWm9vbVJhbmdlKHpvb21PYmopO1xyXG4gICAgICAgIHRoaXMuc2V0Wm9vbVBhcmFtcyh6b29tT2JqLCByYW5nZSk7XHJcblxyXG4gICAgICAgIGxldCBtb250aE51bWJlciA9IFN0cmluZyhtb250aExhYmVscy5pbmRleE9mKG1vbnRoKSArIDEpO1xyXG4gICAgICAgIG1vbnRoTnVtYmVyLmxlbmd0aCA9PT0gMSAmJiAobW9udGhOdW1iZXIgPSBcIjBcIiArIG1vbnRoTnVtYmVyKTtcclxuICAgICAgICBsZXQgZm9sZGVyID0gYCR7eWVhcn0tJHttb250aE51bWJlcn1gO1xyXG4gICAgICAgIGxldCBpdGVtID0gU3RyaW5nKGRheSk7XHJcbiAgICAgICAgaXRlbS5sZW5ndGggPT09IDEgJiYgKGl0ZW0gPSBcIjBcIiArIGl0ZW0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50eXBlSW5kZXggPT09IDUpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhMiA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgbGV0IGwgPSB6b29tT2JqLmw7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHNsaWNlRGF0YSh0aGlzLmRhdGEyLCBsICsgcmFuZ2VbMF0sIGwgKyByYW5nZVsxXSk7XHJcbiAgICAgICAgICAgIGhhbmRsZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0YUZyb21TZXJ2ZXIoZm9sZGVyLCBpdGVtKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkhhcHBlbnMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEyID0gdGhpcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IGdldERhdGFGcm9tSlNPTihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGVIVE1MLnRleHRDb250ZW50ID0gXCJab29tIE91dFwiO1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRlclRpdGxlSFRNTC5zdHlsZS5jb2xvciA9IHdpbmRvdy50aGVtZS56b29tT3V0VGV4dDtcclxuICAgICAgICAgICAgdGhpcy5oZWFkZXJUaXRsZUhUTUwub25jbGljayA9IHRoaXMub25ab29tT3V0LmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgYSA9IHRoaXMuaGVhZGVyVGl0bGVIVE1MLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBcInN2Z1wiKSk7XHJcbiAgICAgICAgICAgIGEuc2V0QXR0cmlidXRlKFwidmlld0JveFwiLCBcIjAgMCAyNCAyNFwiKTtcclxuICAgICAgICAgICAgbGV0IHBhdGggPSBhLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBcInBhdGhcIikpO1xyXG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZShcImRcIixcclxuICAgICAgICAgICAgICAgIFwiTTksMkM1LjEsMiwyLDUuMSwyLDlzMy4xLDcsNyw3YzEuNywwLDMuMy0wLjcsNC42LTEuN2wwLjQsMC40VjE2bDUuNiw1LjZjMC42LDAuNiwxLjQsMC42LDIsMHMwLjYtMS40LDAtMkwxNiwxNGgtMS4zIGwtMC40LTAuNEMxNS4zLDEyLjMsMTYsMTAuNywxNiw5QzE2LDUuMSwxMi45LDIsOSwyeiBNOSw0YzIuOCwwLDUsMi4yLDUsNXMtMi4yLDUtNSw1cy01LTIuMi01LTVTNi4yLDQsOSw0eiBNMTAuOCwxMC4xSDcuMiBjLTAuNiwwLTEuMS0wLjUtMS4xLTEuMXYwYzAtMC42LDAuNS0xLjEsMS4xLTEuMWgzLjZjMC42LDAsMS4xLDAuNSwxLjEsMS4xdjBDMTEuOSw5LjYsMTEuNCwxMC4xLDEwLjgsMTAuMXpcIlxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tYWtlVHJhbnNpdGlvbiguLi50aGlzLnR5cGVzWzFdLCAxKTtcclxuXHJcbiAgICAgICAgICAgIC8v0LvRg9GH0YjQtSDRh9C10YDQtdC3INC80LXRgtC+0LTRi1xyXG4gICAgICAgICAgICB0aGlzLnVwcGVyLnpvb21lZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudXBwZXIuaG91cnNNb2RlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuaXNMaXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudHlwZUluZGV4ID09PSA1ICYmICh0aGlzLmxvd2VyLmNoYXJ0Q29udHJvbGxlci5jb2x1bW5Nb2RlID0gdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uWm9vbU91dCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zbGlkZXIuaXNUb3JuID09PSB0cnVlKSByZXR1cm47IC8vINC00L7QttC40LTQsNC10LzRgdGPINC+0LrQvtC90YfQsNC90LjRjyDQv9C10YDQtdGF0L7QtNCwXHJcblxyXG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YTI7XHJcblxyXG4gICAgICAgIHRoaXMuaGVhZGVyVGl0bGVIVE1MLnF1ZXJ5U2VsZWN0b3IoXCJzdmdcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJUaXRsZUhUTUwuc3R5bGUuY29sb3IgPSB3aW5kb3cudGhlbWUudGV4dDtcclxuICAgICAgICB0aGlzLmhlYWRlclRpdGxlSFRNTC5vbmNsaWNrID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRpdGxlSFRNTC50ZXh0Q29udGVudCA9IHRoaXMudGl0bGU7XHJcblxyXG4gICAgICAgIHRoaXMubWFrZVRyYW5zaXRpb24oLi4udGhpcy50eXBlc1swXSwgLTEpO1xyXG5cclxuICAgICAgICB0aGlzLnVwcGVyLnpvb21lZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXBwZXIuaG91cnNNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuaXNMaXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMudHlwZUluZGV4ID09PSA1ICYmICh0aGlzLmxvd2VyLmNoYXJ0Q29udHJvbGxlci5jb2x1bW5Nb2RlID0gZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VUcmFuc2l0aW9uKHVwcGVyQ2hhcnRUeXBlLCBsb3dlckNoYXJ0VHlwZSwgZGlyKSB7XHJcbiAgICAgICAgdGhpcy50b29sdGlwSFRNTC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgdGhpcy51cHBlci5vblNlbGVjdGlvbkNoYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLnN3aXRjaEluZmx1ZW5jZShmYWxzZSk7XHJcblxyXG4gICAgICAgIGxldCBkaXNhcHBlYXJpbmdIVE1MMSA9IHRoaXMudXBwZXJIVE1MO1xyXG4gICAgICAgIGxldCBkaXNhcHBlYXJpbmdIVE1MMiA9IHRoaXMubG93ZXJIVE1MO1xyXG5cclxuICAgICAgICBsZXQgeyB3LCBsVywgdUgsIGxIIH0gPSB0aGlzLnNpemVzO1xyXG4gICAgICAgIGxldCB0UywgdFc7XHJcblxyXG4gICAgICAgIC8v0LPQvtC0IC0+INC00L3QuFxyXG4gICAgICAgIGlmIChkaXIgPT09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlZFNsaWRlclBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIHR1bWJsZXJTdGFydDogdGhpcy5zbGlkZXIudHVtYmxlclN0YXJ0IC8gbFcsXHJcbiAgICAgICAgICAgICAgICB0dW1ibGVyV2lkdGg6IHRoaXMuc2xpZGVyLnR1bWJsZXJXaWR0aCAvIGxXXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGxldCBkID0gdGhpcy56b29tZWRTY29wZVN0YXJ0SyxcclxuICAgICAgICAgICAgICAgIGRkID0gTWF0aC5mbG9vcih0aGlzLnpvb21lZFNjb3BlU3RhcnRLIC8gMik7XHJcbiAgICAgICAgICAgIHRTID0gbFcgKiBkZCAvIGQ7XHJcbiAgICAgICAgICAgIHRXID0gbFcgLyBkO1xyXG4gICAgICAgICAgICAvL9C00L3QuCAtPiDQs9C+0LQgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXIgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRTID0gdGhpcy5zYXZlZFNsaWRlclBhcmFtcy50dW1ibGVyU3RhcnQgKiBsVztcclxuICAgICAgICAgICAgdFcgPSB0aGlzLnNhdmVkU2xpZGVyUGFyYW1zLnR1bWJsZXJXaWR0aCAqIGxXO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHVwcGVyWFNjb3BlID0ge30sIGxvd2VyWFNjb3BlID0ge307XHJcbiAgICAgICAgdGhpcy5hcHBseVpvb21QYXJhbXModXBwZXJYU2NvcGUsIHRoaXMudXBwZXJYWm9vbVBhcmFtcywgZGlyKTtcclxuICAgICAgICB0aGlzLmFwcGx5Wm9vbVBhcmFtcyhsb3dlclhTY29wZSwgdGhpcy5sb3dlclhab29tUGFyYW1zLCBkaXIpO1xyXG5cclxuICAgICAgICBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgIG5ldyBQcm9taXNlKGhhbmRsZUNoYXJ0cy5iaW5kKHRoaXMpKSxcclxuICAgICAgICAgICAgbmV3IFByb21pc2UoaGFuZGxlU2xpZGVyLmJpbmQodGhpcykpXHJcbiAgICAgICAgXSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b29sdGlwSFRNTC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3aXRjaFRvb2x0aXAodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5odG1sLnJlbW92ZUNoaWxkKGRpc2FwcGVhcmluZ0hUTUwxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZXNbMF1bMF0gPT09IFwiZGFpbHlcIiB8fCB0aGlzLmh0bWwucmVtb3ZlQ2hpbGQoZGlzYXBwZWFyaW5nSFRNTDIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyLnN3aXRjaEluZmx1ZW5jZSh0cnVlLCB0aGlzLnVwcGVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkhhcHBlbnMgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVDaGFydHMocmVzb2x2ZSkge1xyXG4gICAgICAgICAgICBsZXQgW3VwcGVyLCBsb3dlcl0gPSBbdGhpcy51cHBlciwgdGhpcy5sb3dlcl07XHJcblxyXG4gICAgICAgICAgICAvL9C90L7QstGL0LkgaHRtbFxyXG4gICAgICAgICAgICB0aGlzLnVwcGVySFRNTCA9IHRoaXMuaHRtbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpKTtcclxuICAgICAgICAgICAgdGhpcy51cHBlckhUTUwuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGVzWzBdWzBdICE9PSBcImRhaWx5XCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG93ZXJIVE1MID0gdGhpcy5odG1sLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb3dlckhUTUwuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v0L3QvtCy0YvQtSDQutC+0L3RgtGA0L7Qu9C70LXRgNGLXHJcbiAgICAgICAgICAgIGxldCBjdHg7XHJcblxyXG4gICAgICAgICAgICBjdHggPSB0aGlzLnVwcGVySFRNTC5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgICAgICB0aGlzLnVwcGVyID0gbmV3IFVwcGVyKFxyXG4gICAgICAgICAgICAgICAgdXBwZXJDaGFydFR5cGUsIGN0eCwgdywgdUgsIHRoaXMuc2xpZGVySywgdGhpcy5kYXRhLCB0UywgdFcsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwcGVySFRNTCwgdGhpcy51cGRhdGVIZWFkZXJEYXRlLmJpbmQodGhpcyksIHRoaXMub25ab29tLmJpbmQodGhpcylcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGN0eCA9IHRoaXMubG93ZXJIVE1MLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGVzWzBdWzBdID09PSBcImRhaWx5XCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBlbGVtcyA9IHRoaXMuaHRtbC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxvd2VyQmFyXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvd2VyQ2hhcnRUeXBlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgW10uZm9yRWFjaC5jYWxsKGVsZW1zLCBlbGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS50cmFuc2Zvcm0gPSBcInBlcnNwZWN0aXZlKDEwcHgpIHRyYW5zbGF0ZVooLTEwcHgpXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZENoZWNrQm94ZXMoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgW10uZm9yRWFjaC5jYWxsKGVsZW1zLCBlbGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS50cmFuc2Zvcm0gPSBcInBlcnNwZWN0aXZlKDEwcHgpIHRyYW5zbGF0ZVooMClcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNoZWNrQm94ZXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG93ZXIgPSBuZXcgTG93ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgbG93ZXJDaGFydFR5cGUsIGN0eCwgbFcsIGxILCAxLCB0aGlzLmRhdGEsIDAsIGxXLCB0aGlzLmh0bWxcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMub25SZXNpemUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBwZXIuaW5pdEFwcGVhckFuaW1hdGlvbih1cHBlclhTY29wZS5mcm9tLCB0aGlzLnRyYW5zRHVyKTtcclxuICAgICAgICAgICAgdXBwZXIuaW5pdERpc2FwcGVhckFuaW1hdGlvbih1cHBlclhTY29wZS50bywgdGhpcy50cmFuc0R1ciwgcmVzb2x2ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlc1swXVswXSAhPT0gXCJkYWlseVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvd2VyLmluaXRBcHBlYXJBbmltYXRpb24obG93ZXJYU2NvcGUuZnJvbSwgdGhpcy50cmFuc0R1cik7XHJcbiAgICAgICAgICAgICAgICBsb3dlci5pbml0RGlzYXBwZWFyQW5pbWF0aW9uKGxvd2VyWFNjb3BlLnRvLCB0aGlzLnRyYW5zRHVyLCByZXNvbHZlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlU2xpZGVyKHJlc29sdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuaW5pdEFuaW1hdGVUdW1ibGVyKHRTLCB0VywgdGhpcy50cmFuc0R1ciwgcmVzb2x2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaFRvb2x0aXAoc3RhdGUpIHtcclxuICAgICAgICBsZXQgZXZlbnQgPSBzdGF0ZSA/IFwibW91c2VlbnRlclwiIDogXCJtb3VzZWxlYXZlXCI7XHJcbiAgICAgICAgdGhpcy51cHBlci51cHBlckxpc3RlbmVyLmFyZWFIVE1MXHJcbiAgICAgICAgICAgIC5kaXNwYXRjaEV2ZW50KFxyXG4gICAgICAgICAgICAgICAgbmV3IEV2ZW50KGV2ZW50KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkSGVhZGVyKCkge1xyXG4gICAgICAgIHRoaXMuaGVhZGVySFRNTCA9IHRoaXMuaHRtbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcclxuICAgICAgICB0aGlzLmhlYWRlckhUTUwuY2xhc3NOYW1lID0gXCJoZWFkZXJcIjtcclxuXHJcbiAgICAgICAgdGhpcy5oZWFkZXJUaXRsZUhUTUwgPSB0aGlzLmhlYWRlckhUTUwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJUaXRsZUhUTUwuY2xhc3NOYW1lID0gXCJoZWFkZXJUaXRsZVwiO1xyXG4gICAgICAgIHRoaXMudGl0bGVIVE1MID0gdGhpcy5oZWFkZXJUaXRsZUhUTUwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgICAgICAgdGhpcy50aXRsZUhUTUwudGV4dENvbnRlbnQgPSB0aGlzLnRpdGxlO1xyXG5cclxuICAgICAgICB0aGlzLmhlYWRlckRhdGVIVE1MID0gdGhpcy5oZWFkZXJIVE1MLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xyXG4gICAgICAgIHRoaXMuaGVhZGVyRGF0ZUhUTUwuY2xhc3NOYW1lID0gXCJoZWFkZXJEYXRlXCI7XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRDYW52YXNlcygpIHtcclxuICAgICAgICB0aGlzLnVwcGVySFRNTCA9IHRoaXMuaHRtbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpKTtcclxuICAgICAgICB0aGlzLmxvd2VySFRNTCA9IHRoaXMuaHRtbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpKTtcclxuICAgICAgICB0aGlzLnNsaWRlckhUTUwgPSB0aGlzLmh0bWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBwZXJIVE1MLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgICAgIHRoaXMubG93ZXJIVE1MLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgICAgIHRoaXMubG93ZXJIVE1MLmNsYXNzTmFtZSA9IFwibG93ZXJCYXJcIjtcclxuICAgICAgICB0aGlzLnNsaWRlckhUTUwuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJIVE1MLmNsYXNzTmFtZSA9IFwibG93ZXJCYXJcIjtcclxuICAgICAgICB0aGlzLnNsaWRlckhUTUwuc3R5bGUuekluZGV4ID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBidWlsZENoZWNrQm94ZXMoKSB7XHJcbiAgICAgICAgdGhpcy5jaGVja3MgPSBuZXcgQ2hlY2tzKHRoaXMuaHRtbCwgdGhpcy5kYXRhLFxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJ0Q2hlY2tzLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUNoZWNrQm94ZXMoKSB7XHJcbiAgICAgICAgdGhpcy5jaGVja3MuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0Q2FudmFzZXMoKSB7XHJcbiAgICAgICAgbGV0IGN0eDtcclxuICAgICAgICBsZXQgeyB3LCBsVywgbEgsIHVIIH0gPSB0aGlzLnNpemVzO1xyXG5cclxuICAgICAgICBjdHggPSB0aGlzLnVwcGVySFRNTC5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHRoaXMudXBwZXIgPSBuZXcgVXBwZXIoXHJcbiAgICAgICAgICAgIHRoaXMudHlwZXNbMF1bMF0sIGN0eCwgdywgdUgsIHRoaXMuc2xpZGVySywgdGhpcy5kYXRhLCAwLCBsVyAvIHRoaXMudHVtYmxlckxpbWl0ZXIsXHJcbiAgICAgICAgICAgIHRoaXMudXBwZXJIVE1MLCB0aGlzLnVwZGF0ZUhlYWRlckRhdGUuYmluZCh0aGlzKSwgdGhpcy5vblpvb20uYmluZCh0aGlzKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGN0eCA9IHRoaXMubG93ZXJIVE1MLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdGhpcy5sb3dlciA9IG5ldyBMb3dlcihcclxuICAgICAgICAgICAgdGhpcy50eXBlc1swXVsxXSwgY3R4LCBsVywgbEgsIDEsIHRoaXMuZGF0YSwgMCwgbFcsIHRoaXMuaHRtbFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGN0eCA9IHRoaXMuc2xpZGVySFRNTC5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyID0gbmV3IFNsaWRlcihcclxuICAgICAgICAgICAgY3R4LCB0aGlzLnNsaWRlckhUTUwsIGxXLCBsSCwgdGhpcy50dW1ibGVyTGltaXRlciwgdGhpcy51cHBlclxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMudXBwZXIuYW5pbWF0ZSh0cnVlKTtcclxuICAgICAgICB0aGlzLmxvd2VyLmFuaW1hdGUodHJ1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVyLnVwZGF0ZSgwLCBsVyAvIHRoaXMudHVtYmxlckxpbWl0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNoYXJ0Q2hlY2tzKGluZGV4LCBzdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuc3dpdGNoVG9vbHRpcChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy51cHBlci5vbkNoZWNrQm94ZXNTdGF0ZUNoYW5nZShpbmRleCwgc3RhdGUpO1xyXG4gICAgICAgIHRoaXMudHlwZXNbMF1bMF0gPT09IFwiZGFpbHlcIiB8fFxyXG4gICAgICAgICAgICB0aGlzLmxvd2VyLm9uQ2hlY2tCb3hlc1N0YXRlQ2hhbmdlKGluZGV4LCBzdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlSGVhZGVyRGF0ZShkYXRlTGFiZWxzLCB6b29tZWQpIHtcclxuICAgICAgICBpZiAodGhpcy5wcmV2RGF0ZUxhYmVscyA9PT0gZGF0ZUxhYmVscykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJldkRhdGVMYWJlbHMgPSBkYXRlTGFiZWxzO1xyXG5cclxuICAgICAgICBsZXQgaCA9IHRoaXMuaGVhZGVyRGF0ZUhUTUw7XHJcbiAgICAgICAgbGV0IGxhYmVsU3RyaW5nID0gYnVpbGRMYWJlbCgpO1xyXG5cclxuICAgICAgICBpZiAoem9vbWVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGguc3R5bGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIGguc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gXCJsZWZ0IHRvcFwiO1xyXG4gICAgICAgICAgICBoLnN0eWxlLnRyYW5zZm9ybSA9IFwic2NhbGUoLjUpXCI7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaC5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgICAgICAgIGguc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gXCJyaWdodCBib3R0b21cIjtcclxuICAgICAgICAgICAgICAgIGguc3R5bGUudHJhbnNmb3JtID0gXCJzY2FsZSgxKVwiO1xyXG4gICAgICAgICAgICAgICAgaC50ZXh0Q29udGVudCA9IGxhYmVsU3RyaW5nO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGgudGV4dENvbnRlbnQgPSBsYWJlbFN0cmluZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkTGFiZWwoKSB7XHJcbiAgICAgICAgICAgIGxldCBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICBkYXRlTGFiZWxzWzBdLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gaXRlbSArIFwiIFwiO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGRhdGVMYWJlbHNbMV0pIHtcclxuICAgICAgICAgICAgICAgIHN0cmluZyArPSBcIi0gXCI7XHJcbiAgICAgICAgICAgICAgICBkYXRlTGFiZWxzWzFdLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nICs9IGl0ZW0gKyBcIiBcIjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVzaXplKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U2l6ZXMoKTtcclxuXHJcbiAgICAgICAgbGV0IHsgdywgbFcsIHVILCBsSCB9ID0gdGhpcy5zaXplcztcclxuICAgICAgICB0aGlzLnVwcGVyLm9uUmVzaXplKHcsIHVIKTtcclxuICAgICAgICB0aGlzLmxvd2VyLm9uUmVzaXplKGxXLCBsSCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIub25SZXNpemUobFcsIGxIKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTaXplcygpIHtcclxuICAgICAgICBsZXQgc2NyZWVuV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAtIHdpbmRvdy5zY3JvbGxXaWR0aDtcclxuICAgICAgICBsZXQgc2lkZVBhZGRpbmcgPSBzY3JlZW5XaWR0aCAqIC4wMztcclxuXHJcbiAgICAgICAgbGV0IGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIGggPCA2MDAgJiYgKGggPSA2MDApO1xyXG4gICAgICAgIHRoaXMuc2l6ZXMgPSB7XHJcbiAgICAgICAgICAgIHc6IHNjcmVlbldpZHRoIC0gc2lkZVBhZGRpbmcsXHJcbiAgICAgICAgICAgIGxXOiAoc2NyZWVuV2lkdGggLSBzaWRlUGFkZGluZykgKiB0aGlzLnNsaWRlckssXHJcbiAgICAgICAgICAgIGhIOiBoICogdGhpcy5yYXRpb1swXSAvIDEwMCxcclxuICAgICAgICAgICAgdUg6IGggKiB0aGlzLnJhdGlvWzFdIC8gMTAwLFxyXG4gICAgICAgICAgICBsSDogaCAqIHRoaXMucmF0aW9bMl0gLyAxMDBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgeyB3LCBsVywgaEgsIHVILCBsSCB9ID0gdGhpcy5zaXplcztcclxuXHJcbiAgICAgICAgdGhpcy5odG1sLnN0eWxlLmxlZnQgPSBzaWRlUGFkZGluZyAvIDI7XHJcbiAgICAgICAgdGhpcy5odG1sLnN0eWxlLndpZHRoID0gdztcclxuICAgICAgICB0aGlzLmh0bWwuc3R5bGUuaGVpZ2h0ID0gaDtcclxuXHJcbiAgICAgICAgdGhpcy51cHBlckhUTUwuc3R5bGUudG9wID0gaEg7XHJcbiAgICAgICAgdGhpcy51cHBlckhUTUwuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgdyk7XHJcbiAgICAgICAgdGhpcy51cHBlckhUTUwuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIHVIKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb3dlckhUTUwuc3R5bGUudG9wID0gaEggKyB1SDtcclxuICAgICAgICB0aGlzLmxvd2VySFRNTC5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCBsVyk7XHJcbiAgICAgICAgdGhpcy5sb3dlckhUTUwuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIGxIKTtcclxuXHJcbiAgICAgICAgdGhpcy5zbGlkZXJIVE1MLnN0eWxlLnRvcCA9IGhIICsgdUg7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJIVE1MLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIGxXKTtcclxuICAgICAgICB0aGlzLnNsaWRlckhUTUwuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIGxIKTtcclxuXHJcbiAgICAgICAgdGhpcy5oZWFkZXJIVE1MLnN0eWxlLmhlaWdodCA9IGhIO1xyXG4gICAgICAgIHRoaXMuaGVhZGVySFRNTC5zdHlsZS5saW5lSGVpZ2h0ID0gaEggKyBcInB4XCI7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJIVE1MLnN0eWxlLndpZHRoID0gdztcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkZXJIVE1MLnN0eWxlLmhlaWdodCA9IGhIICsgdUggKyBsSDtcclxuXHJcbiAgICAgICAgbGV0IGNCVCA9IGhIICsgdUggKyBsSCwgYkggPSBjQlQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnR5cGVzWzBdWzBdID09PSBcImRhaWx5XCIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrcy5odG1sLnN0eWxlLnRvcCA9IGNCVCAtIGxIO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJIICs9IGxIO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja3MuaHRtbC5zdHlsZS50b3AgPSBjQlQ7XHJcbiAgICAgICAgICAgICAgICBiSCArPSB0aGlzLmNoZWNrcy5odG1sLm9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmh0bWwuc3R5bGUuaGVpZ2h0ID0gYkg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGhlbWUoKSB7XHJcbiAgICAgICAgbGV0IHVwcGVySXNab29tZWQgPSB0aGlzLnVwcGVyICYmIHRoaXMudXBwZXIuem9vbWVkO1xyXG4gICAgICAgIHRoaXMuaGVhZGVyVGl0bGVIVE1MLnN0eWxlLmNvbG9yID0gdXBwZXJJc1pvb21lZCA/IHdpbmRvdy50aGVtZS56b29tT3V0VGV4dCA6IHdpbmRvdy50aGVtZS50ZXh0O1xyXG4gICAgICAgIHRoaXMuaGVhZGVyRGF0ZUhUTUwuc3R5bGUuY29sb3IgPSB3aW5kb3cudGhlbWUudGV4dDtcclxuICAgICAgICB0aGlzLnRvb2x0aXBIVE1MLnN0eWxlLmJhY2tncm91bmQgPSB3aW5kb3cudGhlbWUudG9vbHRpcDtcclxuICAgICAgICB0aGlzLnRvb2x0aXBIVE1MLnN0eWxlLmNvbG9yID0gd2luZG93LnRoZW1lLnRvb2x0aXBUZXh0O1xyXG4gICAgICAgIHRoaXMubG9hZGVySFRNTC5zdHlsZS5iYWNrZ3JvdW5kID0gd2luZG93LnRoZW1lLmJhY2tncm91bmQ7XHJcblxyXG4gICAgICAgIHRoaXMudXBwZXIgJiYgdGhpcy5vblJlc2l6ZSgpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHdpZHRoLCBoZWlnaHQsIG1hcmdpblRvcCwgZGF0YSwgZHJhd1BvcHVwLCBkZWxldGVQb3B1cCkge1xyXG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xyXG5cclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5tYXJnaW5Ub3AgPSBtYXJnaW5Ub3A7XHJcbiAgICAgICAgdGhpcy5jaGFydEhlaWdodCA9IGhlaWdodCArIG1hcmdpblRvcDtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgdGhpcy5kcmF3UG9wdXAgPSBkcmF3UG9wdXA7XHJcbiAgICAgICAgdGhpcy5kZWxldGVQb3B1cCA9IGRlbGV0ZVBvcHVwO1xyXG5cclxuICAgICAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgICAgICAgdGhpcy5hbW91bnRzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuaXNIaWdodGxpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25IYXBwZW5zID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuYXhpc1lBbmltYXRpb25EdXJhdGlvbiA9IDIwMDtcclxuXHJcbiAgICAgICAgdGhpcy5heGlzWW1heCA9IHtcclxuICAgICAgICAgICAgY3VyVjogMCxcclxuICAgICAgICAgICAgbmV3VjogbnVsbCxcclxuICAgICAgICAgICAgbGFzdFNhdmVkTmV3VjogbnVsbCxcclxuICAgICAgICAgICAgYW5pbUJpYXM6IDAsXHJcbiAgICAgICAgICAgIGFuaW1EdXJhdGlvbjogdGhpcy5heGlzWUFuaW1hdGlvbkR1cmF0aW9uXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5heGlzWW1pbiA9IHtcclxuICAgICAgICAgICAgY3VyVjogMCxcclxuICAgICAgICAgICAgbmV3VjogbnVsbCxcclxuICAgICAgICAgICAgbGFzdFNhdmVkTmV3VjogbnVsbCxcclxuICAgICAgICAgICAgYW5pbUJpYXM6IDAsXHJcbiAgICAgICAgICAgIGFuaW1EdXJhdGlvbjogdGhpcy5heGlzWUFuaW1hdGlvbkR1cmF0aW9uXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuY2hlY2tzID0gbmV3IEFycmF5KHRoaXMuZGF0YS52YWx1ZXNZLmxlbmd0aCkuZmlsbCh0cnVlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25SZXNpemUod2lkdGgsIGhlaWdodCwgbWFyZ2luVG9wKSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMubWFyZ2luVG9wID0gbWFyZ2luVG9wO1xyXG4gICAgICAgIHRoaXMuY2hhcnRIZWlnaHQgPSBoZWlnaHQgKyBtYXJnaW5Ub3A7XHJcblxyXG4gICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgaXRlbS53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICBpdGVtLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICAgICAgaXRlbS5tYXJnaW5Ub3AgPSBtYXJnaW5Ub3A7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/QstC+0LfQstGA0LDRidCw0LXRgjogXHJcblxyXG4gICAgLy/QtdGB0LvQuCAwIC0g0L3QtdGCINCw0L3QuNC80LDRhtC40LhcclxuICAgIC8v0LXRgdC70LggMSAtINC40L3QuNGG0LjQsNGG0LjRjyDQstC/0LXRgNCy0YvQtVxyXG4gICAgLy/QtdGB0LvQuCAyIC0g0LjQvdC40YbQsNGG0LjRjyBcclxuICAgIC8v0LXRgdC70LggMyAtINC40LTQtdGCINCw0L3QuNC80LDRhtC40Y9cclxuICAgIC8v0LXRgdC70LggNCAtINCw0L3QuNC80LDRhtC40Y8g0L7QutC+0L3Rh9C10L3QsCAgICBcclxuXHJcbiAgICBhbmltYXRlKG8pIHtcclxuICAgICAgICBsZXQgZGlmID0gby5uZXdWIC0gby5jdXJWO1xyXG5cclxuICAgICAgICBpZiAoZGlmICE9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoby5sYXN0U2F2ZWROZXdWID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBvLmxhc3RTYXZlZE5ld1YgPSBvLmN1clYgPSBvLm5ld1Y7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoby5sYXN0U2F2ZWROZXdWICE9PSBvLm5ld1YpIHtcclxuICAgICAgICAgICAgICAgIG8ubGFzdFNhdmVkTmV3ViA9IG8ubmV3VjtcclxuICAgICAgICAgICAgICAgIG8uYW5pbUJpYXMgPSBNYXRoLnJvdW5kKDEwMCAqIChkaWYgLyBvLmFuaW1EdXJhdGlvbikpIC8gMTAwO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgcyA9IE1hdGgucm91bmQoMTAwICogKG8uY3VyViArIG8uYW5pbUJpYXMgKiB0aGlzLmR0KSkgLyAxMDA7XHJcblxyXG4gICAgICAgICAgICBpZiAoKGRpZiA+IDAgJiYgcyA8IG8ubmV3VikgfHwgKGRpZiA8IDAgJiYgcyA+IG8ubmV3VikpIHtcclxuICAgICAgICAgICAgICAgIG8uY3VyViA9IHM7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvLmN1clYgPSBvLm5ld1Y7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRFQoKSB7XHJcbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy5kdCA9IG5vdyAtIHRoaXMubGFzdFRpbWU7XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5vdztcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlTWFya2luZygpIHsgfVxyXG5cclxuICAgIGFuaW1hdGVWaXNpYmlsaXR5KGluZGV4LCBzdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdLmluaXRWaXNpYmlsaXR5QW5pbWF0aW9uKHN0YXRlLCB0aGlzLmF4aXNZQW5pbWF0aW9uRHVyYXRpb24pO1xyXG4gICAgICAgIHRoaXMuY2hlY2tzW2luZGV4XSA9IHN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHVuaGlnaGxpZ2h0KCkge1xyXG4gICAgICAgIHRoaXMuaXNIaWdodGxpZ2h0ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJlcGFyZVZhbHVlKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkucmVwbGFjZSgvKFxcZCkoPz0oXFxkXFxkXFxkKSsoW15cXGRdfCQpKS9nLCAnJDEgJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd1ZlcnRpY2FsTGluZSgpIHtcclxuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHg7XHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gd2luZG93LnRoZW1lLmdyaWRMaW5lcztcclxuICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4Lm1vdmVUbyh0aGlzLmZvY3VzWCwgMCk7XHJcbiAgICAgICAgY3R4LmxpbmVUbyh0aGlzLmZvY3VzWCwgdGhpcy5jaGFydEhlaWdodCk7XHJcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgfVxyXG59IiwiZnVuY3Rpb24gaGV4RGVjKGgpIHtcclxuICAgIHZhciBtID0gaC5zbGljZSgxKS5tYXRjaCgvLnsyfS9nKTtcclxuXHJcbiAgICBtWzBdID0gcGFyc2VJbnQobVswXSwgMTYpO1xyXG4gICAgbVsxXSA9IHBhcnNlSW50KG1bMV0sIDE2KTtcclxuICAgIG1bMl0gPSBwYXJzZUludChtWzJdLCAxNik7XHJcblxyXG4gICAgcmV0dXJuIG0uam9pbignLCcpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoY3R4LCBoZWlnaHQsIG1hcmdpblRvcCwgY29sb3IsIHZhbHVlcykge1xyXG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xyXG5cclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB0aGlzLm1hcmdpblRvcCA9IG1hcmdpblRvcDtcclxuXHJcbiAgICAgICAgdGhpcy5jb2xvciA9IGhleERlYyhjb2xvcik7XHJcblxyXG4gICAgICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xyXG5cclxuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSAxO1xyXG5cclxuICAgICAgICB0aGlzLmNvb3Jkc1kgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25IYXBwZW5zID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/RgdC40L3RhdGA0L7QvdC40LfQsNGG0LjRjyDQvdC1INGC0YDQtdGD0LHRg9C10YLRgdGPLCDQvNC+0LbQvdC+INC90LUg0LfQsNC80L7RgNCw0YfQuNCy0LDRgtGM0YHRj1xyXG4gICAgLy/QuCDQsNC90LjQvNC40YDQvtCy0LDRgtGMINC70L7QutCw0LvRjNC90L5cclxuICAgIGluaXRWaXNpYmlsaXR5QW5pbWF0aW9uKGRpciwgZHVyKSB7XHJcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5yZXF1ZXN0SUQpO1xyXG5cclxuICAgICAgICB0aGlzLmFuaW1TdGVwID0gMSAvIGR1cjtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB0aGlzLmFuaW1hdGVWaXNpYmlsaXR5KGRpcik7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVZpc2liaWxpdHkoZGlyKSB7XHJcbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy5kdCA9IG5vdyAtIHRoaXMubGFzdFRpbWU7XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5vdztcclxuXHJcbiAgICAgICAgaWYgKGRpciA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnZpc2liaWxpdHkgKz0gdGhpcy5hbmltU3RlcCAqIHRoaXMuZHQ7XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eSA+PSAxICYmICh0aGlzLnZpc2liaWxpdHkgPSAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnZpc2liaWxpdHkgLT0gdGhpcy5hbmltU3RlcCAqIHRoaXMuZHQ7XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eSA8PSAwICYmICh0aGlzLnZpc2liaWxpdHkgPSAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0YXJnZXQgPSArZGlyO1xyXG4gICAgICAgIGlmICh0aGlzLnZpc2liaWxpdHkgPT09IHRhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkhhcHBlbnMgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkhhcHBlbnMgPSB0cnVlO1xyXG4gICAgICAgICAgICAodGhpcy5yZXF1ZXN0SUQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hbmltYXRlVmlzaWJpbGl0eShkaXIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBCYXNlIGZyb20gXCIuL0Jhc2UvQmFzZS5qc1wiO1xyXG5cclxuZnVuY3Rpb24gaGV4RGVjKGgpIHtcclxuICAgIHZhciBtID0gaC5zbGljZSgxKS5tYXRjaCgvLnsyfS9nKTtcclxuXHJcbiAgICBtWzBdID0gcGFyc2VJbnQobVswXSwgMTYpO1xyXG4gICAgbVsxXSA9IHBhcnNlSW50KG1bMV0sIDE2KTtcclxuICAgIG1bMl0gPSBwYXJzZUludChtWzJdLCAxNik7XHJcblxyXG4gICAgcmV0dXJuIG0uam9pbignLCcpO1xyXG59O1xyXG5cclxuY2xhc3MgRGFpbHlCYXNlIGV4dGVuZHMgQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHdpZHRoLCBoZWlnaHQsIG1hcmdpblRvcCwgZGF0YSxcclxuICAgICAgICBkcmF3UG9wdXApIHtcclxuICAgICAgICBzdXBlcihjdHgsIHdpZHRoLCBoZWlnaHQsIG1hcmdpblRvcCwgZGF0YSwgZHJhd1BvcHVwKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDb29yZHNZKGwsIHIpIHtcclxuICAgICAgICB0aGlzLmNvb3Jkc1kgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHIgLSBsICsgMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB5ID0gdGhpcy5oZWlnaHQgLSB0aGlzLmRhdGEudmFsdWVzWVswXVtpICsgbF0gKlxyXG4gICAgICAgICAgICAgICAgKHRoaXMuaGVpZ2h0IC8gdGhpcy5heGlzWW1heC5jdXJWKVxyXG4gICAgICAgICAgICAgICAgKyB0aGlzLm1hcmdpblRvcDtcclxuICAgICAgICAgICAgdGhpcy5jb29yZHNZLnB1c2goTWF0aC5yb3VuZCh5ICogMTAwKSAvIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vINC80LXRgtC+0LQsINC40L3QuNGG0LjQuNGA0YPRjtGJ0LjQuSDQsNC90LjQvNCw0YbQuNGOINC80LDRgdGI0YLQsNCx0LAg0L/QviDQvtGB0LggWVxyXG4gICAgdXBkYXRlVmVydGljYWxCb3VuZHMobCwgcikge1xyXG4gICAgICAgIGxldCByZXMgPSB0aGlzLmRlZmluZVZlcnRpY2FsQm91bmRzKGwsIHIpO1xyXG4gICAgICAgIHRoaXMuYXhpc1ltYXgubmV3ViA9IHJlcy5tYXg7XHJcbiAgICB9XHJcblxyXG4gICAgZGVmaW5lVmVydGljYWxCb3VuZHMobCwgcikge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1heDogTWF0aC5tYXgoLi4udGhpcy5kYXRhLnZhbHVlc1lbMF0uc2xpY2UoXHJcbiAgICAgICAgICAgICAgICBsLCByKSksIG1pbjogMFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyhzaG91bGRVcGRhdGUsIGNvb3Jkc1gsIGxlZnRCb3VuZEluZGV4LCByaWdodEJvdW5kSW5kZXgpIHtcclxuICAgICAgICBsZXQgaW5wdXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHNob3VsZFVwZGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURUKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzID0gdGhpcy5hbmltYXRlKHRoaXMuYXhpc1ltYXgpO1xyXG4gICAgICAgICAgICBpbnB1dCA9ICEhcmVzIHx8IGlucHV0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlcyA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlTWFya2luZyh0aGlzLmF4aXNZQW5pbWF0aW9uRHVyYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5heGlzWW1heC5uZXdWLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvb3Jkc1kobGVmdEJvdW5kSW5kZXgsIHJpZ2h0Qm91bmRJbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHg7XHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG5cclxuICAgICAgICBsZXQgc2NhbGVYID0gY29vcmRzWFsxXSAtIGNvb3Jkc1hbMF07XHJcbiAgICAgICAgbGV0IGxhc3RYID0gY29vcmRzWFtjb29yZHNYLmxlbmd0aCAtIDFdICsgc2NhbGVYO1xyXG5cclxuICAgICAgICBsZXQgcHJldlkgPSB0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luVG9wO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb29yZHNZLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHByZXZZID0gdGhpcy5kcmF3U2VnbWVudChcclxuICAgICAgICAgICAgICAgIHByZXZZLCBjb29yZHNYW2ldLCB0aGlzLmNvb3Jkc1lbaV1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN0eC5saW5lVG8obGFzdFgsIHByZXZZKTtcclxuICAgICAgICBjdHgubGluZVRvKGxhc3RYLCB0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luVG9wKTtcclxuXHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGByZ2JhKCR7dGhpcy5jb2xvcn0sICR7dGhpcy52aXNpYmlsaXR5fSlgO1xyXG4gICAgICAgIGN0eC5maWxsKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaXNIaWdodGxpZ2h0ID09PSB0cnVlICYmIHRoaXMuZHJhd01hc2soY29vcmRzWCwgc2NhbGVYKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdTZWdtZW50KHByZXZZLCB4LCB5KSB7XHJcbiAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHByZXZZKTtcclxuICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCwgeSk7XHJcbiAgICAgICAgcmV0dXJuIHk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEYWlseSBleHRlbmRzIERhaWx5QmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHdpZHRoLCBoZWlnaHQsIG1hcmdpblRvcCwgZGF0YSxcclxuICAgICAgICBkcmF3UG9wdXAsIGFuaW1hdGVNYXJraW5nKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKGN0eCwgd2lkdGgsIGhlaWdodCwgbWFyZ2luVG9wLCBkYXRhLCBkcmF3UG9wdXApO1xyXG5cclxuICAgICAgICB0aGlzLmNvbG9yID0gaGV4RGVjKHRoaXMuZGF0YS5jb2xvcnNbMF0pO1xyXG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9IDE7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhcnRIZWlnaHQgPSBoZWlnaHQgKyBtYXJnaW5Ub3A7XHJcblxyXG4gICAgICAgIHRoaXMuYW5pbWF0ZU1hcmtpbmcgPSBhbmltYXRlTWFya2luZztcclxuICAgIH1cclxuXHJcblxyXG4gICAgaGlnaGxpZ2h0SXRlbSh4LCB5LCBjb29yZHNYLCBzY2FsZVgsIGxlZnRCb3VuZEluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5mb2N1c1ggPSB4O1xyXG4gICAgICAgIHRoaXMuZm9jdXNZID0geTtcclxuXHJcbiAgICAgICAgdGhpcy5pc0hpZ2h0bGlnaHQgPSB0cnVlO1xyXG4gICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoKHggLSBjb29yZHNYWzBdKSAvIHNjYWxlWCk7IC8v0LLQvNC10YHRgtC+IHJvdW5kXHJcbiAgICAgICAgaW5kZXggPCAwICYmIChpbmRleCA9IDApO1xyXG5cclxuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkSW5kZXggPSBpbmRleDtcclxuXHJcbiAgICAgICAgbGV0IGRvY2tldHMgPSBbe1xyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLmRhdGEubmFtZXNbMF0sXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByZXBhcmVWYWx1ZSh0aGlzLmRhdGEudmFsdWVzWVswXVtpbmRleCArIGxlZnRCb3VuZEluZGV4XSksXHJcbiAgICAgICAgfV07XHJcblxyXG4gICAgICAgIHRoaXMuZHJhd1BvcHVwKGluZGV4LCBkb2NrZXRzKTtcclxuICAgIH1cclxuXHJcbiAgICB1bmhpZ2hsaWdodCgpIHtcclxuICAgICAgICB0aGlzLmlzSGlnaHRsaWdodCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy9yZXBcclxuICAgIGRyYXdNYXNrKGNvb3Jkc1gsIHNjYWxlWCkge1xyXG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eDtcclxuXHJcbiAgICAgICAgbGV0IGkgPSB0aGlzLmhpZ2hsaWdodGVkSW5kZXg7XHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG5cclxuICAgICAgICBjdHgubW92ZVRvKDAsIDApO1xyXG4gICAgICAgIGN0eC5saW5lVG8oMCwgdGhpcy5oZWlnaHQgKyB0aGlzLm1hcmdpblRvcCk7XHJcbiAgICAgICAgY3R4LmxpbmVUbyhjb29yZHNYW2ldLCB0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luVG9wKTtcclxuICAgICAgICBjdHgubGluZVRvKGNvb3Jkc1hbaV0sIHRoaXMuY29vcmRzWVtpXSk7XHJcbiAgICAgICAgY3R4LmxpbmVUbyhjb29yZHNYW2ldICsgc2NhbGVYLCB0aGlzLmNvb3Jkc1lbaV0pO1xyXG4gICAgICAgIGN0eC5saW5lVG8oY29vcmRzWFtpXSArIHNjYWxlWCwgdGhpcy5oZWlnaHQgKyB0aGlzLm1hcmdpblRvcCk7XHJcbiAgICAgICAgY3R4LmxpbmVUbyh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luVG9wKTtcclxuICAgICAgICBjdHgubGluZVRvKHRoaXMud2lkdGgsIDApO1xyXG5cclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gd2luZG93LnRoZW1lLmhpZ2hsaWdodE1hc2s7XHJcbiAgICAgICAgY3R4LmZpbGwoKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8vINCx0YPQtNGDINC00LXQu9Cw0YLRjCDQvdCw0YHQu9C10LTQvtCy0LDQvdC40LUg0YEg0L3QtdC80L3QvtCz0L4g0YDQsNC30L3Ri9C8INGE0YPQvdC60YbQuNC+0L3QsNC70L7QvFxyXG5leHBvcnQgY2xhc3MgRGFpbHlMIGV4dGVuZHMgRGFpbHlCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKGN0eCwgd2lkdGgsIGhlaWdodCwgbWFyZ2luVG9wLCBkYXRhKSB7XHJcbiAgICAgICAgc3VwZXIoY3R4LCB3aWR0aCwgaGVpZ2h0LCBtYXJnaW5Ub3AsIGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbG9yID0gaGV4RGVjKHRoaXMuZGF0YS5jb2xvcnNbMF0pO1xyXG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9IDE7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCBJdGVtQmFzZSBmcm9tIFwiLi4vQmFzZS9JdGVtQmFzZS5qc1wiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW0gZXh0ZW5kcyBJdGVtQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihjdHgsIGhlaWdodCwgbWFyZ2luVG9wLCBjb2xvciwgdmFsdWVzLCBsaW5lV2lkdGgpIHtcclxuICAgICAgICBzdXBlcihjdHgsIGhlaWdodCwgbWFyZ2luVG9wLCBjb2xvciwgdmFsdWVzKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaXJjbGVSYWRpdXMgPSA2O1xyXG4gICAgICAgIHRoaXMubGluZVdpZHRoID0gbGluZVdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNvb3Jkc1kobCwgciwgbWF4LCBtaW4pIHtcclxuICAgICAgICAvLyBkZWJ1Z2dlcjtcclxuICAgICAgICB0aGlzLmNvb3Jkc1kgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHIgLSBsICsgMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCByYW5nZSA9IG1heCAtIG1pbjtcclxuICAgICAgICAgICAgbGV0IHkgPSAobWF4IC0gdGhpcy52YWx1ZXNbaSArIGxdKSAvIHJhbmdlICogdGhpcy5oZWlnaHRcclxuICAgICAgICAgICAgICAgICsgdGhpcy5tYXJnaW5Ub3A7XHJcbiAgICAgICAgICAgIHRoaXMuY29vcmRzWS5wdXNoKE1hdGgucm91bmQoeSAqIDEwMCkgLyAxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkcmF3KGNvb3Jkc1gpIHtcclxuICAgICAgICBpZiAodGhpcy52aXNpYmlsaXR5ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBjdHggPSB0aGlzLmN0eDtcclxuXHJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGByZ2JhKCR7dGhpcy5jb2xvcn0sICR7dGhpcy52aXNpYmlsaXR5fSlgO1xyXG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gdGhpcy5saW5lV2lkdGg7XHJcbiAgICAgICAgICAgIGN0eC5saW5lQ2FwID0gXCJyb3VuZFwiO1xyXG4gICAgICAgICAgICBjdHgubGluZUpvaW4gPSBcInJvdW5kXCI7XHJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRzWC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKGNvb3Jkc1hbaV0sIHRoaXMuY29vcmRzWVtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0aW9uSGFwcGVucztcclxuICAgIH1cclxuXHJcbiAgICAvLyDQsNC90LjQvNC40YDQvtCy0LDRgtGMINC90YPQttC90L4g0YLQvtC70YzQutC+IFguINCX0LDRgtC10Lwg0LrQsNC20LTQsNGPINC70LjQvdC40Y8g0LTQvtC70LbQvdCwINGB0LDQvNCwINC/0L7QvdGP0YLRjCwg0LrQsNC60L7QuSDQvdGD0LbQtdC9IFlcclxuICAgIC8vINC40LzQtdGPINCyINC90LDQu9C40YfQuNC4IFgg0LggY29vcmRzWFxyXG5cclxuXHJcbiAgICBkcmF3Q2lyY2xlSW5Qb2ludCh4LCBjb29yZHNYKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlzaWJpbGl0eSA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHg7XHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gYHJnYmEoJHt0aGlzLmNvbG9yfSwgJHt0aGlzLnZpc2liaWxpdHl9KWA7XHJcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHRoaXMubGluZVdpZHRoO1xyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuXHJcbiAgICAgICAgbGV0IGR4ID0gY29vcmRzWFsxXSAtIGNvb3Jkc1hbMF07XHJcblxyXG4gICAgICAgIGxldCBpID0gTWF0aC5mbG9vcigoeCAtIGNvb3Jkc1hbMF0pIC8gZHgpO1xyXG4gICAgICAgIGkgPCAwICYmIChpID0gMCk7XHJcblxyXG4gICAgICAgIGxldCBkeSA9ICh0aGlzLmNvb3Jkc1lbaSArIDFdIC0gdGhpcy5jb29yZHNZW2ldKSB8fCAwO1xyXG4gICAgICAgIGxldCB5ID0gdGhpcy5jb29yZHNZW2ldICsgZHkgKiAoeCAtIGNvb3Jkc1hbaV0pIC8gZHg7XHJcblxyXG4gICAgICAgIGN0eC5hcmMoeCwgeSwgdGhpcy5jaXJjbGVSYWRpdXMsIDAsIDIgKiBNYXRoLlBJLCB0cnVlKTtcclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB3aW5kb3cudGhlbWUuYmFja2dyb3VuZDtcclxuICAgICAgICBjdHguYXJjKHgsIHksIHRoaXMuY2lyY2xlUmFkaXVzIC0gdGhpcy5saW5lV2lkdGgsIDAsIDIgKiBNYXRoLlBJLCB0cnVlKTtcclxuICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBJdGVtQmFzZSBmcm9tIFwiLi4vQmFzZS9JdGVtQmFzZS5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbSBleHRlbmRzIEl0ZW1CYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKGN0eCwgaGVpZ2h0LCBtYXJnaW5Ub3AsIGNvbG9yLCB2YWx1ZXMpIHtcclxuICAgICAgICBzdXBlcihjdHgsIGhlaWdodCwgbWFyZ2luVG9wLCBjb2xvciwgdmFsdWVzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ29vcmRzWShsLCByLCBjdXJBbW91bnRzLCBhbW91bnRzKSB7XHJcbiAgICAgICAgdGhpcy5jb29yZHNZID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYW1vdW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBhbW91bnRzW2ldINC90LUg0LTQsSDRgNCw0LLQtdC9IDBcclxuICAgICAgICAgICAgbGV0IHkgPSBjdXJBbW91bnRzW2ldIC8gYW1vdW50c1tpXSAqXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCArXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmdpblRvcDtcclxuICAgICAgICAgICAgLy/RgtGD0YIg0LzQsSDRh9GC0L4t0YLQviDQvdC10L/RgNC40Y/RgtC90L7QtVxyXG4gICAgICAgICAgICB0aGlzLmNvb3Jkc1kucHVzaChNYXRoLnJvdW5kKHkgKiAxMDApIC8gMTAwKTtcclxuXHJcbiAgICAgICAgICAgIGN1ckFtb3VudHNbaV0gKz0gdGhpcy52YWx1ZXNbaSArIGxdICogdGhpcy52aXNpYmlsaXR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGN1ckFtb3VudHM7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyhjb29yZHNYLCBjb2x1bW5Nb2RlID0gZmFsc2UsIHdpZHRoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlzaWJpbGl0eSAhPT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHg7XHJcblxyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY29vcmRzWFswXSwgdGhpcy5oZWlnaHQgKyB0aGlzLm1hcmdpblRvcCk7XHJcbiAgICAgICAgICAgIGlmIChjb2x1bW5Nb2RlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldlkgPSB0aGlzLmNvb3Jkc1kucmVkdWNlKGRyYXdDb2x1bW5TZWdtZW50LCB0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luVG9wKTtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lVG8od2lkdGgsIHByZXZZKTtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lVG8od2lkdGgsIHRoaXMuaGVpZ2h0ICsgdGhpcy5tYXJnaW5Ub3ApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZHNZLmZvckVhY2goZHJhd1NlZ21lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8oXHJcbiAgICAgICAgICAgICAgICBjb29yZHNYW2Nvb3Jkc1gubGVuZ3RoIC0gMV0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luVG9wXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gYHJnYmEoJHt0aGlzLmNvbG9yfSwgJHt0aGlzLnZpc2liaWxpdHl9KWA7XHJcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBkcmF3U2VnbWVudChjdXJWYWwsIGkpIHtcclxuICAgICAgICAgICAgICAgIGxldCB4ID0gY29vcmRzWFtpXTtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lVG8oeCwgY3VyVmFsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZHJhd0NvbHVtblNlZ21lbnQocHJldlZhbCwgY3VyVmFsLCBpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IGNvb3Jkc1hbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgY3R4LmxpbmVUbyh4LCBwcmV2VmFsKTtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lVG8oeCwgY3VyVmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VyVmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGlvbkhhcHBlbnM7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IEl0ZW1CYXNlIGZyb20gXCIuLi9CYXNlL0l0ZW1CYXNlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtIGV4dGVuZHMgSXRlbUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoY3R4LCBjZW50ZXJYLCBjZW50ZXJZLCByYWRpdXMsIGNvbG9yKSB7XHJcbiAgICAgICAgc3VwZXIoY3R4LCBudWxsLCBudWxsLCBjb2xvcik7XHJcblxyXG4gICAgICAgIHRoaXMuY2VudGVyWDAgPSBjZW50ZXJYO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWTAgPSBjZW50ZXJZO1xyXG5cclxuICAgICAgICB0aGlzLmNlbnRlclggPSBjZW50ZXJYO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWSA9IGNlbnRlclk7XHJcblxyXG4gICAgICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xyXG4gICAgICAgIHRoaXMubWF4TGFiZWxTaXplID0gdGhpcy5yYWRpdXMgKiAyIC8gNTtcclxuXHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25IYXBwZW5zMiA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnB1c2hPZmZzZXQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShzdGFydEFuZ2xlLCB2YWx1ZSwgdG90YWwpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgICAgIGxldCBhbmdsZSA9IDIgKiBNYXRoLlBJICogdmFsdWUgLyB0b3RhbDtcclxuXHJcbiAgICAgICAgdGhpcy5zdGFydEFuZ2xlID0gc3RhcnRBbmdsZTtcclxuICAgICAgICB0aGlzLmVuZEFuZ2xlID0gc3RhcnRBbmdsZSArIGFuZ2xlO1xyXG5cclxuICAgICAgICBsZXQgcGVyY2VudGFnZSA9IE1hdGgucm91bmQodmFsdWUgLyB0b3RhbCAqIDEwMCk7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IHBlcmNlbnRhZ2UgKyBcIiVcIjtcclxuICAgICAgICB0aGlzLnNpemUgPSB0aGlzLmRlZmluZUxhYmVsU2l6ZShwZXJjZW50YWdlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5kQW5nbGU7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRFQoKSB7XHJcbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy5kdCA9IG5vdyAtIHRoaXMubGFzdFRpbWU7XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5vdztcclxuICAgIH1cclxuXHJcbiAgICBpbml0UHVzaEFuaW1hdGlvbihkaXIsIGR1cikge1xyXG4gICAgICAgIGlmIChkaXIgPT09IHRoaXMucHVzaERpcikgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZURUKCk7XHJcbiAgICAgICAgdGhpcy5hbmltU3RlcCA9IDEgLyBkdXI7XHJcbiAgICAgICAgdGhpcy5wdXNoRGlyID0gZGlyO1xyXG5cclxuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnJlcXVlc3RJRDIpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uSGFwcGVuczIgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0ZVB1c2goZGlyKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlUHVzaChkaXIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZURUKCk7XHJcblxyXG4gICAgICAgIGlmIChkaXIgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IGEgPSB0aGlzLnB1c2hPZmZzZXQgKyB0aGlzLmFuaW1TdGVwICogdGhpcy5kdFxyXG4gICAgICAgICAgICB0aGlzLnB1c2hPZmZzZXQgPSBhID49IDEgPyAxIDogYTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgYSA9IHRoaXMucHVzaE9mZnNldCAtIHRoaXMuYW5pbVN0ZXAgKiB0aGlzLmR0O1xyXG4gICAgICAgICAgICB0aGlzLnB1c2hPZmZzZXQgPSBhIDw9IDAgPyAwIDogYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhbmdsZSA9IHRoaXMuc3RhcnRBbmdsZSAtICh0aGlzLnN0YXJ0QW5nbGUgLSB0aGlzLmVuZEFuZ2xlKSAvIDI7XHJcbiAgICAgICAgbGV0IG9mZnNldCA9IDE1O1xyXG5cclxuICAgICAgICB0aGlzLmNlbnRlclggPSB0aGlzLmNlbnRlclgwICsgdGhpcy5wdXNoT2Zmc2V0ICogTWF0aC5jb3MoYW5nbGUpICogb2Zmc2V0O1xyXG4gICAgICAgIHRoaXMuY2VudGVyWSA9IHRoaXMuY2VudGVyWTAgKyB0aGlzLnB1c2hPZmZzZXQgKiBNYXRoLnNpbihhbmdsZSkgKiBvZmZzZXQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnB1c2hPZmZzZXQgPT09ICtkaXIpIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25IYXBwZW5zMiA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdElEMiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGVQdXNoKGRpcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkcmF3UGllU2xpY2VMYWJlbChsYWJlbCwgc2l6ZSwgc3RhcnRBbmdsZSwgZW5kQW5nbGUpIHtcclxuICAgICAgICBsZXQgZm9udFJhdGlvID0gMC44O1xyXG5cclxuICAgICAgICBsZXQgYW5nbGUgPSBzdGFydEFuZ2xlIC0gKHN0YXJ0QW5nbGUgLSBlbmRBbmdsZSkgLyAyO1xyXG5cclxuICAgICAgICBsZXQgd2lkdGggPSBzaXplICogKGxhYmVsLnRvU3RyaW5nKCkubGVuZ3RoKSAqIGZvbnRSYXRpbztcclxuICAgICAgICBsZXQgYmlhc1kgPSBzaXplIC8gMjtcclxuICAgICAgICBsZXQgYmlhc1ggPSB3aWR0aCAvIDI7XHJcbiAgICAgICAgbGV0IHJhZGl1cyA9IHRoaXMucmFkaXVzIC0gKHNpemUgKyB3aWR0aCkgLyA0O1xyXG5cclxuICAgICAgICBsZXQgcmFkaXVzSyA9IDEgLSAoTWF0aC5hYnMoc3RhcnRBbmdsZSAtIGVuZEFuZ2xlKSAvICgyICogTWF0aC5QSSkpO1xyXG5cclxuICAgICAgICBsZXQgeCA9IHRoaXMuY2VudGVyWCArIHJhZGl1cyAqIHJhZGl1c0sgKiBNYXRoLmNvcyhhbmdsZSkgLSBiaWFzWDtcclxuICAgICAgICBsZXQgeSA9IHRoaXMuY2VudGVyWSArIHJhZGl1cyAqIHJhZGl1c0sgKiBNYXRoLnNpbihhbmdsZSkgKyBiaWFzWTtcclxuXHJcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4O1xyXG5cclxuICAgICAgICBjdHguZm9udCA9IGAke3NpemV9cHggVmVyZGFuYWA7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICBjdHguZmlsbFRleHQobGFiZWwsIHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v0LIg0LrRg9GB0L7Rh9C10LpcclxuICAgIGRlZmluZUxhYmVsU2l6ZShwZXJjZW50YWdlKSB7XHJcbiAgICAgICAgbGV0IHNpemVLO1xyXG5cclxuICAgICAgICBpZiAocGVyY2VudGFnZSA8IDIwKSB7XHJcbiAgICAgICAgICAgIHNpemVLID0gMjA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2l6ZUsgPSBwZXJjZW50YWdlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNpemVLIC8gMTAwICogdGhpcy5tYXhMYWJlbFNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/QsiDQutGD0YHQvtGH0LXQulxyXG4gICAgZHJhd1BpZVNsaWNlKHN0YXJ0QW5nbGUsIGVuZEFuZ2xlKSB7XHJcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4O1xyXG5cclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gYHJnYmEoJHt0aGlzLmNvbG9yfSwgJHt0aGlzLnZpc2liaWxpdHl9KWA7XHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGN0eC5tb3ZlVG8odGhpcy5jZW50ZXJYLCB0aGlzLmNlbnRlclkpO1xyXG4gICAgICAgIGN0eC5hcmModGhpcy5jZW50ZXJYLCB0aGlzLmNlbnRlclksIHRoaXMucmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSk7XHJcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIGN0eC5maWxsKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlzaWJpbGl0eSAhPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImRlc3RpbmF0aW9uLW92ZXJcIjtcclxuICAgICAgICAgICAgdGhpcy5kcmF3UGllU2xpY2UodGhpcy5zdGFydEFuZ2xlLCB0aGlzLmVuZEFuZ2xlKTtcclxuICAgICAgICAgICAgdGhpcy5jdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdQaWVTbGljZUxhYmVsKHRoaXMubGFiZWwsIHRoaXMuc2l6ZSwgdGhpcy5zdGFydEFuZ2xlLCB0aGlzLmVuZEFuZ2xlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGlvbkhhcHBlbnMgfHwgdGhpcy5hbmltYXRpb25IYXBwZW5zMjtcclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IEl0ZW1CYXNlIGZyb20gXCIuLi9CYXNlL0l0ZW1CYXNlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtIGV4dGVuZHMgSXRlbUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoY3R4LCBoZWlnaHQsIG1hcmdpblRvcCwgY29sb3IsIHZhbHVlcykge1xyXG4gICAgICAgIHN1cGVyKGN0eCwgaGVpZ2h0LCBtYXJnaW5Ub3AsIGNvbG9yLCB2YWx1ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNvb3Jkc1kobCwgciwgbWF4LCBhbW91bnRzKSB7XHJcbiAgICAgICAgdGhpcy5jb29yZHNZID0gW107XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFtb3VudHMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFtb3VudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHkgPSB0aGlzLmhlaWdodCAtXHJcbiAgICAgICAgICAgICAgICBhbW91bnRzW2ldICogdGhpcy5oZWlnaHQgLyBtYXhcclxuICAgICAgICAgICAgICAgICsgdGhpcy5tYXJnaW5Ub3A7XHJcbiAgICAgICAgICAgIHRoaXMuY29vcmRzWS5wdXNoKE1hdGgucm91bmQoeSAqIDEwMCkgLyAxMDApO1xyXG5cclxuICAgICAgICAgICAgYW1vdW50c1tpXSAtPSB0aGlzLnZhbHVlc1tpICsgbF0gKiB0aGlzLnZpc2liaWxpdHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYW1vdW50cztcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KGNvb3Jkc1gsIGxhc3RYKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlzaWJpbGl0eSAhPT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHg7XHJcblxyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGxldCBsYXN0WSA9IHRoaXMuY29vcmRzWS5yZWR1Y2UoZHJhd1NlZ21lbnQsIHRoaXMuaGVpZ2h0ICsgdGhpcy5tYXJnaW5Ub3ApO1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKGxhc3RYLCBsYXN0WSk7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8obGFzdFgsIHRoaXMuaGVpZ2h0ICsgdGhpcy5tYXJnaW5Ub3ApO1xyXG5cclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGByZ2JhKCR7dGhpcy5jb2xvcn0sICR7dGhpcy52aXNpYmlsaXR5fSlgO1xyXG4gICAgICAgICAgICBjdHguZmlsbCgpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZHJhd1NlZ21lbnQocHJldlZhbCwgY3VyVmFsLCBpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IGNvb3Jkc1hbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgY3R4LmxpbmVUbyh4LCBwcmV2VmFsKTtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lVG8oeCwgY3VyVmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VyVmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRpb25IYXBwZW5zOztcclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IEJhc2UgZnJvbSBcIi4vQmFzZS9CYXNlLmpzXCI7XHJcbmltcG9ydCBJdGVtIGZyb20gXCIuL0l0ZW0vTGluZXMuanNcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTGluZXMgZXh0ZW5kcyBCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKGN0eCwgd2lkdGgsIGhlaWdodCwgbWFyZ2luVG9wLCBkYXRhLFxyXG4gICAgICAgIGRyYXdQb3B1cCwgYW5pbWF0ZU1hcmtpbmcsXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihjdHgsIHdpZHRoLCBoZWlnaHQsIG1hcmdpblRvcCwgZGF0YSwgZHJhd1BvcHVwKTtcclxuXHJcbiAgICAgICAgdGhpcy5saW5lV2lkdGggPSAzO1xyXG5cclxuICAgICAgICBkYXRhLnZhbHVlc1kuZm9yRWFjaCgoaXRlbSwgaSkgPT5cclxuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBJdGVtKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgsIGhlaWdodCwgbWFyZ2luVG9wLCBkYXRhLmNvbG9yc1tpXSxcclxuICAgICAgICAgICAgICAgIGl0ZW0sIHRoaXMubGluZVdpZHRoKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmFuaW1hdGVNYXJraW5nID0gYW5pbWF0ZU1hcmtpbmc7XHJcblxyXG4gICAgICAgIHRoaXMudmVydGljYWxMaW5lT3BhY2l0eSA9IC41O1xyXG5cclxuICAgICAgICB0aGlzLmNpcmNsZXNBbmltID0ge1xyXG4gICAgICAgICAgICBjdXJWOiAwLFxyXG4gICAgICAgICAgICBuZXdWOiBudWxsLFxyXG4gICAgICAgICAgICBsYXN0U2F2ZWROZXdWOiBudWxsLFxyXG4gICAgICAgICAgICBhbmltQmlhczogMCxcclxuICAgICAgICAgICAgYW5pbUR1cmF0aW9uOiAxMDAsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVmVydGljYWxCb3VuZHMobCwgcikge1xyXG4gICAgICAgIGxldCByZXMgPSB0aGlzLmRlZmluZVZlcnRpY2FsQm91bmRzKGwsIHIpO1xyXG4gICAgICAgIHRoaXMuYXhpc1ltYXgubmV3ViA9IHJlcy5tYXg7XHJcbiAgICAgICAgdGhpcy5heGlzWW1pbi5uZXdWID0gcmVzLm1pbjtcclxuICAgIH1cclxuXHJcbiAgICBkZWZpbmVWZXJ0aWNhbEJvdW5kcyhsLCByKSB7XHJcbiAgICAgICAgbGV0IFttYXhzLCBtaW5zXSA9IFtbXSwgW11dO1xyXG5cclxuICAgICAgICB0aGlzLmNoZWNrcy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtID09PSBmYWxzZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgc2xpY2UgPSB0aGlzLmRhdGEudmFsdWVzWVtpXS5zbGljZShsLCByKTtcclxuICAgICAgICAgICAgbWF4cy5wdXNoKE1hdGgubWF4KC4uLnNsaWNlKSk7XHJcbiAgICAgICAgICAgIG1pbnMucHVzaChNYXRoLm1pbiguLi5zbGljZSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8v0YLRg9GCINC80L7QttC90L4g0LvQvtCy0LjRgtGMINC40L3RhNC40L3QuNGC0LgsINC60L7Qs9C00LAg0YfQtdC60L7QsiAwLCDQvdC+INC+0L3QviDQvdC40LPQtNC1INC90LUg0LLRgNC10LTQuNGCXHJcblxyXG4gICAgICAgIHJldHVybiB7IG1heDogTWF0aC5tYXgoLi4ubWF4cyksIG1pbjogTWF0aC5taW4oLi4ubWlucykgfTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KHNob3VsZFVwZGF0ZSwgY29vcmRzWCwgbGVmdEJvdW5kSW5kZXgsIHJpZ2h0Qm91bmRJbmRleCkge1xyXG4gICAgICAgIGxldCBpbnB1dCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoc2hvdWxkVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRFQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXMxID0gdGhpcy5hbmltYXRlKHRoaXMuYXhpc1ltYXgpO1xyXG4gICAgICAgICAgICBsZXQgcmVzMiA9IHRoaXMuYW5pbWF0ZSh0aGlzLmF4aXNZbWluKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXMxID09PSAyIHx8IHJlczIgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZU1hcmtpbmcodGhpcy5heGlzWUFuaW1hdGlvbkR1cmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXhpc1ltYXgubmV3ViwgdGhpcy5heGlzWW1pbi5uZXdWKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5wdXQgPSAhIXJlczEgfHwgISFyZXMyIHx8IGlucHV0O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKGl0ZW0gPT5cclxuICAgICAgICAgICAgICAgIGl0ZW0udXBkYXRlQ29vcmRzWShcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0Qm91bmRJbmRleCwgcmlnaHRCb3VuZEluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXhpc1ltYXguY3VyViwgdGhpcy5heGlzWW1pbi5jdXJWKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXQgPSB0aGlzLml0ZW1zLnJlZHVjZSgoYWNjdW0sIGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZHJhdyhjb29yZHNYKSB8fCBhY2N1bTtcclxuICAgICAgICB9LCBmYWxzZSkgfHwgaW5wdXQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzSGlnaHRsaWdodCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnNsaWRlckRvd24gIT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gISF0aGlzLmFuaW1hdGUodGhpcy5jaXJjbGVzQW5pbSkgfHwgaW5wdXQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goaXRlbSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZHJhd0NpcmNsZUluUG9pbnQodGhpcy5jaXJjbGVzQW5pbS5jdXJWLCBjb29yZHNYKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRyYXdWZXJ0aWNhbExpbmUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNpcmNsZXNBbmltLmxhc3RTYXZlZE5ld1YgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgfVxyXG5cclxuICAgIGhpZ2hsaWdodEl0ZW0oeCwgeSwgY29vcmRzWCwgc2NhbGVYLCBsZWZ0Qm91bmRJbmRleCkge1xyXG4gICAgICAgIHRoaXMuZm9jdXNYID0geDsgLy/Qt9Cw0YfQtdC8P1xyXG4gICAgICAgIHRoaXMuZm9jdXNZID0geTtcclxuXHJcbiAgICAgICAgdGhpcy5pc0hpZ2h0bGlnaHQgPSB0cnVlO1xyXG4gICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoKHggLSBjb29yZHNYWzBdKSAvIHNjYWxlWCk7IC8v0LLQvNC10YHRgtC+IHJvdW5kXHJcbiAgICAgICAgaW5kZXggPCAwICYmIChpbmRleCA9IDApO1xyXG5cclxuICAgICAgICB0aGlzLmNpcmNsZXNBbmltLm5ld1YgPSBjb29yZHNYW2luZGV4XTtcclxuXHJcbiAgICAgICAgbGV0IGRvY2tldHMgPSB0aGlzLml0ZW1zLnJlZHVjZSgoYWNjdW0sIGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tzW2ldID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBhY2N1bS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLmRhdGEubmFtZXNbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJlcGFyZVZhbHVlKHRoaXMuZGF0YS52YWx1ZXNZW2ldW2luZGV4ICsgbGVmdEJvdW5kSW5kZXhdKSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy/QvdC1INC30LDQsdGL0YLRjFxyXG4gICAgICAgICAgICAgICAgYWNjdW0ucHVzaCh7IG5hbWU6IFwiXCIsIHZhbHVlOiBcIlwiLCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWNjdW07XHJcbiAgICAgICAgfSwgW10pO1xyXG5cclxuICAgICAgICB0aGlzLmRyYXdQb3B1cChpbmRleCwgZG9ja2V0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0YTRg9C90LrRhtC40Y8g0LTQvtC70LbQvdCwINCy0LfRj9GC0Ywg0YHRgtCw0YDRi9C5INGB0L7RhdGA0LDQvdC10L3QvdGL0LkgWDAsINC/0L4g0LjQvdC00LXQutGB0YMg0LLRi9GH0LjRgdC70LjRgtGMINC90L7QstGL0LkgWCwgXHJcbiAgICAvLyDQv9GA0L7QuNC30LLQtdGB0YLQuCDQsNC90LjQvNCw0YbQuNGOINC+0YIgWDAg0LogWCDQvdCwINC60LDQttC00L7QvCDRiNCw0LPQtSDQvtGC0YDQuNGB0L7QstC60LgsINC30LDRgdGC0LDQstC70Y/RjyDQu9C40L3QuNGOINC/0LXRgNC10YDQuNGB0L7QstGL0LLQsNGC0YzRgdGPXHJcblxyXG5cclxufVxyXG5cclxuLy8g0LHRg9C00YMg0LTQtdC70LDRgtGMINC90LDRgdC70LXQtNC+0LLQsNC90LjQtSDRgSDQvdC10LzQvdC+0LPQviDRgNCw0LfQvdGL0Lwg0YTRg9C90LrRhtC40L7QvdCw0LvQvtC8XHJcbmV4cG9ydCBjbGFzcyBMaW5lc0wgZXh0ZW5kcyBCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKGN0eCwgd2lkdGgsIGhlaWdodCwgbWFyZ2luVG9wLCBkYXRhKSB7XHJcbiAgICAgICAgc3VwZXIoY3R4LCB3aWR0aCwgaGVpZ2h0LCBtYXJnaW5Ub3AsIGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLmxpbmVXaWR0aCA9IDI7XHJcblxyXG4gICAgICAgIGRhdGEudmFsdWVzWS5mb3JFYWNoKChpdGVtLCBpKSA9PlxyXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3IEl0ZW0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eCwgaGVpZ2h0LCBtYXJnaW5Ub3AsIGRhdGEuY29sb3JzW2ldLFxyXG4gICAgICAgICAgICAgICAgaXRlbSwgdGhpcy5saW5lV2lkdGgpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVWZXJ0aWNhbEJvdW5kcyhsLCByKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IHRoaXMuZGVmaW5lVmVydGljYWxCb3VuZHMobCwgcik7XHJcbiAgICAgICAgdGhpcy5heGlzWW1heC5uZXdWID0gcmVzLm1heDtcclxuICAgICAgICB0aGlzLmF4aXNZbWluLm5ld1YgPSByZXMubWluO1xyXG4gICAgfVxyXG5cclxuICAgIGRlZmluZVZlcnRpY2FsQm91bmRzKGwsIHIpIHtcclxuICAgICAgICBsZXQgW21heHMsIG1pbnNdID0gW1tdLCBbXV07XHJcblxyXG4gICAgICAgIHRoaXMuY2hlY2tzLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IGZhbHNlKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBzbGljZSA9IHRoaXMuZGF0YS52YWx1ZXNZW2ldLnNsaWNlKGwsIHIpO1xyXG4gICAgICAgICAgICBtYXhzLnB1c2goTWF0aC5tYXgoLi4uc2xpY2UpKTtcclxuICAgICAgICAgICAgbWlucy5wdXNoKE1hdGgubWluKC4uLnNsaWNlKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7IG1heDogTWF0aC5tYXgoLi4ubWF4cyksIG1pbjogTWF0aC5taW4oLi4ubWlucykgfTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KHNob3VsZFVwZGF0ZSwgY29vcmRzWCwgbGVmdEJvdW5kSW5kZXgsIHJpZ2h0Qm91bmRJbmRleCkge1xyXG4gICAgICAgIGxldCBpbnB1dCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRFQoKTtcclxuXHJcbiAgICAgICAgbGV0IHJlczEgPSAhIXRoaXMuYW5pbWF0ZSh0aGlzLmF4aXNZbWF4KTtcclxuICAgICAgICBsZXQgcmVzMiA9ICEhdGhpcy5hbmltYXRlKHRoaXMuYXhpc1ltaW4pO1xyXG4gICAgICAgIGlucHV0ID0gISFyZXMxIHx8ICEhcmVzMiB8fCBpbnB1dDtcclxuXHJcbiAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKGl0ZW0gPT5cclxuICAgICAgICAgICAgaXRlbS51cGRhdGVDb29yZHNZKFxyXG4gICAgICAgICAgICAgICAgbGVmdEJvdW5kSW5kZXgsIHJpZ2h0Qm91bmRJbmRleCxcclxuICAgICAgICAgICAgICAgIHRoaXMuYXhpc1ltYXguY3VyViwgdGhpcy5heGlzWW1pbi5jdXJWKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlucHV0ID0gdGhpcy5pdGVtcy5yZWR1Y2UoKGFjY3VtLCBpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmRyYXcoY29vcmRzWCkgfHwgYWNjdW07XHJcbiAgICAgICAgfSwgZmFsc2UpIHx8IGlucHV0O1xyXG5cclxuICAgICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCBCYXNlIGZyb20gXCIuL0Jhc2UvQmFzZS5qc1wiO1xyXG5pbXBvcnQgSXRlbSBmcm9tIFwiLi9JdGVtL0xpbmVzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZXMyWSBleHRlbmRzIEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoY3R4LCB3aWR0aCwgaGVpZ2h0LCBtYXJnaW5Ub3AsIGRhdGEsXHJcbiAgICAgICAgZHJhd1BvcHVwLCBhbmltYXRlTWFya2luZ1xyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoY3R4LCB3aWR0aCwgaGVpZ2h0LCBtYXJnaW5Ub3AsIGRhdGEsIGRyYXdQb3B1cCk7XHJcblxyXG4gICAgICAgIHRoaXMubGluZVdpZHRoID0gMztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHZZID0gZGF0YS52YWx1ZXNZW2ldO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3IEl0ZW0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eCwgaGVpZ2h0LCBtYXJnaW5Ub3AsIGRhdGEuY29sb3JzW2ldLFxyXG4gICAgICAgICAgICAgICAgdlksIHRoaXMubGluZVdpZHRoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hbmltYXRlTWFya2luZyA9IGFuaW1hdGVNYXJraW5nO1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRpY2FsTGluZU9wYWNpdHkgPSAuNTtcclxuXHJcbiAgICAgICAgdGhpcy5heGlzWW1heDIgPSB7XHJcbiAgICAgICAgICAgIGN1clY6IDAsXHJcbiAgICAgICAgICAgIG5ld1Y6IG51bGwsXHJcbiAgICAgICAgICAgIGxhc3RTYXZlZE5ld1Y6IG51bGwsXHJcbiAgICAgICAgICAgIGFuaW1CaWFzOiAwLFxyXG4gICAgICAgICAgICBhbmltRHVyYXRpb246IHRoaXMuYXhpc1lBbmltYXRpb25EdXJhdGlvblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYXhpc1ltaW4yID0ge1xyXG4gICAgICAgICAgICBjdXJWOiAwLFxyXG4gICAgICAgICAgICBuZXdWOiBudWxsLFxyXG4gICAgICAgICAgICBsYXN0U2F2ZWROZXdWOiBudWxsLFxyXG4gICAgICAgICAgICBhbmltQmlhczogMCxcclxuICAgICAgICAgICAgYW5pbUR1cmF0aW9uOiB0aGlzLmF4aXNZQW5pbWF0aW9uRHVyYXRpb25cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmNpcmNsZXNBbmltID0ge1xyXG4gICAgICAgICAgICBjdXJWOiAwLFxyXG4gICAgICAgICAgICBuZXdWOiBudWxsLFxyXG4gICAgICAgICAgICBsYXN0U2F2ZWROZXdWOiBudWxsLFxyXG4gICAgICAgICAgICBhbmltQmlhczogMCxcclxuICAgICAgICAgICAgYW5pbUR1cmF0aW9uOiAxMDAsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVWZXJ0aWNhbEJvdW5kcyhsLCByKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IHRoaXMuZGVmaW5lVmVydGljYWxCb3VuZHMobCwgcik7XHJcblxyXG4gICAgICAgIHRoaXMuYXhpc1ltYXgubmV3ViA9IHJlcy5tYXg7XHJcbiAgICAgICAgdGhpcy5heGlzWW1pbi5uZXdWID0gcmVzLm1pbjtcclxuICAgICAgICB0aGlzLmF4aXNZbWF4Mi5uZXdWID0gcmVzLm1heDI7XHJcbiAgICAgICAgdGhpcy5heGlzWW1pbjIubmV3ViA9IHJlcy5taW4yO1xyXG4gICAgfVxyXG5cclxuICAgIGRlZmluZVZlcnRpY2FsQm91bmRzKGwsIHIpIHtcclxuICAgICAgICBsZXQgc2xpY2UgPSB0aGlzLmRhdGEudmFsdWVzWVswXS5zbGljZShsLCByKTtcclxuICAgICAgICBsZXQgc2xpY2UyID0gdGhpcy5kYXRhLnZhbHVlc1lbMV0uc2xpY2UobCwgcik7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1heDogTWF0aC5tYXgoLi4uc2xpY2UpLFxyXG4gICAgICAgICAgICBtaW46IE1hdGgubWluKC4uLnNsaWNlKSxcclxuICAgICAgICAgICAgbWF4MjogTWF0aC5tYXgoLi4uc2xpY2UyKSxcclxuICAgICAgICAgICAgbWluMjogTWF0aC5taW4oLi4uc2xpY2UyKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyhzaG91bGRVcGRhdGUsIGNvb3Jkc1gsIGxlZnRCb3VuZEluZGV4LCByaWdodEJvdW5kSW5kZXgpIHtcclxuICAgICAgICBsZXQgaW5wdXQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoc2hvdWxkVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRFQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXMxID0gdGhpcy5hbmltYXRlKHRoaXMuYXhpc1ltYXgpO1xyXG4gICAgICAgICAgICBsZXQgcmVzMiA9IHRoaXMuYW5pbWF0ZSh0aGlzLmF4aXNZbWluKTtcclxuICAgICAgICAgICAgbGV0IHJlczMgPSB0aGlzLmFuaW1hdGUodGhpcy5heGlzWW1heDIpO1xyXG4gICAgICAgICAgICBsZXQgcmVzNCA9IHRoaXMuYW5pbWF0ZSh0aGlzLmF4aXNZbWluMik7XHJcblxyXG4gICAgICAgICAgICBpbnB1dCA9ICEhcmVzMSB8fCAhIXJlczIgfHwgISFyZXMzIHx8ICEhcmVzNCB8fCBpbnB1dDtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXMxID09PSAyIHx8IHJlczIgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZU1hcmtpbmcodGhpcy5heGlzWUFuaW1hdGlvbkR1cmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXhpc1ltYXgubmV3ViwgdGhpcy5heGlzWW1pbi5uZXdWLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVzMyA9PT0gMiB8fCByZXM0ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVNYXJraW5nKHRoaXMuYXhpc1lBbmltYXRpb25EdXJhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF4aXNZbWF4Mi5uZXdWLCB0aGlzLmF4aXNZbWluMi5uZXdWLCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pdGVtc1swXS51cGRhdGVDb29yZHNZKFxyXG4gICAgICAgICAgICAgICAgbGVmdEJvdW5kSW5kZXgsIHJpZ2h0Qm91bmRJbmRleCxcclxuICAgICAgICAgICAgICAgIHRoaXMuYXhpc1ltYXguY3VyViwgdGhpcy5heGlzWW1pbi5jdXJWKTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtc1sxXS51cGRhdGVDb29yZHNZKFxyXG4gICAgICAgICAgICAgICAgbGVmdEJvdW5kSW5kZXgsIHJpZ2h0Qm91bmRJbmRleCxcclxuICAgICAgICAgICAgICAgIHRoaXMuYXhpc1ltYXgyLmN1clYsIHRoaXMuYXhpc1ltaW4yLmN1clYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXQgPSB0aGlzLml0ZW1zLnJlZHVjZSgoYWNjdW0sIGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZHJhdyhjb29yZHNYKSB8fCBhY2N1bTtcclxuICAgICAgICB9LCBmYWxzZSkgfHwgaW5wdXQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzSGlnaHRsaWdodCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnNsaWRlckRvd24gIT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gISF0aGlzLmFuaW1hdGUodGhpcy5jaXJjbGVzQW5pbSkgfHwgaW5wdXQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goaXRlbSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZHJhd0NpcmNsZUluUG9pbnQodGhpcy5jaXJjbGVzQW5pbS5jdXJWLCBjb29yZHNYKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRyYXdWZXJ0aWNhbExpbmUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNpcmNsZXNBbmltLmxhc3RTYXZlZE5ld1YgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgfVxyXG5cclxuICAgIGhpZ2hsaWdodEl0ZW0oeCwgeSwgY29vcmRzWCwgc2NhbGVYLCBsZWZ0Qm91bmRJbmRleCkge1xyXG4gICAgICAgIHRoaXMuZm9jdXNYID0geDsgLy/Qt9Cw0YfQtdC8P1xyXG4gICAgICAgIHRoaXMuZm9jdXNZID0geTtcclxuXHJcbiAgICAgICAgdGhpcy5pc0hpZ2h0bGlnaHQgPSB0cnVlO1xyXG4gICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoKHggLSBjb29yZHNYWzBdKSAvIHNjYWxlWCk7IC8v0LLQvNC10YHRgtC+IHJvdW5kXHJcbiAgICAgICAgaW5kZXggPCAwICYmIChpbmRleCA9IDApO1xyXG5cclxuICAgICAgICB0aGlzLmNpcmNsZXNBbmltLm5ld1YgPSBjb29yZHNYW2luZGV4XTtcclxuXHJcbiAgICAgICAgbGV0IGRvY2tldHMgPSB0aGlzLml0ZW1zLnJlZHVjZSgoYWNjdW0sIGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tzW2ldID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBhY2N1bS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLmRhdGEubmFtZXNbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJlcGFyZVZhbHVlKHRoaXMuZGF0YS52YWx1ZXNZW2ldW2luZGV4ICsgbGVmdEJvdW5kSW5kZXhdKSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWNjdW0ucHVzaCh7IG5hbWU6IFwiXCIsIHZhbHVlOiBcIlwiLCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWNjdW07XHJcbiAgICAgICAgfSwgW10pO1xyXG5cclxuICAgICAgICB0aGlzLmRyYXdQb3B1cChpbmRleCwgZG9ja2V0cyk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lczJZTCBleHRlbmRzIEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoY3R4LCB3aWR0aCwgaGVpZ2h0LCBtYXJnaW5Ub3AsIGRhdGEsXHJcbiAgICAgICAgZHJhd1BvcHVwXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihjdHgsIHdpZHRoLCBoZWlnaHQsIG1hcmdpblRvcCwgZGF0YSwgZHJhd1BvcHVwKTtcclxuXHJcbiAgICAgICAgdGhpcy5saW5lc1dpZHRoID0gMjtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHZZID0gZGF0YS52YWx1ZXNZW2ldO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3IEl0ZW0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eCwgaGVpZ2h0LCBtYXJnaW5Ub3AsIGRhdGEuY29sb3JzW2ldLFxyXG4gICAgICAgICAgICAgICAgdlksIHRoaXMubGluZVdpZHRoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5heGlzWW1heDIgPSB7XHJcbiAgICAgICAgICAgIGN1clY6IDAsXHJcbiAgICAgICAgICAgIG5ld1Y6IG51bGwsXHJcbiAgICAgICAgICAgIGxhc3RTYXZlZE5ld1Y6IG51bGwsXHJcbiAgICAgICAgICAgIGFuaW1CaWFzOiAwLFxyXG4gICAgICAgICAgICBhbmltRHVyYXRpb246IHRoaXMuYXhpc1lBbmltYXRpb25EdXJhdGlvblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYXhpc1ltaW4yID0ge1xyXG4gICAgICAgICAgICBjdXJWOiAwLFxyXG4gICAgICAgICAgICBuZXdWOiBudWxsLFxyXG4gICAgICAgICAgICBsYXN0U2F2ZWROZXdWOiBudWxsLFxyXG4gICAgICAgICAgICBhbmltQmlhczogMCxcclxuICAgICAgICAgICAgYW5pbUR1cmF0aW9uOiB0aGlzLmF4aXNZQW5pbWF0aW9uRHVyYXRpb25cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVZlcnRpY2FsQm91bmRzKGwsIHIpIHtcclxuICAgICAgICBsZXQgcmVzID0gdGhpcy5kZWZpbmVWZXJ0aWNhbEJvdW5kcyhsLCByKTtcclxuXHJcbiAgICAgICAgdGhpcy5heGlzWW1heC5uZXdWID0gcmVzLm1heDtcclxuICAgICAgICB0aGlzLmF4aXNZbWluLm5ld1YgPSByZXMubWluO1xyXG4gICAgICAgIHRoaXMuYXhpc1ltYXgyLm5ld1YgPSByZXMubWF4MjtcclxuICAgICAgICB0aGlzLmF4aXNZbWluMi5uZXdWID0gcmVzLm1pbjI7XHJcbiAgICB9XHJcblxyXG4gICAgZGVmaW5lVmVydGljYWxCb3VuZHMobCwgcikge1xyXG4gICAgICAgIGxldCBzbGljZSA9IHRoaXMuZGF0YS52YWx1ZXNZWzBdLnNsaWNlKGwsIHIpO1xyXG4gICAgICAgIGxldCBzbGljZTIgPSB0aGlzLmRhdGEudmFsdWVzWVsxXS5zbGljZShsLCByKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWF4OiBNYXRoLm1heCguLi5zbGljZSksXHJcbiAgICAgICAgICAgIG1pbjogTWF0aC5taW4oLi4uc2xpY2UpLFxyXG4gICAgICAgICAgICBtYXgyOiBNYXRoLm1heCguLi5zbGljZTIpLFxyXG4gICAgICAgICAgICBtaW4yOiBNYXRoLm1pbiguLi5zbGljZTIpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KHNob3VsZFVwZGF0ZSwgY29vcmRzWCwgbGVmdEJvdW5kSW5kZXgsIHJpZ2h0Qm91bmRJbmRleCkge1xyXG4gICAgICAgIGxldCBpbnB1dCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRFQoKTtcclxuXHJcbiAgICAgICAgbGV0IHJlczEgPSB0aGlzLmFuaW1hdGUodGhpcy5heGlzWW1heCk7XHJcbiAgICAgICAgbGV0IHJlczIgPSB0aGlzLmFuaW1hdGUodGhpcy5heGlzWW1pbik7XHJcbiAgICAgICAgbGV0IHJlczMgPSB0aGlzLmFuaW1hdGUodGhpcy5heGlzWW1heDIpO1xyXG4gICAgICAgIGxldCByZXM0ID0gdGhpcy5hbmltYXRlKHRoaXMuYXhpc1ltaW4yKTtcclxuXHJcbiAgICAgICAgaW5wdXQgPSAhIXJlczEgfHwgISFyZXMyIHx8ICEhcmVzMyB8fCAhIXJlczQgfHwgaW5wdXQ7XHJcblxyXG4gICAgICAgIHRoaXMuaXRlbXNbMF0udXBkYXRlQ29vcmRzWShcclxuICAgICAgICAgICAgbGVmdEJvdW5kSW5kZXgsIHJpZ2h0Qm91bmRJbmRleCxcclxuICAgICAgICAgICAgdGhpcy5heGlzWW1heC5jdXJWLCB0aGlzLmF4aXNZbWluLmN1clYpO1xyXG4gICAgICAgIHRoaXMuaXRlbXNbMV0udXBkYXRlQ29vcmRzWShcclxuICAgICAgICAgICAgbGVmdEJvdW5kSW5kZXgsIHJpZ2h0Qm91bmRJbmRleCxcclxuICAgICAgICAgICAgdGhpcy5heGlzWW1heDIuY3VyViwgdGhpcy5heGlzWW1pbjIuY3VyVik7XHJcblxyXG4gICAgICAgIGlucHV0ID0gdGhpcy5pdGVtcy5yZWR1Y2UoKGFjY3VtLCBpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmRyYXcoY29vcmRzWCkgfHwgYWNjdW07XHJcbiAgICAgICAgfSwgZmFsc2UpIHx8IGlucHV0O1xyXG5cclxuICAgICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCBCYXNlIGZyb20gXCIuL0Jhc2UvQmFzZS5qc1wiO1xyXG5pbXBvcnQgSXRlbSBmcm9tIFwiLi9JdGVtL1BlcmNlbnRhZ2UuanNcIjtcclxuXHJcbmNsYXNzIFBlcmNlbnRhZ2VCYXNlIGV4dGVuZHMgQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHdpZHRoLCBoZWlnaHQsIG1hcmdpblRvcCwgZGF0YSxcclxuICAgICAgICBkcmF3UG9wdXBcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKGN0eCwgd2lkdGgsIGhlaWdodCwgbWFyZ2luVG9wLCBkYXRhLCBkcmF3UG9wdXApO1xyXG5cclxuICAgICAgICBkYXRhLnZhbHVlc1kuZm9yRWFjaCgoaXRlbSwgaSkgPT5cclxuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBJdGVtKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQsIG1hcmdpblRvcCxcclxuICAgICAgICAgICAgICAgIGRhdGEuY29sb3JzW2ldLFxyXG4gICAgICAgICAgICAgICAgaXRlbVxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuY29sdW1uTW9kZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vINC80LXRgtC+0LQsINC40L3QuNGG0LjQuNGA0YPRjtGJ0LjQuSDQsNC90LjQvNCw0YbQuNGOINC80LDRgdGI0YLQsNCx0LAg0L/QviDQvtGB0LggWVxyXG4gICAgdXBkYXRlVmVydGljYWxCb3VuZHMobGVmdEJvdW5kSW5kZXgsIHJpZ2h0Qm91bmRJbmRleCkge1xyXG4gICAgICAgIC8vIHRoaXMuYW1vdW50cyA9IHRoaXMuY2FsY0Ftb3VudHMobGVmdEJvdW5kSW5kZXgsIHJpZ2h0Qm91bmRJbmRleCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY09uZUFtb3VudChpbmRleCkge1xyXG4gICAgICAgIGxldCBzdW0gPSAwO1xyXG4gICAgICAgIHRoaXMuZGF0YS52YWx1ZXNZLmZvckVhY2goKHZhbHVlc1ksIGkpID0+IHtcclxuICAgICAgICAgICAgc3VtICs9IHZhbHVlc1lbaW5kZXhdICogTnVtYmVyKHRoaXMuY2hlY2tzW2ldKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGNBbW91bnRzKGxlZnRCb3VuZEluZGV4LCByaWdodEJvdW5kSW5kZXgsIGZvcndhcmQgPSB0cnVlKSB7XHJcbiAgICAgICAgbGV0IHJhbmdlID0gcmlnaHRCb3VuZEluZGV4IC0gbGVmdEJvdW5kSW5kZXggKyAxO1xyXG4gICAgICAgIHJhbmdlIDwgMCAmJiAocmFuZ2UgPSAwKTtcclxuXHJcbiAgICAgICAgbGV0IGFjY3VtID0gbmV3IEFycmF5KHJhbmdlKS5maWxsKDApO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9yd2FyZCA/XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS52YWx1ZXNZLnJlZHVjZShjYWxjQW1vdW50c0ZvcndhcmQuYmluZCh0aGlzKSwgYWNjdW0pIDpcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnZhbHVlc1kucmVkdWNlKGNhbGNBbW91bnRzLmJpbmQodGhpcyksIGFjY3VtKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2FsY0Ftb3VudHMoYWNjdW0sIHZhbHVlc1lJdGVtLCBpKSB7XHJcbiAgICAgICAgICAgIGxldCBzbGljZSA9IHZhbHVlc1lJdGVtLnNsaWNlKGxlZnRCb3VuZEluZGV4LCByaWdodEJvdW5kSW5kZXggKyAxKTtcclxuICAgICAgICAgICAgc2xpY2UuZm9yRWFjaCgodmFsLCBqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhY2N1bVtqXSArPSB2YWwgKiB0aGlzLml0ZW1zW2ldLnZpc2liaWxpdHk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFjY3VtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2FsY0Ftb3VudHNGb3J3YXJkKGFjY3VtLCB2YWx1ZXNZSXRlbSwgaSkge1xyXG4gICAgICAgICAgICBsZXQgc2xpY2UgPSB2YWx1ZXNZSXRlbS5zbGljZShsZWZ0Qm91bmRJbmRleCwgcmlnaHRCb3VuZEluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIHNsaWNlLmZvckVhY2goKHZhbCwgaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWNjdW1bal0gKz0gdmFsICogTnVtYmVyKHRoaXMuY2hlY2tzW2ldKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYWNjdW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vINC+0YLRgNC40YHQvtCy0LrQsFxyXG4gICAgZHJhdyhzaG91bGRVcGRhdGUsIGNvb3Jkc1gsIGxlZnRCb3VuZEluZGV4LCByaWdodEJvdW5kSW5kZXgpIHtcclxuICAgICAgICBsZXQgbCA9IHRoaXMuaXRlbXMubGVuZ3RoIC0gMTtcclxuXHJcbiAgICAgICAgaWYgKHNob3VsZFVwZGF0ZSkge1xyXG4gICAgICAgICAgICBsZXQgYW1vdW50cyA9IHRoaXMuY2FsY0Ftb3VudHMobGVmdEJvdW5kSW5kZXgsIHJpZ2h0Qm91bmRJbmRleCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBsZXQgY3VyQW1vdW50cyA9IG5ldyBBcnJheShhbW91bnRzLmxlbmd0aCkuZmlsbCgwKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJBbW91bnRzID0gdGhpcy5pdGVtc1tsIC0gaV0udXBkYXRlQ29vcmRzWShcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0Qm91bmRJbmRleCwgcmlnaHRCb3VuZEluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIGN1ckFtb3VudHMsIGFtb3VudHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaW5wdXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlucHV0ID0gdGhpcy5pdGVtc1tsIC0gaV0uZHJhdyhjb29yZHNYLCB0aGlzLmNvbHVtbk1vZGUsIHRoaXMud2lkdGgpIHx8IGlucHV0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzSGlnaHRsaWdodCA9PT0gdHJ1ZSAmJiB0aGlzLmRyYXdWZXJ0aWNhbExpbmUoY29vcmRzWCk7XHJcblxyXG4gICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgIH1cclxuXHJcbiAgICBoaWdobGlnaHRJdGVtKHgsIHksIGNvb3Jkc1gsIHNjYWxlWCwgbGVmdEJvdW5kSW5kZXgpIHtcclxuICAgICAgICB0aGlzLmZvY3VzWCA9IHg7IC8v0LfQsNGH0LXQvD9cclxuICAgICAgICB0aGlzLmZvY3VzWSA9IHk7XHJcblxyXG4gICAgICAgIHRoaXMuaXNIaWdodGxpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKCh4IC0gY29vcmRzWFswXSkgLyBzY2FsZVgpOyAvL9Cy0LzQtdGB0YLQviByb3VuZFxyXG4gICAgICAgIGluZGV4IDwgMCAmJiAoaW5kZXggPSAwKTtcclxuXHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHRlZEluZGV4ID0gaW5kZXg7XHJcblxyXG4gICAgICAgIGxldCBhbW91bnQgPSB0aGlzLmNhbGNPbmVBbW91bnQoaW5kZXggKyBsZWZ0Qm91bmRJbmRleCk7XHJcbiAgICAgICAgbGV0IGRvY2tldHMgPSB0aGlzLml0ZW1zLnJlZHVjZSgoYWNjdW0sIGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tzW2ldID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdiA9IHRoaXMuZGF0YS52YWx1ZXNZW2ldW2luZGV4ICsgbGVmdEJvdW5kSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgYWNjdW0ucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudGFnZTogTWF0aC5yb3VuZCh2IC8gYW1vdW50ICogMTAwKSArIFwiJVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuZGF0YS5uYW1lc1tpXSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5wcmVwYXJlVmFsdWUodiksXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFjY3VtLnB1c2goeyBwZXJjZW50YWdlOiBcIlwiLCBuYW1lOiBcIlwiLCB2YWx1ZTogXCJcIiB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWNjdW07XHJcbiAgICAgICAgfSwgW10pO1xyXG5cclxuICAgICAgICB0aGlzLmRyYXdQb3B1cChpbmRleCwgZG9ja2V0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd1ZlcnRpY2FsTGluZShjb29yZHNYKSB7XHJcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4O1xyXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHdpbmRvdy50aGVtZS5ncmlkTGluZXM7XHJcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGxldCB4ID0gY29vcmRzWFt0aGlzLmhpZ2hsaWdodGVkSW5kZXhdO1xyXG4gICAgICAgIGN0eC5tb3ZlVG8oeCwgMCk7XHJcbiAgICAgICAgY3R4LmxpbmVUbyh4LCB0aGlzLmNoYXJ0SGVpZ2h0KTtcclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFBlcmNlbnRhZ2UgZXh0ZW5kcyBQZXJjZW50YWdlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHdpZHRoLCBoZWlnaHQsIG1hcmdpblRvcCwgZGF0YSxcclxuICAgICAgICBkcmF3UG9wdXBcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKGN0eCwgd2lkdGgsIGhlaWdodCwgbWFyZ2luVG9wLCBkYXRhLCBkcmF3UG9wdXApO1xyXG4gICAgICAgIHRoaXMuYXhpc1ltYXgubmV3ViA9IDEwMDtcclxuICAgICAgICB0aGlzLmF4aXNZbWluLm5ld1YgPSAwO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGVyY2VudGFnZUwgZXh0ZW5kcyBQZXJjZW50YWdlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHdpZHRoLCBoZWlnaHQsIG1hcmdpblRvcCwgZGF0YSkge1xyXG4gICAgICAgIHN1cGVyKGN0eCwgd2lkdGgsIGhlaWdodCwgbWFyZ2luVG9wLCBkYXRhKTtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgSXRlbSBmcm9tIFwiLi9JdGVtL1BpZS5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBpZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHdpZHRoLCBoZWlnaHQsIG1hcmdpblRvcCwgZGF0YSxcclxuICAgICAgICBkcmF3UG9wdXApIHtcclxuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcclxuXHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMubWFyZ2luVG9wID0gbWFyZ2luVG9wO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICB0aGlzLmRyYXdQb3B1cCA9IGRyYXdQb3B1cDtcclxuXHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSB0aGlzLmhlaWdodCAvIDI7XHJcblxyXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHRoaXMud2lkdGggLyAyO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWSA9IHRoaXMuaGVpZ2h0IC8gMiArIHRoaXMubWFyZ2luVG9wO1xyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uID0gMjAwO1xyXG5cclxuICAgICAgICB0aGlzLmNoZWNrcyA9IG5ldyBBcnJheSh0aGlzLmRhdGEudmFsdWVzWS5sZW5ndGgpLmZpbGwodHJ1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICBkYXRhLnZhbHVlc1kuZm9yRWFjaCgoaXRlbSwgaSkgPT5cclxuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBJdGVtKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbnRlclgsIHRoaXMuY2VudGVyWSwgdGhpcy5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgICBkYXRhLmNvbG9yc1tpXVxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMudG90YWwgPSAwO1xyXG4gICAgICAgIHRoaXMucGllU2xpY2VzVG90YWwgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5pc0hpZ2h0bGlnaHQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbkhhcHBlbnMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvblJlc2l6ZSh3aWR0aCwgaGVpZ2h0LCBtYXJnaW5Ub3ApIHtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB0aGlzLm1hcmdpblRvcCA9IG1hcmdpblRvcDtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcblxyXG4gICAgICAgIHRoaXMucmFkaXVzID0gdGhpcy5oZWlnaHQgLyAyO1xyXG5cclxuICAgICAgICB0aGlzLmNlbnRlclggPSB0aGlzLndpZHRoIC8gMjtcclxuICAgICAgICB0aGlzLmNlbnRlclkgPSB0aGlzLmhlaWdodCAvIDIgKyB0aGlzLm1hcmdpblRvcDtcclxuXHJcbiAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmNlbnRlclgwID0gdGhpcy5jZW50ZXJYO1xyXG4gICAgICAgICAgICBpdGVtLmNlbnRlclkwID0gdGhpcy5jZW50ZXJZO1xyXG4gICAgICAgICAgICBpdGVtLmNlbnRlclggPSB0aGlzLmNlbnRlclg7XHJcbiAgICAgICAgICAgIGl0ZW0uY2VudGVyWSA9IHRoaXMuY2VudGVyWTtcclxuXHJcbiAgICAgICAgICAgIGl0ZW0ucmFkaXVzID0gdGhpcy5yYWRpdXM7XHJcbiAgICAgICAgICAgIGl0ZW0ubWF4TGFiZWxTaXplID0gdGhpcy5yYWRpdXMgKiAyIC8gNTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5kcmF3KHRydWUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB1cGRhdGVWZXJ0aWNhbEJvdW5kcyhsZWZ0Qm91bmRJbmRleCwgcmlnaHRCb3VuZEluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5sZWZ0Qm91bmRJbmRleCA9IGxlZnRCb3VuZEluZGV4O1xyXG4gICAgICAgIHRoaXMucmlnaHRCb3VuZEluZGV4ID0gcmlnaHRCb3VuZEluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrRW50ZXJpbmdUaGVDaXJjbGUoeCwgeSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICh4IC0gdGhpcy5jZW50ZXJYKSAqICh4IC0gdGhpcy5jZW50ZXJYKSArXHJcbiAgICAgICAgICAgICh5IC0gdGhpcy5jZW50ZXJZKSAqICh5IC0gdGhpcy5jZW50ZXJZKVxyXG4gICAgICAgICAgICA8PSB0aGlzLnJhZGl1cyAqIHRoaXMucmFkaXVzXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWdobGlnaHRJdGVtKHgsIHkpIHtcclxuICAgICAgICB0aGlzLmZvY3VzWCA9IHg7XHJcbiAgICAgICAgdGhpcy5mb2N1c1kgPSB5O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jaGVja0VudGVyaW5nVGhlQ2lyY2xlKHgsIHkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNIaWdodGxpZ2h0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBhdGFuID0gTWF0aC5hdGFuMigoeSAtIHRoaXMuY2VudGVyWSksICh4IC0gdGhpcy5jZW50ZXJYKSk7XHJcbiAgICAgICAgICAgIGF0YW4gPCAwICYmIChhdGFuICs9IDIgKiBNYXRoLlBJKTtcclxuICAgICAgICAgICAgbGV0IGRvY2tldHMgPSBuZXcgQXJyYXkodGhpcy5pdGVtcy5sZW5ndGgpLmZpbGwoeyBuYW1lOiBcIlwiLCB2YWx1ZTogXCJcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLml0ZW1zW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhdGFuID4gdGhpcy5pdGVtc1tpXS5zdGFydEFuZ2xlICYmIGF0YW4gPCB0aGlzLml0ZW1zW2ldLmVuZEFuZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9ja2V0c1tpXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5kYXRhLm5hbWVzW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5wcmVwYXJlVmFsdWUodGhpcy5pdGVtc1tpXS52YWx1ZS50b0ZpeGVkKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBhbmdsZSA9IGl0ZW0uc3RhcnRBbmdsZSAtIChpdGVtLnN0YXJ0QW5nbGUgLSBpdGVtLmVuZEFuZ2xlKSAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHBvcHVwWCA9IGl0ZW0uY2VudGVyWCArIGl0ZW0ucmFkaXVzIC8gMiAqIE1hdGguY29zKGFuZ2xlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgcG9wdXBZID0gaXRlbS5jZW50ZXJZICsgaXRlbS5yYWRpdXMgLyAyICogTWF0aC5zaW4oYW5nbGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdQb3B1cChpLCBkb2NrZXRzKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGVja3MubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tzW2ldID09IHRydWUpIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ID09PSAxIHx8IGl0ZW0uaW5pdFB1c2hBbmltYXRpb24odHJ1ZSwgdGhpcy5hbmltYXRpb25EdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaW5pdFB1c2hBbmltYXRpb24oZmFsc2UsIHRoaXMuYW5pbWF0aW9uRHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJlcGFyZVZhbHVlKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkucmVwbGFjZSgvKFxcZCkoPz0oXFxkXFxkXFxkKSsoW15cXGRdfCQpKS9nLCAnJDEgJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdW5oaWdobGlnaHQoKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmluaXRQdXNoQW5pbWF0aW9uKGZhbHNlLCB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmlzSGlnaHRsaWdodCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVWaXNpYmlsaXR5KGluZGV4LCBzdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdLmluaXRWaXNpYmlsaXR5QW5pbWF0aW9uKHN0YXRlLCB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uKTtcclxuICAgICAgICB0aGlzLmNoZWNrc1tpbmRleF0gPSBzdGF0ZTtcclxuICAgICAgICB0aGlzLnVuaGlnaGxpZ2h0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/RgdGH0LjRgtCw0YLRjCDRgSDRg9GH0LXRgtC+0Lwg0LrRg9GB0L7Rh9C60LBcclxuICAgIGNhbGNUb3RhbHMoKSB7XHJcbiAgICAgICAgdGhpcy5waWVTbGljZXNUb3RhbCA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS52YWx1ZXNZLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzbGljZXNWYWx1ZXNZSXRlbSA9IHRoaXMuZGF0YS52YWx1ZXNZW2ldLnNsaWNlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0Qm91bmRJbmRleCwgdGhpcy5yaWdodEJvdW5kSW5kZXggKyAxXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3VtID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzbGljZXNWYWx1ZXNZSXRlbS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgc3VtICs9IHNsaWNlc1ZhbHVlc1lJdGVtW2pdICpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zW2ldLnZpc2liaWxpdHk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMucGllU2xpY2VzVG90YWxbaV0gPSBNYXRoLmZsb29yKHN1bSAvIHRoaXMuZGF0YS5mcmVxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGNTdW1JbkFycmF5KHRoaXMucGllU2xpY2VzVG90YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGNTdW1JbkFycmF5KGFycmF5KSB7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5LnJlZHVjZSgoYWNjdW0sIGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIChhY2N1bSArPSBpdGVtKTtcclxuICAgICAgICB9LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KHNob3VsZFVwZGF0ZSkge1xyXG4gICAgICAgIGlmIChzaG91bGRVcGRhdGUpIHtcclxuICAgICAgICAgICAgbGV0IHRvdGFsID0gdGhpcy5jYWxjVG90YWxzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMucmVkdWNlKChzdGFydEFuZ2xlLCBpdGVtLCBpKSA9PlxyXG4gICAgICAgICAgICAgICAgaXRlbS51cGRhdGUoc3RhcnRBbmdsZSwgdGhpcy5waWVTbGljZXNUb3RhbFtpXSwgdG90YWwpLFxyXG4gICAgICAgICAgICAgICAgMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5yZWR1Y2UoKGFjY3VtLCBpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmRyYXcoKSB8fCBhY2N1bTtcclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCBCYXNlIGZyb20gXCIuL0Jhc2UvQmFzZS5qc1wiO1xyXG5pbXBvcnQgSXRlbSBmcm9tIFwiLi9JdGVtL1N0YWNrZWQuanNcIjtcclxuXHJcblxyXG5jbGFzcyBTdGFja2VkQmFzZSBleHRlbmRzIEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoY3R4LCB3aWR0aCwgaGVpZ2h0LCBtYXJnaW5Ub3AsIGRhdGEsXHJcbiAgICAgICAgZHJhd1BvcHVwXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihjdHgsIHdpZHRoLCBoZWlnaHQsIG1hcmdpblRvcCwgZGF0YSwgZHJhd1BvcHVwKTtcclxuXHJcbiAgICAgICAgZGF0YS52YWx1ZXNZLmZvckVhY2goKGl0ZW0sIGkpID0+XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChuZXcgSXRlbShcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0LCBtYXJnaW5Ub3AsIGRhdGEuY29sb3JzW2ldLFxyXG4gICAgICAgICAgICAgICAgaXRlbVxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMubGFzdEFjdGlvbiA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVmVydGljYWxCb3VuZHMobCwgciwgYWN0aW9uID0gMCkge1xyXG4gICAgICAgIGxldCByZXMgPSB0aGlzLmRlZmluZVZlcnRpY2FsQm91bmRzKGwsIHIpO1xyXG4gICAgICAgIHRoaXMuYXhpc1ltYXgubmV3ViA9IHJlcy5tYXg7XHJcbiAgICAgICAgdGhpcy5sYXN0QWN0aW9uID0gYWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGRlZmluZVZlcnRpY2FsQm91bmRzKGwsIHIpIHtcclxuICAgICAgICBsZXQgYSA9IHRoaXMuY2FsY0Ftb3VudHMobCwgciwgdHJ1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHsgYW1vdW50czogYSwgbWF4OiBNYXRoLm1heCguLi5hKSwgbWluOiAwIH07XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY09uZUFtb3VudChpbmRleCkge1xyXG4gICAgICAgIGxldCBzdW0gPSAwO1xyXG4gICAgICAgIHRoaXMuZGF0YS52YWx1ZXNZLmZvckVhY2goKHZhbHVlc1ksIGkpID0+IHtcclxuICAgICAgICAgICAgc3VtICs9IHZhbHVlc1lbaW5kZXhdICogTnVtYmVyKHRoaXMuY2hlY2tzW2ldKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGNBbW91bnRzKGxlZnRCb3VuZEluZGV4LCByaWdodEJvdW5kSW5kZXgsIGZvcndhcmQgPSB0cnVlKSB7XHJcbiAgICAgICAgbGV0IHJhbmdlID0gcmlnaHRCb3VuZEluZGV4IC0gbGVmdEJvdW5kSW5kZXggKyAxO1xyXG4gICAgICAgIHJhbmdlIDwgMCAmJiAocmFuZ2UgPSAwKTtcclxuXHJcbiAgICAgICAgbGV0IGFjY3VtID0gbmV3IEFycmF5KHJhbmdlKS5maWxsKDApO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9yd2FyZCA/XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS52YWx1ZXNZLnJlZHVjZShjYWxjQW1vdW50c0ZvcndhcmQuYmluZCh0aGlzKSwgYWNjdW0pIDpcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnZhbHVlc1kucmVkdWNlKGNhbGNBbW91bnRzLmJpbmQodGhpcyksIGFjY3VtKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2FsY0Ftb3VudHMoYWNjdW0sIHZhbHVlc1lJdGVtLCBpKSB7XHJcbiAgICAgICAgICAgIGxldCBzbGljZSA9IHZhbHVlc1lJdGVtLnNsaWNlKGxlZnRCb3VuZEluZGV4LCByaWdodEJvdW5kSW5kZXggKyAxKTtcclxuICAgICAgICAgICAgc2xpY2UuZm9yRWFjaCgodmFsLCBqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhY2N1bVtqXSArPSB2YWwgKiB0aGlzLml0ZW1zW2ldLnZpc2liaWxpdHk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFjY3VtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2FsY0Ftb3VudHNGb3J3YXJkKGFjY3VtLCB2YWx1ZXNZSXRlbSwgaSkge1xyXG4gICAgICAgICAgICBsZXQgc2xpY2UgPSB2YWx1ZXNZSXRlbS5zbGljZShsZWZ0Qm91bmRJbmRleCwgcmlnaHRCb3VuZEluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIHNsaWNlLmZvckVhY2goKHZhbCwgaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWNjdW1bal0gKz0gdmFsICogTnVtYmVyKHRoaXMuY2hlY2tzW2ldKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYWNjdW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vINC+0YLRgNC40YHQvtCy0LrQsFxyXG4gICAgZHJhdyhzaG91bGRVcGRhdGUsIGNvb3Jkc1gsIGxlZnRCb3VuZEluZGV4LCByaWdodEJvdW5kSW5kZXgpIHtcclxuICAgICAgICBsZXQgaW5wdXQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgbCA9IHRoaXMuaXRlbXMubGVuZ3RoIC0gMTtcclxuXHJcbiAgICAgICAgaWYgKHNob3VsZFVwZGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURUKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzID0gdGhpcy5hbmltYXRlKHRoaXMuYXhpc1ltYXgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlcyA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlTWFya2luZyh0aGlzLmF4aXNZQW5pbWF0aW9uRHVyYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5heGlzWW1heC5uZXdWLCAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5wdXQgPSAhIXJlcyB8fCBpbnB1dDtcclxuXHJcbiAgICAgICAgICAgIGxldCBhbW91bnRzID0gdGhpcy5jYWxjQW1vdW50cyhsZWZ0Qm91bmRJbmRleCwgcmlnaHRCb3VuZEluZGV4LCBmYWxzZSksXHJcbiAgICAgICAgICAgICAgICBtYXggPSB0aGlzLmxhc3RBY3Rpb24gPT09IDAgPyB0aGlzLmF4aXNZbWF4LmN1clYgOiBNYXRoLm1heCguLi5hbW91bnRzKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBhbW91bnRzID0gdGhpcy5pdGVtc1tsIC0gaV0udXBkYXRlQ29vcmRzWShcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0Qm91bmRJbmRleCwgcmlnaHRCb3VuZEluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIG1heCwgYW1vdW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzY2FsZVggPSBjb29yZHNYWzFdIC0gY29vcmRzWFswXTtcclxuICAgICAgICBsZXQgbGFzdFggPSBjb29yZHNYW2Nvb3Jkc1gubGVuZ3RoIC0gMV0gKyBzY2FsZVg7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpbnB1dCA9IHRoaXMuaXRlbXNbbCAtIGldLmRyYXcoY29vcmRzWCwgbGFzdFgpIHx8IGlucHV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pc0hpZ2h0bGlnaHQgPT09IHRydWUgJiYgdGhpcy5kcmF3TWFzayhjb29yZHNYLCBzY2FsZVgpO1xyXG5cclxuICAgICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFja2VkIGV4dGVuZHMgU3RhY2tlZEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoY3R4LCB3aWR0aCwgaGVpZ2h0LCBtYXJnaW5Ub3AsIGRhdGEsXHJcbiAgICAgICAgZHJhd1BvcHVwLCBhbmltYXRlTWFya2luZ1xyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoY3R4LCB3aWR0aCwgaGVpZ2h0LCBtYXJnaW5Ub3AsIGRhdGEsIGRyYXdQb3B1cCk7XHJcblxyXG4gICAgICAgIHRoaXMuYW5pbWF0ZU1hcmtpbmcgPSBhbmltYXRlTWFya2luZztcclxuICAgIH1cclxuXHJcblxyXG4gICAgaGlnaGxpZ2h0SXRlbSh4LCB5LCBjb29yZHNYLCBzY2FsZVgsIGxlZnRCb3VuZEluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5mb2N1c1ggPSB4OyAvL9C30LDRh9C10Lw/XHJcbiAgICAgICAgdGhpcy5mb2N1c1kgPSB5O1xyXG5cclxuICAgICAgICB0aGlzLmlzSGlnaHRsaWdodCA9IHRydWU7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcigoeCAtIGNvb3Jkc1hbMF0pIC8gc2NhbGVYKTsgLy/QstC80LXRgdGC0L4gcm91bmRcclxuICAgICAgICBpbmRleCA8IDAgJiYgKGluZGV4ID0gMCk7XHJcblxyXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRJbmRleCA9IGluZGV4O1xyXG5cclxuICAgICAgICBsZXQgYW1vdW50ID0gdGhpcy5jYWxjT25lQW1vdW50KGluZGV4ICsgbGVmdEJvdW5kSW5kZXgpO1xyXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRBbW91bnQgPSBhbW91bnQ7XHJcbiAgICAgICAgbGV0IGRvY2tldHMgPSB0aGlzLml0ZW1zLnJlZHVjZSgoYWNjdW0sIGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tzW2ldID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBhY2N1bS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLmRhdGEubmFtZXNbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJlcGFyZVZhbHVlKHRoaXMuZGF0YS52YWx1ZXNZW2ldW2luZGV4ICsgbGVmdEJvdW5kSW5kZXhdKSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy/QvdC1INC30LDQsdGL0YLRjFxyXG4gICAgICAgICAgICAgICAgYWNjdW0ucHVzaCh7IG5hbWU6IFwiXCIsIHZhbHVlOiBcIlwiLCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWNjdW07XHJcbiAgICAgICAgfSwgW10pO1xyXG5cclxuICAgICAgICBkb2NrZXRzLnB1c2goeyBuYW1lOiBcIkFsbFwiLCB2YWx1ZTogdGhpcy5wcmVwYXJlVmFsdWUoYW1vdW50KSB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5kcmF3UG9wdXAoaW5kZXgsIGRvY2tldHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vbm8gcmVwISEhINC90L4g0LzQvtC20L3QviDRgdC00LXQu9Cw0YLRjCwg0YfRgtC+0LHRiyDQv9C+0LLRgtC+0YDRj9C70L7RgdGMLCDQtdGB0LvQuCDQvtGC0L/RgNCw0LLQu9GP0YLRjCDQsNGA0LPRg9C80LXQvdGC0L7QvCB5ID9cclxuICAgIGRyYXdNYXNrKGNvb3Jkc1gsIHNjYWxlWCkge1xyXG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eDtcclxuXHJcbiAgICAgICAgbGV0IGkgPSB0aGlzLmhpZ2hsaWdodGVkSW5kZXg7XHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG5cclxuICAgICAgICAvL9C/0L7RgdGL0LvQsNGC0Ywg0LDRgNCz0YPQvNC10L3RgtC+0Lw/XHJcbiAgICAgICAgbGV0IHkgPSB0aGlzLmhlaWdodCAtIHRoaXMuaGlnaGxpZ2h0ZWRBbW91bnQgKlxyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCAvIHRoaXMuYXhpc1ltYXguY3VyViArXHJcbiAgICAgICAgICAgIHRoaXMubWFyZ2luVG9wO1xyXG5cclxuICAgICAgICBjdHgubW92ZVRvKDAsIDApO1xyXG4gICAgICAgIGN0eC5saW5lVG8oMCwgdGhpcy5oZWlnaHQgKyB0aGlzLm1hcmdpblRvcCk7XHJcbiAgICAgICAgY3R4LmxpbmVUbyhjb29yZHNYW2ldLCB0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luVG9wKTtcclxuICAgICAgICBjdHgubGluZVRvKGNvb3Jkc1hbaV0sIHkpO1xyXG4gICAgICAgIGN0eC5saW5lVG8oY29vcmRzWFtpXSArIHNjYWxlWCwgeSk7XHJcbiAgICAgICAgY3R4LmxpbmVUbyhjb29yZHNYW2ldICsgc2NhbGVYLCB0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luVG9wKTtcclxuICAgICAgICBjdHgubGluZVRvKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICsgdGhpcy5tYXJnaW5Ub3ApO1xyXG4gICAgICAgIGN0eC5saW5lVG8odGhpcy53aWR0aCwgMCk7XHJcblxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB3aW5kb3cudGhlbWUuaGlnaGxpZ2h0TWFzaztcclxuICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLy8g0LHRg9C00YMg0LTQtdC70LDRgtGMINC90LDRgdC70LXQtNC+0LLQsNC90LjQtSDRgSDQvdC10LzQvdC+0LPQviDRgNCw0LfQvdGL0Lwg0YTRg9C90LrRhtC40L7QvdCw0LvQvtC8XHJcbmV4cG9ydCBjbGFzcyBTdGFja2VkTCBleHRlbmRzIFN0YWNrZWRCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKGN0eCwgd2lkdGgsIGhlaWdodCwgbWFyZ2luVG9wLCBkYXRhKSB7XHJcbiAgICAgICAgc3VwZXIoY3R4LCB3aWR0aCwgaGVpZ2h0LCBtYXJnaW5Ub3AsIGRhdGEpO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENoZWNrcyB7XHJcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRIVE1MLCBkYXRhLCBvbkNoYW5nZSkge1xyXG4gICAgICAgIHRoaXMucGFyZW50SFRNTCA9IHBhcmVudEhUTUw7XHJcblxyXG4gICAgICAgIHRoaXMuaHRtbCA9IHBhcmVudEhUTUwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgICAgICAgdGhpcy5odG1sLmNsYXNzTmFtZSA9IFwiY2hlY2tcIjtcclxuXHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xyXG4gICAgICAgIGRhdGEubmFtZXMuZm9yRWFjaCgobmFtZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3IENoZWNrQm94KFxyXG4gICAgICAgICAgICAgICAgdGhpcy5odG1sLCBkYXRhLmNvbG9yc1tpXSwgbmFtZSwgaSxcclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT5cclxuICAgICAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5odG1sLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5odG1sLnN0eWxlLnRyYW5zZm9ybSA9IFwicGVyc3BlY3RpdmUoMTBweCkgdHJhbnNsYXRlWigwKVwiO1xyXG4gICAgICAgICAgICB9KSwgMCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRzID0gKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgP1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkb3duOiBcIm9udG91Y2hzdGFydFwiLFxyXG4gICAgICAgICAgICAgICAgdXA6IFwib250b3VjaGVuZFwiLFxyXG4gICAgICAgICAgICB9IDpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZG93bjogXCJvbm1vdXNlZG93blwiLFxyXG4gICAgICAgICAgICAgICAgdXA6IFwib25tb3VzZXVwXCIsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuaHRtbFt0aGlzLmV2ZW50cy5kb3duXSA9IHRoaXMuaGFuZGxlQmVoYXZpb3VyLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQmVoYXZpb3VyKGUpIHtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gdGhpcy5odG1sKSByZXR1cm47XHJcbiAgICAgICAgd2hpbGUgKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2hlY2tCb3hcIikpIHtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbmRleCA9ICt0YXJnZXQuZ2V0QXR0cmlidXRlKFwiaWRcIik7XHJcblxyXG4gICAgICAgIGxldCB0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaHRtbFt0aGlzLmV2ZW50cy51cF0gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlR3JvdXAoaW5kZXgpO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcblxyXG4gICAgICAgIHRoaXMuaHRtbFt0aGlzLmV2ZW50cy51cF0gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0KTtcclxuICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZShpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuaHRtbFt0aGlzLmV2ZW50cy51cF0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWxlZ2F0ZUdyb3VwKGluZGV4KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNPbmVBY3RpdmUoaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0ucmVhY3QodHJ1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZWFjdCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZWFjdChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWxlZ2F0ZShpbmRleCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzT25lQWN0aXZlKGluZGV4KSkge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zW2luZGV4XS5zaGFrZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV3U3RhdGUgPSAhdGhpcy5pdGVtc1tpbmRleF0uc3RhdGU7XHJcbiAgICAgICAgdGhpcy5pdGVtc1tpbmRleF0ucmVhY3QobmV3U3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzT25lQWN0aXZlKGluZGV4KSB7XHJcbiAgICAgICAgbGV0IHN1bTtcclxuICAgICAgICBzdW0gPSBbXS5yZWR1Y2UuY2FsbCh0aGlzLmh0bWwuY2hpbGROb2RlcywgKGFjY3VtLCBpdGVtLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbmRleCA9PT0gaSA/IGFjY3VtIDogYWNjdW0gKz0gK2l0ZW0uZGF0YXNldC5pc0FjdGl2ZTtcclxuICAgICAgICB9LCAwKTtcclxuICAgICAgICByZXR1cm4gc3VtID09PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgaXRlbS5odG1sLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICBpdGVtLmh0bWwuc3R5bGUudHJhbnNmb3JtID0gXCJwZXJzcGVjdGl2ZSgxMHB4KSB0cmFuc2xhdGVaKC0xMHB4KVwiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5odG1sLnJlbW92ZSgpLCAyMDApO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgQ2hlY2tCb3gge1xyXG4gICAgY29uc3RydWN0b3IocGFyZW50SFRNTCwgY29sb3IsIG5hbWUsIGluZGV4LCBvbkNoYW5nZSkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG5cclxuICAgICAgICB0aGlzLnBhcmVudEhUTUwgPSBwYXJlbnRIVE1MO1xyXG5cclxuICAgICAgICB0aGlzLmJ1aWxkSFRNTChpbmRleCk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IG9uQ2hhbmdlO1xyXG5cclxuICAgICAgICB0aGlzLmh0bWwuZGF0YXNldC5pc0FjdGl2ZSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgc2hha2UoKSB7XHJcbiAgICAgICAgbGV0IGMgPSB0aGlzLmh0bWwuY2xhc3NMaXN0O1xyXG4gICAgICAgIGlmIChjLmNvbnRhaW5zKFwic2hha2luZ0Jsb2NrXCIpKSByZXR1cm47XHJcbiAgICAgICAgYy5hZGQoXCJzaGFraW5nQmxvY2tcIik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjLnJlbW92ZShcInNoYWtpbmdCbG9ja1wiKSwgODAwKTtcclxuICAgIH1cclxuXHJcbiAgICByZWFjdChzdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuaHRtbC5kYXRhc2V0LmlzQWN0aXZlID0gK3N0YXRlO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuaW5kZXgsIHN0YXRlKTtcclxuICAgICAgICB0aGlzLnJlRHJhdyhzdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVEcmF3KHN0YXRlKSB7XHJcbiAgICAgICAgaWYgKHN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaHRtbC5zdHlsZS5iYWNrZ3JvdW5kID0gdGhpcy5jb2xvcjtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZU1hcmtIVE1MLnN0eWxlLnRyYW5zZm9ybSA9IFwic2NhbGUoMSlcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmh0bWwuc3R5bGUuYmFja2dyb3VuZCA9IFwicmdiYSgwLDAsMCwwKVwiXHJcbiAgICAgICAgICAgIHRoaXMubGFiZWwuc3R5bGUuY29sb3IgPSB0aGlzLmNvbG9yO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlTWFya0hUTUwuc3R5bGUudHJhbnNmb3JtID0gXCJzY2FsZSgwKVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBidWlsZEhUTUwoaWQpIHtcclxuICAgICAgICBsZXQgcGFyZW50SFRNTCA9IHRoaXMucGFyZW50SFRNTDtcclxuICAgICAgICB0aGlzLmh0bWwgPSBwYXJlbnRIVE1MLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xyXG4gICAgICAgIGxldCBoID0gdGhpcy5odG1sO1xyXG4gICAgICAgIGguY2xhc3NOYW1lID0gXCJjaGVja0JveFwiO1xyXG4gICAgICAgIGguc3R5bGUuYmFja2dyb3VuZCA9IHRoaXMuY29sb3I7XHJcbiAgICAgICAgaC5zdHlsZS5ib3JkZXJDb2xvciA9IHRoaXMuY29sb3I7XHJcbiAgICAgICAgaC5pZCA9IGlkO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlTWFya0hUTUwgPSBoLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBcInN2Z1wiKSk7XHJcbiAgICAgICAgbGV0IGEgPSB0aGlzLnN0YXRlTWFya0hUTUw7XHJcbiAgICAgICAgYS5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIFwiMCAwIDQ2IDQ2XCIpO1xyXG4gICAgICAgIGEuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJjaGVja01hcmtcIik7XHJcbiAgICAgICAgbGV0IHBhdGggPSBhLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBcInBhdGhcIikpO1xyXG4gICAgICAgIHBhdGguc2V0QXR0cmlidXRlKFwiZFwiLFxyXG4gICAgICAgICAgICBcIk0yMC42ODcsMzguMzMyYy0yLjA3MiwyLjA3Mi01LjQzNCwyLjA3Mi03LjUwNSwwTDEuNTU0LDI2LjcwNGMtMi4wNzItMi4wNzEtMi4wNzItNS40MzMsMC03LjUwNCAgICBjMi4wNzEtMi4wNzIsNS40MzMtMi4wNzIsNy41MDUsMGw2LjkyOCw2LjkyN2MwLjUyMywwLjUyMiwxLjM3MiwwLjUyMiwxLjg5NiwwTDM2LjY0Miw3LjM2OGMyLjA3MS0yLjA3Miw1LjQzMy0yLjA3Miw3LjUwNSwwICAgIGMwLjk5NSwwLjk5NSwxLjU1NCwyLjM0NSwxLjU1NCwzLjc1MmMwLDEuNDA3LTAuNTU5LDIuNzU3LTEuNTU0LDMuNzUyTDIwLjY4NywzOC4zMzJ6XCJcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLmxhYmVsID0gaC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcclxuICAgICAgICB0aGlzLmxhYmVsLnRleHRDb250ZW50ID0gdGhpcy5uYW1lO1xyXG4gICAgICAgIHRoaXMubGFiZWwuY2xhc3NOYW1lID0gXCJjaGVja0xhYmVsXCI7XHJcblxyXG4gICAgfVxyXG5cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IodHlwZSwgY3R4LCB3aWR0aCwgaGVpZ2h0LCBzbGlkZXJLLCBkYXRhLCBib3hIVE1MKSB7XHJcbiAgICAgICAgdGhpcy5jaGFydFR5cGUgPSB0eXBlO1xyXG5cclxuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcclxuXHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICB0aGlzLnNsaWRlcksgPSBzbGlkZXJLO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyV2lkdGggPSB3aWR0aCAqIHNsaWRlcks7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcblxyXG4gICAgICAgIHRoaXMuYm94SFRNTCA9IGJveEhUTUw7XHJcblxyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uSGFwcGVucyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25SZXNpemUod2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB0aGlzLnNsaWRlcldpZHRoID0gdGhpcy5zbGlkZXJLICogd2lkdGg7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhcnRIZWlnaHQgPSB0aGlzLmhlaWdodCAqIHRoaXMucmF0aW9bMV0gLyAxMDAsXHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRNYXJnaW5Ub3AgPSB0aGlzLmhlaWdodCAqIHRoaXMucmF0aW9bMF0gLyAxMDA7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhcnRDb250cm9sbGVyLm9uUmVzaXplKHRoaXMud2lkdGgsIHRoaXMuY2hhcnRIZWlnaHQsIHRoaXMuY2hhcnRNYXJnaW5Ub3ApO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVHVtYmxlclVwZGF0ZSh0dW1ibGVyU3RhcnQsIHR1bWJsZXJXaWR0aCwgZmxhZ0hlYWRlclVwZGF0ZSkge1xyXG4gICAgICAgIHRoaXMuc2hvdWxkQ2hhcnRzVXBkYXRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy50dW1ibGVyU3RhcnQgPSB0dW1ibGVyU3RhcnQ7XHJcbiAgICAgICAgdGhpcy50dW1ibGVyV2lkdGggPSB0dW1ibGVyV2lkdGg7XHJcblxyXG4gICAgICAgIGxldCB2YWx1ZXNOdW1iZXIgPSB0aGlzLmRhdGEudmFsdWVzWVswXS5sZW5ndGgsXHJcbiAgICAgICAgICAgIG4gPSB2YWx1ZXNOdW1iZXIgLSAxO1xyXG5cclxuICAgICAgICB0aGlzLmxlZnRCb3VuZEluZGV4ID0gTWF0aC5jZWlsKG4gKiB0dW1ibGVyU3RhcnQgLyB0aGlzLnNsaWRlcldpZHRoKTtcclxuICAgICAgICB0aGlzLnJpZ2h0Qm91bmRJbmRleCA9IE1hdGguZmxvb3IoKG4gKiAodHVtYmxlclN0YXJ0ICsgdHVtYmxlcldpZHRoKSkgLyB0aGlzLnNsaWRlcldpZHRoKTtcclxuICAgICAgICB0aGlzLnJpZ2h0Qm91bmRJbmRleCA8IHRoaXMubGVmdEJvdW5kSW5kZXggJiYgKHRoaXMubGVmdEJvdW5kSW5kZXggPSB0aGlzLnJpZ2h0Qm91bmRJbmRleCk7XHJcblxyXG4gICAgICAgIHRoaXMudHJhbnNpdGlvbkhhcHBlbnMgPT09IHRydWUgfHxcclxuICAgICAgICAgICAgdGhpcy5jaGFydENvbnRyb2xsZXIudXBkYXRlVmVydGljYWxCb3VuZHModGhpcy5sZWZ0Qm91bmRJbmRleCwgdGhpcy5yaWdodEJvdW5kSW5kZXgpO1xyXG5cclxuICAgICAgICBmbGFnSGVhZGVyVXBkYXRlICYmIHRoaXMudXBkYXRlSGVhZGVyRGF0ZSh0aGlzLmRlZmluZUhlYWRlckRhdGVMYWJlbChcclxuICAgICAgICAgICAgdGhpcy5sZWZ0Qm91bmRJbmRleCwgdGhpcy5yaWdodEJvdW5kSW5kZXgpLCB0aGlzLnpvb21lZCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2NhbGVYID0gKHRoaXMud2lkdGggLyB2YWx1ZXNOdW1iZXIpICogKHRoaXMuc2xpZGVyV2lkdGggLyB0dW1ibGVyV2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENoZWNrcygpIHtcclxuICAgICAgICBbXS5mb3JFYWNoLmNhbGwoXHJcbiAgICAgICAgICAgIHRoaXMuYm94SFRNTC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNoZWNrQm94XCIpLFxyXG4gICAgICAgICAgICAoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXRlID0gISEocGFyc2VJbnQoaXRlbS5kYXRhc2V0LmlzQWN0aXZlKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFydENvbnRyb2xsZXIuaXRlbXNbaV0udmlzaWJpbGl0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFydENvbnRyb2xsZXIuY2hlY2tzW2ldID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGNDb29yZHNYKGxlZnRCb3VuZEluZGV4LCByaWdodEJvdW5kSW5kZXgsIHNjYWxlWCwgb2Zmc2V0KSB7XHJcbiAgICAgICAgbGV0IGNvb3Jkc1ggPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByaWdodEJvdW5kSW5kZXggLSBsZWZ0Qm91bmRJbmRleCArIDE7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgeDAgPSAodGhpcy5kYXRhLnZhbHVlc051bWJlciAtIGxlZnRCb3VuZEluZGV4IC0gaSkgKiBzY2FsZVgsXHJcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy53aWR0aCAtIHgwICsgb2Zmc2V0O1xyXG4gICAgICAgICAgICBjb29yZHNYLnB1c2goTWF0aC5yb3VuZCh4ICogMTAwKSAvIDEwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29vcmRzWDtcclxuICAgIH1cclxuXHJcbiAgICBvbkNoZWNrQm94ZXNTdGF0ZUNoYW5nZShpbmRleCwgc3RhdGUpIHtcclxuICAgICAgICBpZiAodGhpcy5tYXJraW5ncykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGFydFR5cGUgPT09IFwibGluZXMyWVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtpbmdzW2luZGV4XS5pbml0VmlzaWJpbGl0eUFuaW1hdGlvbihzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtpbmdzWzFdLnNldFN0YXRpY1Zpc2liaWxpdHkoIXN0YXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoYXJ0Q29udHJvbGxlci5hbmltYXRlVmlzaWJpbGl0eShpbmRleCwgc3RhdGUpO1xyXG4gICAgICAgIHRoaXMuY2hhcnRDb250cm9sbGVyLnVwZGF0ZVZlcnRpY2FsQm91bmRzKHRoaXMubGVmdEJvdW5kSW5kZXgsIHRoaXMucmlnaHRCb3VuZEluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgdGhpcy5zaG91bGRDaGFydHNVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uSGFwcGVucyB8fCB0aGlzLmRyYXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlKGFuaW1hdGlvbkhhcHBlbnMpIHtcclxuICAgICAgICBpZiAoYW5pbWF0aW9uSGFwcGVucykge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkhhcHBlbnMgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdWxkQ2hhcnRzVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uSGFwcGVucyA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGlvbkhhcHBlbnMgJiYgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuZHJhdygpKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVEVCgpIHtcclxuICAgICAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB0aGlzLmR0ID0gbm93IC0gdGhpcy5sYXN0VGltZTtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gbm93O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL9Cy0YHQtdCz0LTQsCDQvtGC0L3QuNC80LDQtdC8IHRvIC0geEZyb21cclxuICAgIGluaXRBcHBlYXJBbmltYXRpb24oeEZyb20sIGR1cikge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRFQoKTtcclxuICAgICAgICB0aGlzLmR1ciA9IGR1cjtcclxuICAgICAgICB0aGlzLmR1clByb2dyZXNzID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5jdHguZ2xvYmFsQWxwaGEgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLnRyYW5zaXRpb25IYXBwZW5zID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmFuaW1hdGUodHJ1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMudHJhbnNpdGlvblN0ZXBPZlMgPSAodGhpcy50dW1ibGVyU3RhcnQgLSB4RnJvbS50dW1ibGVyU3RhcnQpIC8gZHVyO1xyXG4gICAgICAgIHRoaXMudHJhbnNpdGlvbkRpZmZPZlRXID0gdGhpcy50dW1ibGVyV2lkdGggLSB4RnJvbS50dW1ibGVyV2lkdGg7IC8v0L3Rg9C20LXQvSDQtNC70Y8g0L7Qv9GA0LXQtNC10LvQtdC90LjRjyDQv9GA0L7Qt9GA0LDRh9C90L7RgdGC0LhcclxuICAgICAgICB0aGlzLnRyYW5zaXRpb25TdGVwT2ZUVyA9IHRoaXMudHJhbnNpdGlvbkRpZmZPZlRXIC8gZHVyO1xyXG5cclxuICAgICAgICB0aGlzLnpvb21EaXIgPSBNYXRoLnNpZ24odGhpcy50cmFuc2l0aW9uU3RlcE9mVFcpO1xyXG5cclxuICAgICAgICAvL9GN0YLQviDQv9C+INGB0YPRgtC4IHRvXHJcbiAgICAgICAgdGhpcy50YXJnZXRTdGFydCA9IHRoaXMudHVtYmxlclN0YXJ0O1xyXG4gICAgICAgIHRoaXMudGFyZ2V0VHVtYmxlcldpZHRoID0gdGhpcy50dW1ibGVyV2lkdGg7XHJcblxyXG4gICAgICAgIHRoaXMudHVtYmxlclN0YXJ0ID0geEZyb20udHVtYmxlclN0YXJ0O1xyXG4gICAgICAgIHRoaXMudHVtYmxlcldpZHRoID0geEZyb20udHVtYmxlcldpZHRoO1xyXG5cclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT5cclxuICAgICAgICAgICAgdGhpcy5hbmltYXRlQXBwZWFyKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVBcHBlYXIoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEVCgpO1xyXG4gICAgICAgIHRoaXMuZHVyUHJvZ3Jlc3MgKz0gdGhpcy5kdDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHVyUHJvZ3Jlc3MgPj0gdGhpcy5kdXIpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZ2xvYmFsQWxwaGEgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLnR1bWJsZXJTdGFydCA9IHRoaXMudGFyZ2V0U3RhcnQ7XHJcbiAgICAgICAgICAgIHRoaXMudHVtYmxlcldpZHRoID0gdGhpcy50YXJnZXRUdW1ibGVyV2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkhhcHBlbnMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5vblR1bWJsZXJVcGRhdGUodGhpcy50dW1ibGVyU3RhcnQsIHRoaXMudHVtYmxlcldpZHRoLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy50YXJnZXRTdGFydDtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMudGFyZ2V0VHVtYmxlcldpZHRoO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy56b29tRGlyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBrMSA9IHRoaXMudHJhbnNpdGlvblN0ZXBPZlMgKiB0aGlzLmR0LFxyXG4gICAgICAgICAgICAgICAgazIgPSB0aGlzLnRyYW5zaXRpb25TdGVwT2ZUVyAqIHRoaXMuZHQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmF0aW8gPSAodGhpcy50YXJnZXRUdW1ibGVyV2lkdGggLSB0aGlzLnR1bWJsZXJXaWR0aCkgLyB0aGlzLnRyYW5zaXRpb25EaWZmT2ZUVztcclxuICAgICAgICAgICAgdGhpcy5jdHguZ2xvYmFsQWxwaGEgPSAxIC0gcmF0aW87XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uVHVtYmxlclVwZGF0ZSh0aGlzLnR1bWJsZXJTdGFydCArIGsxLCB0aGlzLnR1bWJsZXJXaWR0aCArIGsyLCBmYWxzZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVBcHBlYXIoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpbml0RGlzYXBwZWFyQW5pbWF0aW9uKHhUbywgZHVyLCByZXNvbHZlKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEVCgpO1xyXG4gICAgICAgIHRoaXMuZHVyID0gZHVyO1xyXG4gICAgICAgIHRoaXMuZHVyUHJvZ3Jlc3MgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLnRyYW5zaXRpb25IYXBwZW5zID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmFuaW1hdGUodHJ1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMudHJhbnNpdGlvblN0ZXBPZlMgPSAoeFRvLnR1bWJsZXJTdGFydCAtIHRoaXMudHVtYmxlclN0YXJ0KSAvIGR1cjtcclxuICAgICAgICB0aGlzLnRyYW5zaXRpb25EaWZmT2ZUVyA9IHhUby50dW1ibGVyV2lkdGggLSB0aGlzLnR1bWJsZXJXaWR0aDtcclxuICAgICAgICB0aGlzLnRyYW5zaXRpb25TdGVwT2ZUVyA9IHRoaXMudHJhbnNpdGlvbkRpZmZPZlRXIC8gZHVyO1xyXG5cclxuICAgICAgICB0aGlzLnpvb21EaXIgPSBNYXRoLnNpZ24odGhpcy50cmFuc2l0aW9uU3RlcE9mVFcpO1xyXG4gICAgICAgIHRoaXMuem9vbU9mZnNldCA9IE1hdGguc2lnbih0aGlzLnRyYW5zaXRpb25TdGVwT2ZUVyk7XHJcblxyXG4gICAgICAgIHRoaXMudGFyZ2V0U3RhcnQgPSB4VG8udHVtYmxlclN0YXJ0O1xyXG4gICAgICAgIHRoaXMudGFyZ2V0VHVtYmxlcldpZHRoID0geFRvLnR1bWJsZXJXaWR0aDtcclxuXHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURpc2FwcGVhcihyZXNvbHZlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURpc2FwcGVhcihyZXNvbHZlKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEVCgpO1xyXG4gICAgICAgIHRoaXMuZHVyUHJvZ3Jlc3MgKz0gdGhpcy5kdDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHVyUHJvZ3Jlc3MgPj0gdGhpcy5kdXIpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZ2xvYmFsQWxwaGEgPSAwO1xyXG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBrMSA9IHRoaXMudHJhbnNpdGlvblN0ZXBPZlMgKiB0aGlzLmR0LFxyXG4gICAgICAgICAgICAgICAgazIgPSB0aGlzLnRyYW5zaXRpb25TdGVwT2ZUVyAqIHRoaXMuZHQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmF0aW8gPSAodGhpcy50YXJnZXRUdW1ibGVyV2lkdGggLSB0aGlzLnR1bWJsZXJXaWR0aCkgLyB0aGlzLnRyYW5zaXRpb25EaWZmT2ZUVztcclxuICAgICAgICAgICAgdGhpcy5jdHguZ2xvYmFsQWxwaGEgPSByYXRpbztcclxuXHJcbiAgICAgICAgICAgIHRoaXMub25UdW1ibGVyVXBkYXRlKHRoaXMudHVtYmxlclN0YXJ0ICsgazEsIHRoaXMudHVtYmxlcldpZHRoICsgazIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGlzYXBwZWFyKHJlc29sdmUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHJvdW5kUmVjdCBmcm9tIFwiLi4vcm91bmRSZWN0LmpzXCI7XHJcbmltcG9ydCBCYXNlIGZyb20gXCIuL0Jhc2UvQmFzZS5qc1wiO1xyXG5cclxuaW1wb3J0IHsgTGluZXNMIH0gZnJvbSBcIi4uL0NoYXJ0Q29udHJvbGxlci9MaW5lcy5qc1wiO1xyXG5pbXBvcnQgeyBMaW5lczJZTCB9IGZyb20gXCIuLi9DaGFydENvbnRyb2xsZXIvTGluZXMyWS5qc1wiO1xyXG5pbXBvcnQgeyBEYWlseUwgfSBmcm9tIFwiLi4vQ2hhcnRDb250cm9sbGVyL0RhaWx5LmpzXCI7XHJcbmltcG9ydCB7IFN0YWNrZWRMIH0gZnJvbSBcIi4uL0NoYXJ0Q29udHJvbGxlci9TdGFja2VkLmpzXCI7XHJcbmltcG9ydCB7IFBlcmNlbnRhZ2VMIH0gZnJvbSBcIi4uL0NoYXJ0Q29udHJvbGxlci9QZXJjZW50YWdlLmpzXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG93ZXIgZXh0ZW5kcyBCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHR5cGUsIGN0eCwgd2lkdGgsIGhlaWdodCwgc2xpZGVySywgZGF0YSwgdHVtYmxlclN0YXJ0LCB0dW1ibGVyV2lkdGgsIGJveEhUTUwpIHtcclxuICAgICAgICBzdXBlcih0eXBlLCBjdHgsIHdpZHRoLCBoZWlnaHQsIHNsaWRlckssIGRhdGEsIGJveEhUTUwpO1xyXG5cclxuICAgICAgICB0aGlzLnJhdGlvID0gWzAsIDEwMCwgMF07XHJcblxyXG4gICAgICAgIGxldCBDaGFydDtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsaW5lc1wiOiBDaGFydCA9IExpbmVzTDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibGluZXMyWVwiOiBDaGFydCA9IExpbmVzMllMO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzdGFja2VkXCI6IENoYXJ0ID0gU3RhY2tlZEw7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImRhaWx5XCI6IENoYXJ0ID0gRGFpbHlMO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwZXJjZW50YWdlXCI6IENoYXJ0ID0gUGVyY2VudGFnZUw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNoYXJ0SGVpZ2h0ID0gdGhpcy5oZWlnaHQgKiB0aGlzLnJhdGlvWzFdIC8gMTAwO1xyXG4gICAgICAgIHRoaXMuY2hhcnRNYXJnaW5Ub3AgPSB0aGlzLmhlaWdodCAqIHRoaXMucmF0aW9bMF0gLyAxMDA7XHJcbiAgICAgICAgdGhpcy5jaGFydENvbnRyb2xsZXIgPSBuZXcgQ2hhcnQoXHJcbiAgICAgICAgICAgIGN0eCwgd2lkdGgsIHRoaXMuY2hhcnRIZWlnaHQsIHRoaXMuY2hhcnRNYXJnaW5Ub3AsIGRhdGFcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0eXBlID09PSBcImRhaWx5XCIgfHwgdGhpcy5zZXRDaGVja3MoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblR1bWJsZXJVcGRhdGUodHVtYmxlclN0YXJ0LCB0dW1ibGVyV2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v0LzQtdGC0L7QtCwg0YDQtdCw0LPQuNGA0YPRjtGJ0LjQuSDQsiDQvtGC0LLQtdGCINC90LAg0LTQtdC50YHRgtCy0LjRjyDRgdC70LDQudC00LXRgNCwXHJcbiAgICBvblR1bWJsZXJVcGRhdGUodHVtYmxlclN0YXJ0LCB0dW1ibGVyV2lkdGgpIHtcclxuICAgICAgICBzdXBlci5vblR1bWJsZXJVcGRhdGUodHVtYmxlclN0YXJ0LCB0dW1ibGVyV2lkdGgpO1xyXG5cclxuICAgICAgICB0aGlzLmxlZnRCb3VuZEluZGV4IC09IDI7XHJcbiAgICAgICAgdGhpcy5yaWdodEJvdW5kSW5kZXggKz0gMjtcclxuXHJcbiAgICAgICAgbGV0IG4gPSB0aGlzLmRhdGEudmFsdWVzWVswXS5sZW5ndGggLSAxO1xyXG4gICAgICAgIHRoaXMucmlnaHRCb3VuZEluZGV4ID49IG4gJiYgKHRoaXMucmlnaHRCb3VuZEluZGV4ID0gbik7XHJcbiAgICAgICAgdGhpcy5sZWZ0Qm91bmRJbmRleCA8IDAgJiYgKHRoaXMubGVmdEJvdW5kSW5kZXggPSAwKTtcclxuXHJcbiAgICAgICAgbGV0IGsgPSB0aGlzLndpZHRoIC0gKHR1bWJsZXJTdGFydCArIHR1bWJsZXJXaWR0aCksXHJcbiAgICAgICAgICAgIG9mZnNldCA9IGsgKiB0aGlzLndpZHRoIC8gdHVtYmxlcldpZHRoO1xyXG5cclxuICAgICAgICB0aGlzLmNvb3Jkc1ggPSB0aGlzLmNhbGNDb29yZHNYKFxyXG4gICAgICAgICAgICB0aGlzLmxlZnRCb3VuZEluZGV4LCB0aGlzLnJpZ2h0Qm91bmRJbmRleCwgdGhpcy5zY2FsZVgsIG9mZnNldFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vINC40L3QuNGG0LjQuNGA0YPQtdC8INC+0YLRgNC40YHQvtCy0LrRgywg0LXRgdC70Lgg0L7QvdCwINCw0L3QuNC80LDRhtC40Y8g0YHQv9C40YJcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbkhhcHBlbnMgfHwgdGhpcy5kcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHg7XHJcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dDEgPSB0aGlzLmNoYXJ0Q29udHJvbGxlci5kcmF3KHRoaXMuc2hvdWxkQ2hhcnRzVXBkYXRlLFxyXG4gICAgICAgICAgICB0aGlzLmNvb3Jkc1gsIHRoaXMubGVmdEJvdW5kSW5kZXgsXHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRCb3VuZEluZGV4KTtcclxuXHJcbiAgICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24taW5cIjtcclxuICAgICAgICByb3VuZFJlY3QoY3R4LCAwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMTUsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGUoaW5wdXQxKTtcclxuICAgIH1cclxuXHJcbiAgICBvblJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgc3VwZXIub25SZXNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMub25UdW1ibGVyVXBkYXRlKDAsIHRoaXMud2lkdGgpO1xyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGlvbkhhcHBlbnMgfHwgdGhpcy5kcmF3KCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgcm91bmRSZWN0IGZyb20gXCIuLi9yb3VuZFJlY3QuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjdHgsIGh0bWwsIHdpZHRoLCBoZWlnaHQsIHR1bWJsZXJMaW1pdGVyLCB1cHBlcikge1xyXG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xyXG4gICAgICAgIHRoaXMuaHRtbCA9IGh0bWw7XHJcbiAgICAgICAgdGhpcy5wYXJlbnRIVE1MID0gaHRtbC5wYXJlbnROb2RlO1xyXG5cclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgIHRoaXMudHVtYmxlckxpbWl0ZXIgPSB0dW1ibGVyTGltaXRlcjtcclxuICAgICAgICB0aGlzLm1pblR1bWJsZXJXaWR0aCA9IHRoaXMud2lkdGggLyB0dW1ibGVyTGltaXRlcjtcclxuICAgICAgICB0aGlzLmJvcmRlcnMgPSBbMTYsIDNdO1xyXG5cclxuICAgICAgICB0aGlzLnVwcGVyID0gdXBwZXI7XHJcblxyXG4gICAgICAgIHRoaXMubGl2ZUR1ciA9IDMwMDtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSA/XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlzRGVza3RvcDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBkb3duOiBcIm9udG91Y2hzdGFydFwiLFxyXG4gICAgICAgICAgICAgICAgdXA6IFwib250b3VjaGVuZFwiLFxyXG4gICAgICAgICAgICAgICAgbW92ZTogXCJvbnRvdWNobW92ZVwiLFxyXG4gICAgICAgICAgICAgICAgbGVhdmU6IFwib250b3VjaGVuZFwiXHJcbiAgICAgICAgICAgIH0gOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpc0Rlc2t0b3A6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkb3duOiBcIm9ubW91c2Vkb3duXCIsXHJcbiAgICAgICAgICAgICAgICB1cDogXCJvbm1vdXNldXBcIixcclxuICAgICAgICAgICAgICAgIG1vdmU6IFwib25tb3VzZW1vdmVcIixcclxuICAgICAgICAgICAgICAgIGxlYXZlOiBcIm9ubW91c2VsZWF2ZVwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuaHRtbFt0aGlzLmV2ZW50cy5kb3duXSA9IGUgPT4gdGhpcy5oYW5kbGVUdW1ibGVyRG93bihlKTtcclxuXHJcbiAgICAgICAgdGhpcy5pc0xpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbkhhcHBlbnMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzVG9ybiA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaEluZmx1ZW5jZShzdGF0ZSwgdXBwZXIpIHtcclxuICAgICAgICB0aGlzLmlzVG9ybiA9ICFzdGF0ZTtcclxuICAgICAgICBsZXQgc3R1YiA9IHsgb25UdW1ibGVyVXBkYXRlOiAoKSA9PiB7IH0gfTtcclxuICAgICAgICB1cHBlciA/IHRoaXMub25VcHBlclVwZGF0ZSh1cHBlcikgOiB0aGlzLm9uVXBwZXJVcGRhdGUoc3R1Yik7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcHBlclVwZGF0ZShuZXdVcHBlcikge1xyXG4gICAgICAgIHRoaXMudXBwZXIgPSBuZXdVcHBlcjtcclxuICAgIH1cclxuXHJcbiAgICBvblJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgbGV0IHJhdGlvID0gd2lkdGggLyB0aGlzLndpZHRoO1xyXG5cclxuICAgICAgICB0aGlzLnR1bWJsZXJTdGFydCAqPSByYXRpbztcclxuICAgICAgICB0aGlzLnR1bWJsZXJXaWR0aCAqPSByYXRpbztcclxuXHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICB0aGlzLm1pblR1bWJsZXJXaWR0aCA9IHRoaXMud2lkdGggLyB0aGlzLnR1bWJsZXJMaW1pdGVyO1xyXG5cclxuICAgICAgICB0aGlzLnVwcGVyLm9uVHVtYmxlclVwZGF0ZSh0aGlzLnR1bWJsZXJTdGFydCwgdGhpcy50dW1ibGVyV2lkdGgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKHRoaXMudHVtYmxlclN0YXJ0LCB0aGlzLnR1bWJsZXJXaWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlVHVtYmxlckRvd24oZSkge1xyXG4gICAgICAgIGxldCB0b29sdGlwQXJlYSA9IHRoaXMucGFyZW50SFRNTC5xdWVyeVNlbGVjdG9yKFwiLnRvb2x0aXBBcmVhXCIpO1xyXG4gICAgICAgIHRvb2x0aXBBcmVhLmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgICAgICAgIG5ldyBFdmVudChcIm1vdXNlbGVhdmVcIilcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1Rvcm4gPT09IHRydWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgd2luZG93LnNsaWRlckRvd24gPSB0cnVlO1xyXG5cclxuICAgICAgICBsZXQgeCA9IHRoaXMuZXZlbnRzLmlzRGVza3RvcCA/IGUuY2xpZW50WCA6IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcclxuICAgICAgICBsZXQgb2Zmc2V0TGVmdCA9IHRoaXMuaHRtbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xyXG4gICAgICAgIGxldCBvZmZzZXRYID0geCAtIG9mZnNldExlZnQ7XHJcbiAgICAgICAgbGV0IHNoaWZ0WCA9IG9mZnNldFggLSB0aGlzLnR1bWJsZXJTdGFydDtcclxuXHJcbiAgICAgICAgaWYgKHNoaWZ0WCA+IDAgJiYgc2hpZnRYIDw9IHRoaXMudHVtYmxlcldpZHRoKSB7XHJcbiAgICAgICAgICAgIGxldCBzaWRlID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmIChzaGlmdFggPCAxNSkge1xyXG4gICAgICAgICAgICAgICAgc2lkZSA9IFwibFwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNoaWZ0WCA+IHRoaXMudHVtYmxlcldpZHRoIC0gMTUpIHtcclxuICAgICAgICAgICAgICAgIHNpZGUgPSBcInJcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNpZGUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVHVtYmxlck1vdmUoc2hpZnRYKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVHVtYmxlckV4dGVuZChlLCBzaWRlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnRbdGhpcy5ldmVudHMudXBdID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnNsaWRlckRvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50W3RoaXMuZXZlbnRzLm1vdmVdID0gZG9jdW1lbnQub25tb3VzZXVwID0gbnVsbDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlVHVtYmxlck1vdmUoc2hpZnRYKSB7XHJcbiAgICAgICAgZG9jdW1lbnRbdGhpcy5ldmVudHMubW92ZV0gPSBlID0+IHtcclxuICAgICAgICAgICAgbGV0IHggPSB0aGlzLmV2ZW50cy5pc0Rlc2t0b3AgPyBlLmNsaWVudFggOiBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRMZWZ0ID0gdGhpcy5odG1sLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRYID0geCAtIG9mZnNldExlZnQ7XHJcbiAgICAgICAgICAgIGxldCBuZXdUdW1ibGVyTGVmdCA9IG9mZnNldFggLSBzaGlmdFg7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3BhY2UgPSB0aGlzLndpZHRoIC0gdGhpcy50dW1ibGVyV2lkdGg7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV3VHVtYmxlckxlZnQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdUdW1ibGVyTGVmdCA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3VHVtYmxlckxlZnQgPiBzcGFjZSkge1xyXG4gICAgICAgICAgICAgICAgbmV3VHVtYmxlckxlZnQgPSBzcGFjZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/QtNGD0LHQu9C40YDRg9C10YLRgdGPXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFuaW1hdGlvbkhhcHBlbnMgJiZcclxuICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyhuZXdUdW1ibGVyTGVmdCAtIHRoaXMudHVtYmxlclN0YXJ0KSA+PVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVHVtYmxlcldpZHRoIC8gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXMgPSB0aGlzLmNhbGNBbmltT2Zmc2V0KG5ld1R1bWJsZXJMZWZ0LCB0aGlzLnR1bWJsZXJXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0QW5pbWF0ZVR1bWJsZXIocmVzWzBdLCByZXNbMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cHBlci5vblR1bWJsZXJVcGRhdGUobmV3VHVtYmxlckxlZnQsIHRoaXMudHVtYmxlcldpZHRoLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKG5ld1R1bWJsZXJMZWZ0LCB0aGlzLnR1bWJsZXJXaWR0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGhhbmRsZVR1bWJsZXJFeHRlbmQoZSwgc2lkZSkge1xyXG4gICAgICAgIGxldCB4ID0gdGhpcy5ldmVudHMuaXNEZXNrdG9wID8gZS5jbGllbnRYIDogZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYO1xyXG4gICAgICAgIGxldCBvZmZzZXRMZWZ0ID0gdGhpcy5odG1sLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICAgICAgbGV0IG9mZnNldFgwID0geCAtIG9mZnNldExlZnQ7XHJcbiAgICAgICAgbGV0IHR1bWJsZXJXaWR0aDAgPSB0aGlzLnR1bWJsZXJXaWR0aDtcclxuICAgICAgICBsZXQgdHVtYmxlckxlZnQwID0gdGhpcy50dW1ibGVyU3RhcnQ7XHJcbiAgICAgICAgbGV0IG1hcmdpblJpZ2h0MCA9IHRoaXMud2lkdGggLSAodHVtYmxlckxlZnQwICsgdHVtYmxlcldpZHRoMCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50W3RoaXMuZXZlbnRzLm1vdmVdID0gZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBuZXdUdW1ibGVyV2lkdGgsIG5ld1R1bWJsZXJMZWZ0O1xyXG4gICAgICAgICAgICBsZXQgeCA9IHRoaXMuZXZlbnRzLmlzRGVza3RvcCA/IGUuY2xpZW50WCA6IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcclxuICAgICAgICAgICAgbGV0IG9mZnNldExlZnQgPSB0aGlzLmh0bWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgICAgICAgICAgbGV0IG9mZnNldFggPSB4IC0gb2Zmc2V0TGVmdDtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IG9mZnNldFggLSBvZmZzZXRYMDtcclxuXHJcbiAgICAgICAgICAgIGlmIChzaWRlID09PSBcInJcIikge1xyXG4gICAgICAgICAgICAgICAgbmV3VHVtYmxlcldpZHRoID0gdHVtYmxlcldpZHRoMCArIG9mZnNldDtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdNYXJnaW5SaWdodCA9IG5ld1R1bWJsZXJXaWR0aCArIHR1bWJsZXJMZWZ0MDtcclxuICAgICAgICAgICAgICAgIG5ld01hcmdpblJpZ2h0ID4gdGhpcy53aWR0aCAmJiAobmV3VHVtYmxlcldpZHRoID0gdGhpcy53aWR0aCAtIHR1bWJsZXJMZWZ0MCk7XHJcbiAgICAgICAgICAgICAgICBuZXdUdW1ibGVyTGVmdCA9IHR1bWJsZXJMZWZ0MDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld1R1bWJsZXJXaWR0aCA9IHR1bWJsZXJXaWR0aDAgLSBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICBuZXdUdW1ibGVyTGVmdCA9IHRoaXMud2lkdGggLSAobWFyZ2luUmlnaHQwICsgbmV3VHVtYmxlcldpZHRoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobmV3VHVtYmxlckxlZnQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VHVtYmxlcldpZHRoID0gdGhpcy53aWR0aCAtIG1hcmdpblJpZ2h0MDtcclxuICAgICAgICAgICAgICAgICAgICBuZXdUdW1ibGVyTGVmdCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdUdW1ibGVyV2lkdGggPCB0aGlzLm1pblR1bWJsZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgbmV3VHVtYmxlcldpZHRoID0gdGhpcy5taW5UdW1ibGVyV2lkdGg7XHJcbiAgICAgICAgICAgICAgICBzaWRlID09PSBcImxcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChuZXdUdW1ibGVyTGVmdCA9IHRoaXMud2lkdGggLSB0aGlzLm1pblR1bWJsZXJXaWR0aCAtIG1hcmdpblJpZ2h0MCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3VHVtYmxlcldpZHRoID4gdGhpcy53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgbmV3VHVtYmxlcldpZHRoID0gdGhpcy53aWR0aDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMaXZlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYW5pbWF0aW9uSGFwcGVucyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIE1hdGguYWJzKG5ld1R1bWJsZXJXaWR0aCAtIHRoaXMudHVtYmxlcldpZHRoKSA+PVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVHVtYmxlcldpZHRoIC8gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXMgPSB0aGlzLmNhbGNBbmltT2Zmc2V0KG5ld1R1bWJsZXJMZWZ0LCBuZXdUdW1ibGVyV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdEFuaW1hdGVUdW1ibGVyKHJlc1swXSwgcmVzWzFdKTtcclxuICAgICAgICAgICAgICAgIH0gbmV3VHVtYmxlcldpZHRoLCB0aGlzLm1pblR1bWJsZXJXaWR0aFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cHBlci5vblR1bWJsZXJVcGRhdGUobmV3VHVtYmxlckxlZnQsIG5ld1R1bWJsZXJXaWR0aCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZShuZXdUdW1ibGVyTGVmdCwgbmV3VHVtYmxlcldpZHRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUodHVtYmxlclN0YXJ0LCB0dW1ibGVyV2lkdGgpIHtcclxuICAgICAgICB0aGlzLnR1bWJsZXJTdGFydCA9IHR1bWJsZXJTdGFydDtcclxuICAgICAgICB0aGlzLnR1bWJsZXJXaWR0aCA9IHR1bWJsZXJXaWR0aDtcclxuXHJcbiAgICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY0FuaW1PZmZzZXQodHVtYmxlclN0YXJ0LCB0dW1ibGVyV2lkdGgpIHtcclxuICAgICAgICBsZXQgZGlmMDtcclxuXHJcbiAgICAgICAgZGlmMCA9IHR1bWJsZXJTdGFydCAtIHRoaXMudHVtYmxlclN0YXJ0O1xyXG4gICAgICAgIGRpZjAgIT09IDAgJiYgKHR1bWJsZXJTdGFydCA9IHRoaXMudHVtYmxlclN0YXJ0ICtcclxuICAgICAgICAgICAgdGhpcy5taW5UdW1ibGVyV2lkdGggKiBNYXRoLnJvdW5kKGRpZjAgLyB0aGlzLm1pblR1bWJsZXJXaWR0aCkpO1xyXG5cclxuICAgICAgICBkaWYwID0gdHVtYmxlcldpZHRoIC0gdGhpcy50dW1ibGVyV2lkdGg7XHJcbiAgICAgICAgZGlmMCAhPT0gMCAmJiAodHVtYmxlcldpZHRoID0gdGhpcy50dW1ibGVyV2lkdGggK1xyXG4gICAgICAgICAgICB0aGlzLm1pblR1bWJsZXJXaWR0aCAqIE1hdGgucm91bmQoZGlmMCAvIHRoaXMubWluVHVtYmxlcldpZHRoKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBbdHVtYmxlclN0YXJ0LCB0dW1ibGVyV2lkdGhdO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRBbmltYXRlVHVtYmxlcihuZXdTdGFydCwgbmV3VHVtYmxlcldpZHRoLCBkdXIgPSB0aGlzLmxpdmVEdXIsIHJlc29sdmUpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZURUKCk7XHJcbiAgICAgICAgdGhpcy5kdXIgPSBkdXI7XHJcbiAgICAgICAgdGhpcy5kdXJQcm9ncmVzcyA9IDA7XHJcblxyXG4gICAgICAgIGxldCBkaWY7XHJcblxyXG4gICAgICAgIGRpZiA9IG5ld1N0YXJ0IC0gdGhpcy50dW1ibGVyU3RhcnQ7XHJcbiAgICAgICAgdGhpcy5hbmltQmlhc09mU3RhcnQgPSBkaWYgLyBkdXI7XHJcblxyXG4gICAgICAgIGRpZiA9IG5ld1R1bWJsZXJXaWR0aCAtIHRoaXMudHVtYmxlcldpZHRoO1xyXG4gICAgICAgIHRoaXMuYW5pbUJpYXNPZlR1bWJsZXJXaWR0aCA9IGRpZiAvIGR1cjtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uSGFwcGVucyA9IHRydWU7XHJcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5yZXF1ZXN0SUQpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0ZVR1bWJsZXIobmV3U3RhcnQsIG5ld1R1bWJsZXJXaWR0aCwgcmVzb2x2ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVR1bWJsZXIobmV3U3RhcnQsIG5ld1R1bWJsZXJXaWR0aCwgcmVzb2x2ZSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRFQoKTtcclxuICAgICAgICB0aGlzLmR1clByb2dyZXNzICs9IHRoaXMuZHQ7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dDEgPSB0cnVlO1xyXG5cclxuICAgICAgICBsZXQgczEgPSB0aGlzLnR1bWJsZXJTdGFydCArIHRoaXMuYW5pbUJpYXNPZlN0YXJ0ICogdGhpcy5kdDtcclxuICAgICAgICBsZXQgczIgPSB0aGlzLnR1bWJsZXJXaWR0aCArIHRoaXMuYW5pbUJpYXNPZlR1bWJsZXJXaWR0aCAqIHRoaXMuZHQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmR1clByb2dyZXNzIDwgdGhpcy5kdXIpIHtcclxuICAgICAgICAgICAgdGhpcy50dW1ibGVyU3RhcnQgPSBzMTtcclxuICAgICAgICAgICAgdGhpcy50dW1ibGVyV2lkdGggPSBzMjtcclxuICAgICAgICAgICAgdGhpcy51cHBlci5vblR1bWJsZXJVcGRhdGUodGhpcy50dW1ibGVyU3RhcnQsIHRoaXMudHVtYmxlcldpZHRoLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudHVtYmxlclN0YXJ0ID0gbmV3U3RhcnQ7XHJcbiAgICAgICAgICAgIHRoaXMudHVtYmxlcldpZHRoID0gbmV3VHVtYmxlcldpZHRoO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25IYXBwZW5zID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlucHV0MSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cHBlci5vblR1bWJsZXJVcGRhdGUodGhpcy50dW1ibGVyU3RhcnQsIHRoaXMudHVtYmxlcldpZHRoLCB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlKHRoaXMudHVtYmxlclN0YXJ0LCB0aGlzLnR1bWJsZXJXaWR0aCk7XHJcblxyXG4gICAgICAgIGlmIChpbnB1dDEpIHtcclxuICAgICAgICAgICAgKHRoaXMucmVxdWVzdElEID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKFxyXG4gICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5hbmltYXRlVHVtYmxlcihuZXdTdGFydCwgbmV3VHVtYmxlcldpZHRoLCByZXNvbHZlKVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlICYmIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZURUKCkge1xyXG4gICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHRoaXMuZHQgPSBub3cgLSB0aGlzLmxhc3RUaW1lO1xyXG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSBub3c7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHg7XHJcblxyXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB3aW5kb3cudGhlbWUuc2xpZGVyTWFzaztcclxuICAgICAgICByb3VuZFJlY3QoY3R4LCAwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMTUsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gd2luZG93LnRoZW1lLnR1bWJsZXI7XHJcblxyXG4gICAgICAgIGxldCBzdHJva2UgPSBmYWxzZTtcclxuICAgICAgICBpZiAod2luZG93LnRoZW1lVHlwZSA9PT0gXCJkYXlcIikge1xyXG4gICAgICAgICAgICBzdHJva2UgPSB0cnVlO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByb3VuZFJlY3QoY3R4LCB0aGlzLnR1bWJsZXJTdGFydCwgMCwgdGhpcy50dW1ibGVyV2lkdGgsIHRoaXMuaGVpZ2h0LCAxNSwgdHJ1ZSwgc3Ryb2tlKTtcclxuXHJcbiAgICAgICAgbGV0IGEgPSB0aGlzLmJvcmRlcnNbMF0sIGIgPSB0aGlzLmJvcmRlcnNbMV07XHJcbiAgICAgICAgY3R4LmNsZWFyUmVjdCh0aGlzLnR1bWJsZXJTdGFydCArIGEsIGIsIHRoaXMudHVtYmxlcldpZHRoIC0gYSAqIDIsIHRoaXMuaGVpZ2h0IC0gYiAqIDIpO1xyXG4gICAgICAgIHN0cm9rZSAmJiBjdHguc3Ryb2tlUmVjdCh0aGlzLnR1bWJsZXJTdGFydCArIGEsIGIsIHRoaXMudHVtYmxlcldpZHRoIC0gYSAqIDIsIHRoaXMuaGVpZ2h0IC0gYiAqIDIpO1xyXG5cclxuICAgICAgICBsZXQgbWFyZ2luID0gdGhpcy5oZWlnaHQgLyAyLjU7XHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIGN0eC5saW5lV2lkdGggPSA0O1xyXG4gICAgICAgIGN0eC5saW5lQ2FwID0gXCJyb3VuZFwiO1xyXG5cclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4Lm1vdmVUbyh0aGlzLnR1bWJsZXJTdGFydCArIGEgLyAyLCB0aGlzLmhlaWdodCAtIG1hcmdpbik7XHJcbiAgICAgICAgY3R4LmxpbmVUbyh0aGlzLnR1bWJsZXJTdGFydCArIGEgLyAyLCAwICsgbWFyZ2luKTtcclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHgubW92ZVRvKHRoaXMudHVtYmxlclN0YXJ0ICsgdGhpcy50dW1ibGVyV2lkdGggLSBhIC8gMiwgdGhpcy5oZWlnaHQgLSBtYXJnaW4pO1xyXG4gICAgICAgIGN0eC5saW5lVG8odGhpcy50dW1ibGVyU3RhcnQgKyB0aGlzLnR1bWJsZXJXaWR0aCAtIGEgLyAyLCAwICsgbWFyZ2luKTtcclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IEJhc2UgZnJvbSBcIi4vQmFzZS9CYXNlLmpzXCI7XHJcbmltcG9ydCBwYXJzZVVuaXh0aW1lIGZyb20gXCIuLi9wYXJzZVVuaXh0aW1lLmpzXCI7XHJcblxyXG5pbXBvcnQgeyBMaW5lcyB9IGZyb20gXCIuLi9DaGFydENvbnRyb2xsZXIvTGluZXMuanNcIjtcclxuaW1wb3J0IHsgTGluZXMyWSB9IGZyb20gXCIuLi9DaGFydENvbnRyb2xsZXIvTGluZXMyWS5qc1wiO1xyXG5pbXBvcnQgeyBEYWlseSB9IGZyb20gXCIuLi9DaGFydENvbnRyb2xsZXIvRGFpbHkuanNcIjtcclxuaW1wb3J0IHsgU3RhY2tlZCB9IGZyb20gXCIuLi9DaGFydENvbnRyb2xsZXIvU3RhY2tlZC5qc1wiO1xyXG5pbXBvcnQgeyBQZXJjZW50YWdlIH0gZnJvbSBcIi4uL0NoYXJ0Q29udHJvbGxlci9QZXJjZW50YWdlLmpzXCI7XHJcbmltcG9ydCB7IFBpZSB9IGZyb20gXCIuLi9DaGFydENvbnRyb2xsZXIvUGllLmpzXCI7XHJcblxyXG5pbXBvcnQgTWFya2luZyBmcm9tIFwiLi4vU2NhbGUvTWFya2luZy5qc1wiO1xyXG5pbXBvcnQgRGF0ZXNCYXIgZnJvbSBcIi4uL1NjYWxlL0RhdGVzQmFyLmpzXCI7XHJcblxyXG5pbXBvcnQgVXBwZXJMaXN0ZW5lciBmcm9tIFwiLi9VcHBlckxpc3RlbmVyLmpzXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBwZXIgZXh0ZW5kcyBCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHR5cGUsIGN0eCwgd2lkdGgsIGhlaWdodCwgc2xpZGVySywgZGF0YSwgdHVtYmxlclN0YXJ0LCB0dW1ibGVyV2lkdGgsXHJcbiAgICAgICAgaHRtbCwgdXBkYXRlSGVhZGVyRGF0ZSwgb25ab29tKSB7XHJcbiAgICAgICAgc3VwZXIodHlwZSwgY3R4LCB3aWR0aCwgaGVpZ2h0LCBzbGlkZXJLLCBkYXRhLCBodG1sLnBhcmVudE5vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLmh0bWwgPSBodG1sO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSGVhZGVyRGF0ZSA9IHVwZGF0ZUhlYWRlckRhdGU7XHJcblxyXG4gICAgICAgIHRoaXMucmF0aW8gPSBbMTAsIDgwLCAxMF07XHJcblxyXG4gICAgICAgIHRoaXMuZGF0ZXMgPSBkYXRhLmRhdGVzLm1hcChpdGVtID0+XHJcbiAgICAgICAgICAgIHBhcnNlVW5peHRpbWUoaXRlbSAvIDEwMDApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdHlwZSA9PT0gXCJwaWVcIiAmJiB0aGlzLmRpdmlkZVBpZURhdGEoMTApO1xyXG5cclxuICAgICAgICBsZXQgQ2hhcnQ7XHJcbiAgICAgICAgbGV0IG1hcmtpbmdOdW1iZXIgPSAxO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImxpbmVzXCI6IENoYXJ0ID0gTGluZXM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImxpbmVzMllcIjogQ2hhcnQgPSBMaW5lczJZO1xyXG4gICAgICAgICAgICAgICAgbWFya2luZ051bWJlciA9IDI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN0YWNrZWRcIjogQ2hhcnQgPSBTdGFja2VkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJkYWlseVwiOiBDaGFydCA9IERhaWx5O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwZXJjZW50YWdlXCI6IENoYXJ0ID0gUGVyY2VudGFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicGllXCI6IENoYXJ0ID0gUGllO1xyXG4gICAgICAgICAgICAgICAgbWFya2luZ051bWJlciA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jaGFydFR5cGUgIT09IFwicGllXCIpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGVzQmFyTWFyZ2luVG9wID0gdGhpcy5oZWlnaHQgKlxyXG4gICAgICAgICAgICAgICAgKCgxMDAgLSB0aGlzLnJhdGlvWzJdKSArIHRoaXMucmF0aW9bMl0gLyAyKSAvIDEwMDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZXNCYXIgPSBuZXcgRGF0ZXNCYXIoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eCwgZGF0YSwgZGF0ZXNCYXJNYXJnaW5Ub3AsIHdpZHRoXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHN0dWIgPSB7IHVwZGF0ZTogKCkgPT4geyB9LCBkcmF3OiAoKSA9PiB7IH0sIG9uUmVzaXplOiAoKSA9PiB7IH0gfTtcclxuICAgICAgICAgICAgdGhpcy5kYXRlc0JhciA9IHN0dWI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNoYXJ0SGVpZ2h0ID0gdGhpcy5oZWlnaHQgKiB0aGlzLnJhdGlvWzFdIC8gMTAwO1xyXG4gICAgICAgIHRoaXMuY2hhcnRNYXJnaW5Ub3AgPSB0aGlzLmhlaWdodCAqIHRoaXMucmF0aW9bMF0gLyAxMDA7XHJcbiAgICAgICAgdGhpcy5jaGFydENvbnRyb2xsZXIgPSBuZXcgQ2hhcnQoXHJcbiAgICAgICAgICAgIGN0eCwgdGhpcy53aWR0aCwgdGhpcy5jaGFydEhlaWdodCwgdGhpcy5jaGFydE1hcmdpblRvcCxcclxuICAgICAgICAgICAgdGhpcy5kYXRhLFxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2x0aXAuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRlTWFya2luZy5iaW5kKHRoaXMpLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHR5cGUgPT09IFwiZGFpbHlcIiB8fCB0aGlzLnNldENoZWNrcygpO1xyXG5cclxuICAgICAgICB0aGlzLm1hcmtpbmdzID0gW107XHJcblxyXG4gICAgICAgIGlmIChtYXJraW5nTnVtYmVyICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFya2luZ051bWJlcjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmlzID0gMSwgY29sb3I7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJsaW5lczJZXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvciA9IHRoaXMuZGF0YS5jb2xvcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmlzID0gTnVtYmVyKHRoaXMuY2hhcnRDb250cm9sbGVyLmNoZWNrc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtpbmdzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IE1hcmtpbmcoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LCB0aGlzLndpZHRoLCB0aGlzLmNoYXJ0SGVpZ2h0LCB0aGlzLmNoYXJ0TWFyZ2luVG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAxLCAwLCAhIWksIHZpcywgY29sb3JcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uVHVtYmxlclVwZGF0ZSh0dW1ibGVyU3RhcnQsIHR1bWJsZXJXaWR0aCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMubWFya2luZ3MuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbmV3TWF4ID0gdGhpcy5jaGFydENvbnRyb2xsZXIuYXhpc1ltYXgubmV3VjtcclxuICAgICAgICAgICAgbGV0IG5ld01pbiA9IHRoaXMuY2hhcnRDb250cm9sbGVyLmF4aXNZbWluLm5ld1Y7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZU1hcmtpbmcoMCwgbmV3TWF4LCBuZXdNaW4sIGkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnpvb21lZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnVwcGVyTGlzdGVuZXIgPSBuZXcgVXBwZXJMaXN0ZW5lcihodG1sLCB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnpvb21lZCAhPT0gZmFsc2UpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGxldCBkID0gdGhpcy5kYXRlc1t0aGlzLnBvcHVwSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgb25ab29tKHtcclxuICAgICAgICAgICAgICAgICAgICBjb29yZHNYOiB0aGlzLmNvb3Jkc1gsXHJcbiAgICAgICAgICAgICAgICAgICAgaTogdGhpcy5wb3B1cEluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIGw6IHRoaXMubGVmdEJvdW5kSW5kZXhcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZFsxXSwgZFsyXSwgZFszXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmhvdXJzTW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW5pdFRvb2x0aXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXZpZGVQaWVEYXRhKGZyZXEpIHtcclxuICAgICAgICBsZXQgZGl2aWRlZFZhbHVlc1kgPSBbXSwgZGl2aWRlZERhdGVzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuZGF0ZXMuZm9yRWFjaCgoZGF0ZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc3RhcnQgPSBpICogZnJlcTtcclxuICAgICAgICAgICAgZm9yIChsZXQgayA9IHN0YXJ0OyBrIDwgc3RhcnQgKyBmcmVxOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIGRpdmlkZWREYXRlc1trXSA9IGRhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmRhdGVzID0gZGl2aWRlZERhdGVzO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGEudmFsdWVzWS5mb3JFYWNoKCh2YWx1ZXNZSXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBkaXZpZGVkVmFsdWVzWVtpXSA9IFtdO1xyXG4gICAgICAgICAgICB2YWx1ZXNZSXRlbS5mb3JFYWNoKCh2YWx1ZVksIGopID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBzdGFydCA9IGogKiBmcmVxO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IHN0YXJ0OyBrIDwgc3RhcnQgKyBmcmVxOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXZpZGVkVmFsdWVzWVtpXVtrXSA9IHZhbHVlWTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5kYXRhID0geyAuLi50aGlzLmRhdGEgfTsgLy9jbG9uZVxyXG4gICAgICAgIHRoaXMuZGF0YS5mcmVxID0gZnJlcTtcclxuICAgICAgICB0aGlzLmRhdGEudmFsdWVzWSA9IGRpdmlkZWRWYWx1ZXNZO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRUb29sdGlwKCkge1xyXG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLmh0bWwucGFyZW50Tm9kZTtcclxuICAgICAgICB0aGlzLnRvb2x0aXBIVE1MID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9vbHRpcFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy50b29sdGlwSFRNTC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgICAgICBsZXQgbGluZTtcclxuXHJcbiAgICAgICAgbGluZSA9IHRoaXMudG9vbHRpcEhUTUwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgICAgICAgbGluZS5jbGFzc05hbWUgPSBcInRvb2x0aXBMaW5lXCI7XHJcblxyXG4gICAgICAgIGxpbmUuc3R5bGUubWFyZ2luID0gdGhpcy5jaGFydFR5cGUgPT09IFwicGllXCIgPyBcIjBcIiA6IFwiNXB4IDBcIjtcclxuXHJcbiAgICAgICAgbGluZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKS5zdHlsZS5mb250V2VpZ2h0ID0gXCJib2xkXCI7XHJcbiAgICAgICAgbGluZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcclxuXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhLnZhbHVlc1kubGVuZ3RoICsgMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpbmUgPSB0aGlzLnRvb2x0aXBIVE1MLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xyXG4gICAgICAgICAgICBsaW5lLmNsYXNzTmFtZSA9IFwidG9vbHRpcExpbmVcIjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoYXJ0VHlwZSA9PT0gXCJwZXJjZW50YWdlXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhID0gbGluZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcclxuICAgICAgICAgICAgICAgIGEuY2xhc3NOYW1lID0gXCJwZXJjZW50XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5hbWUgPSBsaW5lLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xyXG4gICAgICAgICAgICBuYW1lLmNsYXNzTmFtZSA9IFwibmFtZVwiO1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBsaW5lLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xyXG4gICAgICAgICAgICB2YWx1ZS5jbGFzc05hbWUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgICAgIHZhbHVlLnN0eWxlLmNvbG9yID0gdGhpcy5kYXRhLmNvbG9yc1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVG9vbHRpcChpbmRleCwgZG9ja2V0cykge1xyXG4gICAgICAgIGxldCBkYXRlTGFiZWwgPSBcIlwiO1xyXG4gICAgICAgIGlmICh0aGlzLmNoYXJ0VHlwZSAhPT0gXCJwaWVcIikge1xyXG4gICAgICAgICAgICB0aGlzLnBvcHVwSW5kZXggPSBpbmRleCArIHRoaXMubGVmdEJvdW5kSW5kZXg7XHJcbiAgICAgICAgICAgIGxldCBkYXRlID0gdGhpcy5kYXRlc1t0aGlzLnBvcHVwSW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaG91cnNNb2RlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZCA9IGAke2RhdGVbNF19OiR7ZGF0ZVs1XX1gO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVMYWJlbCA9IGQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVMYWJlbCA9IGAke2RhdGVbMV19ICR7ZGF0ZVsyXX0sIGAgKyBkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0ZUxhYmVsID0gYCR7ZGF0ZVswXS5zbGljZSgwLCAzKX0sICR7ZGF0ZVsxXX0gJHtkYXRlWzJdLnNsaWNlKDAsIDMpfSAke2RhdGVbM119YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGVMYWJlbCA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbGluZXMgPSB0aGlzLnRvb2x0aXBIVE1MLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgbGV0IGxpbmU7XHJcbiAgICAgICAgbGluZSA9IGxpbmVzWzBdLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgbGluZVswXS50ZXh0Q29udGVudCA9IGRhdGVMYWJlbDtcclxuXHJcbiAgICAgICAgZG9ja2V0cy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGxpbmUgPSBsaW5lc1tpICsgMV0uY2hpbGROb2RlcztcclxuICAgICAgICAgICAgbGluZXNbaSArIDFdLnN0eWxlLm1hcmdpbiA9IGl0ZW0ubmFtZSA9PT0gXCJcIiA/IFwiMFwiIDogXCI1cHggMFwiO1xyXG5cclxuICAgICAgICAgICAgbGV0IGxhYmVscyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGl0ZW0pO1xyXG4gICAgICAgICAgICBsYWJlbHMuZm9yRWFjaCgobGFiZWwsIGopID0+IHtcclxuICAgICAgICAgICAgICAgIGxpbmVbal0udGV4dENvbnRlbnQgPSBpdGVtW2xhYmVsXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25SZXNpemUod2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIHN1cGVyLm9uUmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLm1hcmtpbmdzLmZvckVhY2goaXRlbSA9PlxyXG4gICAgICAgICAgICBpdGVtLm9uUmVzaXplKHdpZHRoLCB0aGlzLmNoYXJ0SGVpZ2h0LCB0aGlzLmNoYXJ0TWFyZ2luVG9wKSk7XHJcblxyXG4gICAgICAgIGxldCBkYXRlc0Jhck1hcmdpblRvcCA9IHRoaXMuaGVpZ2h0ICpcclxuICAgICAgICAgICAgKCgxMDAgLSB0aGlzLnJhdGlvWzJdKSArIHRoaXMucmF0aW9bMl0gLyAyKSAvIDEwMDtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRlc0Jhci5vblJlc2l6ZShkYXRlc0Jhck1hcmdpblRvcCwgd2lkdGgpO1xyXG4gICAgICAgIHRoaXMudXBwZXJMaXN0ZW5lci5vblJlc2l6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVHVtYmxlclVwZGF0ZSh0dW1ibGVyU3RhcnQsIHR1bWJsZXJXaWR0aCwgZmxhZ0hlYWRlclVwZGF0ZSkge1xyXG4gICAgICAgIHN1cGVyLm9uVHVtYmxlclVwZGF0ZSh0dW1ibGVyU3RhcnQsIHR1bWJsZXJXaWR0aCwgZmxhZ0hlYWRlclVwZGF0ZSk7XHJcblxyXG4gICAgICAgIGxldCBkYXRlc0JhckxhYmVsV2lkdGggPSA1MDtcclxuICAgICAgICBsZXQgcmlnaHRTaWRlTWFyZ2luID0gMixcclxuICAgICAgICAgICAgbGVmdFNpZGVNYXJnaW4gPSBNYXRoLmZsb29yKGRhdGVzQmFyTGFiZWxXaWR0aCAvIHRoaXMuc2NhbGVYKTtcclxuICAgICAgICBsZWZ0U2lkZU1hcmdpbiA8IDIgJiYgKGxlZnRTaWRlTWFyZ2luID0gMik7XHJcbiAgICAgICAgdGhpcy5sZWZ0Qm91bmRJbmRleCAtPSBsZWZ0U2lkZU1hcmdpbjtcclxuICAgICAgICB0aGlzLnJpZ2h0Qm91bmRJbmRleCArPSByaWdodFNpZGVNYXJnaW47XHJcblxyXG4gICAgICAgIGxldCBuID0gdGhpcy5kYXRhLnZhbHVlc1lbMF0ubGVuZ3RoIC0gMTtcclxuICAgICAgICB0aGlzLnJpZ2h0Qm91bmRJbmRleCA+PSBuICYmICh0aGlzLnJpZ2h0Qm91bmRJbmRleCA9IG4pO1xyXG4gICAgICAgIHRoaXMubGVmdEJvdW5kSW5kZXggPCAwICYmICh0aGlzLmxlZnRCb3VuZEluZGV4ID0gMCk7XHJcblxyXG4gICAgICAgIGxldCBrID0gdGhpcy5zbGlkZXJXaWR0aCAtICh0dW1ibGVyU3RhcnQgKyB0dW1ibGVyV2lkdGgpLFxyXG4gICAgICAgICAgICBvZmZzZXQgPSBrICogdGhpcy53aWR0aCAvIHR1bWJsZXJXaWR0aDtcclxuXHJcbiAgICAgICAgdGhpcy5jb29yZHNYID0gdGhpcy5jYWxjQ29vcmRzWChcclxuICAgICAgICAgICAgdGhpcy5sZWZ0Qm91bmRJbmRleCwgdGhpcy5yaWdodEJvdW5kSW5kZXgsIHRoaXMuc2NhbGVYLCBvZmZzZXRcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBsZXQgc2NvcGUgPSAodGhpcy53aWR0aCAvIHRoaXMuc2NhbGVYKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMuZGF0ZXNCYXIudXBkYXRlKHRoaXMubGVmdEJvdW5kSW5kZXgsIHRoaXMucmlnaHRCb3VuZEluZGV4LFxyXG4gICAgICAgICAgICBzY29wZSwgdGhpcy5kYXRlcywgdGhpcy5ob3Vyc01vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGlvbkhhcHBlbnMgfHwgdGhpcy5kcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVmaW5lSGVhZGVyRGF0ZUxhYmVsKGwsIHIpIHtcclxuICAgICAgICBsZXQgZDEgPSB0aGlzLmRhdGVzW2xdLFxyXG4gICAgICAgICAgICBkMiA9IHRoaXMuZGF0ZXNbcl07XHJcblxyXG4gICAgICAgIGxldCBkTDEgPSBbZDFbMV0sIGQxWzJdLCBkMVszXV07XHJcbiAgICAgICAgbGV0IGRMMiA9IFtkMlsxXSwgZDJbMl0sIGQyWzNdXTtcclxuXHJcbiAgICAgICAgaWYgKGNvbXBhcmUoZEwxLCBkTDIpKSB7XHJcbiAgICAgICAgICAgIGxldCB3ZWVrZGF5ID0gZDFbMF0gKyBcIixcIjtcclxuICAgICAgICAgICAgZEwxID0gW3dlZWtkYXksIC4uLmRMMV07XHJcbiAgICAgICAgICAgIHRoaXMuc2luZ2xlRGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBbZEwxXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNpbmdsZURhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuIFtkTDEsIGRMMl07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjb21wYXJlKGExLCBhMikge1xyXG4gICAgICAgICAgICByZXR1cm4gYTEubGVuZ3RoID09IGEyLmxlbmd0aCAmJiBhMS5ldmVyeSgodiwgaSkgPT4gdiA9PT0gYTJbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlTWFya2luZyhzdGVwc051bWJlciwgbmV3TWF4LCBuZXdNaW4sIGluZGV4ID0gMCkge1xyXG4gICAgICAgIHRoaXMubWFya2luZ3NbaW5kZXhdLmluaXRBbmltYXRpb24oXHJcbiAgICAgICAgICAgIHN0ZXBzTnVtYmVyLCBuZXdNYXgsIG5ld01pblxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBsZXQgaW5wdXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgaW5wdXQgPSB0aGlzLmNoYXJ0Q29udHJvbGxlci5kcmF3KHRoaXMuc2hvdWxkQ2hhcnRzVXBkYXRlLFxyXG4gICAgICAgICAgICB0aGlzLmNvb3Jkc1gsIHRoaXMubGVmdEJvdW5kSW5kZXgsIHRoaXMucmlnaHRCb3VuZEluZGV4KSB8fCBpbnB1dDtcclxuXHJcbiAgICAgICAgaW5wdXQgPSB0aGlzLm1hcmtpbmdzLnJlZHVjZSgoYWNjdW0sIGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZHJhdygpIHx8IGFjY3VtO1xyXG4gICAgICAgIH0sIGZhbHNlKSB8fCBpbnB1dDtcclxuXHJcbiAgICAgICAgaW5wdXQgPSB0aGlzLmRhdGVzQmFyLmRyYXcodGhpcy5jb29yZHNYLCB0aGlzLmxlZnRCb3VuZEluZGV4KSB8fCBpbnB1dDtcclxuXHJcbiAgICAgICAgdGhpcy5hbmltYXRlKGlucHV0KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWZpbmVUb29sdGlwUG9zaXRpb24oeCwgeSkge1xyXG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMudG9vbHRpcEhUTUwub2Zmc2V0V2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodCA9IHRoaXMudG9vbHRpcEhUTUwub2Zmc2V0SGVpZ2h0LFxyXG4gICAgICAgICAgICBzcGFjZVkgPSB0aGlzLmhlaWdodCAvIDE1LFxyXG4gICAgICAgICAgICBzcGFjZVggPSB0aGlzLndpZHRoIC8gNDAsXHJcbiAgICAgICAgICAgIG9mZnNldFggPSB0aGlzLmh0bWwub2Zmc2V0TGVmdCxcclxuICAgICAgICAgICAgb2Zmc2V0WSA9IHRoaXMuaHRtbC5vZmZzZXRUb3A7XHJcblxyXG4gICAgICAgIGxldCBkaWYsIGxvd1NjcmVlbiA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChoZWlnaHQgLyB0aGlzLmhlaWdodCA+IC4yNSkge1xyXG4gICAgICAgICAgICBsb3dTY3JlZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBkaWYgPSB4IC0gd2lkdGggKyBvZmZzZXRYIC0gc3BhY2VYO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRpZiA9IHggLSB3aWR0aCAvIDIgKyBvZmZzZXRYO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRpZiA8IDApIHtcclxuICAgICAgICAgICAgeCA9IGxvd1NjcmVlbiA/IHggKyBzcGFjZVggOiAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlmID4gdGhpcy53aWR0aCAtIHdpZHRoICsgb2Zmc2V0WCkge1xyXG4gICAgICAgICAgICB4ID0gdGhpcy53aWR0aCAtIHdpZHRoICsgb2Zmc2V0WDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB4ID0gZGlmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHkgLSBoZWlnaHQgPiAtdGhpcy5oZWlnaHQgLyAxMCkge1xyXG4gICAgICAgICAgICB5ID0geSArIG9mZnNldFkgLSBoZWlnaHQgLSBzcGFjZVk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgeSA9IHkgKyBvZmZzZXRZICsgc3BhY2VZO1xyXG4gICAgICAgICAgICBsZXQgYiA9IHRoaXMuaGVpZ2h0IC0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB5ID4gYiAmJiAoeSA9IGIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFt4LCB5XTtcclxuICAgIH1cclxuXHJcbiAgICBvblNlbGVjdGlvbkNoYW5nZSh4LCB5KSB7XHJcbiAgICAgICAgLy/RjdGC0LAg0YXRg9C50L3RjyDQv9GA0L7QuNGB0YXQvtC00LjRgiDRgNCw0L3RjNGI0LUsINGH0LXQvCDQvtCx0L3QvtCy0LvRj9GO0YLRgdGPINC60L7QvtGA0LTQuNC90LDRgtGLP1xyXG4gICAgICAgIGlmICh4ICE9PSB1bmRlZmluZWQgJiYgIXRoaXMudHJhbnNpdGlvbkhhcHBlbnMpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hhcnRDb250cm9sbGVyLmhpZ2hsaWdodEl0ZW0oXHJcbiAgICAgICAgICAgICAgICB4LCB5LCB0aGlzLmNvb3Jkc1gsIHRoaXMuc2NhbGVYLCB0aGlzLmxlZnRCb3VuZEluZGV4XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IG5ld1BvcyA9IHRoaXMuZGVmaW5lVG9vbHRpcFBvc2l0aW9uKHgsIHkpO1xyXG4gICAgICAgICAgICB0aGlzLnRvb2x0aXBIVE1MLnN0eWxlLmxlZnQgPSBuZXdQb3NbMF07XHJcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcEhUTUwuc3R5bGUudG9wID0gbmV3UG9zWzFdO1xyXG4gICAgICAgICAgICB0aGlzLnRvb2x0aXBIVE1MLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb250cm9sbGVyLnVuaGlnaGxpZ2h0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcEhUTUwuc3R5bGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uSGFwcGVucyB8fCB0aGlzLmRyYXcoKTtcclxuICAgIH1cclxuXHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVcHBlckxpc3RlbmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhc0hUTUwsIHNlbmRDb29yZHMsIG9uWm9vbSkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzSFRNTCA9IGNhbnZhc0hUTUw7XHJcblxyXG4gICAgICAgIHRoaXMuc2VuZENvb3JkcyA9IHNlbmRDb29yZHM7XHJcbiAgICAgICAgdGhpcy5vblpvb20gPSBvblpvb207XHJcblxyXG4gICAgICAgIGxldCBwYXJlbnQgPSBjYW52YXNIVE1MLnBhcmVudE5vZGU7XHJcbiAgICAgICAgdGhpcy5hcmVhSFRNTCA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKFwiLnRvb2x0aXBBcmVhXCIpO1xyXG5cclxuICAgICAgICB0aGlzLm9uUmVzaXplKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaXNEZXNrdG9wID0gISgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpO1xyXG4gICAgICAgIHRoaXMuem9vbUV2ZW50ID0gdGhpcy5pc0Rlc2t0b3AgPyBcIm9uY2xpY2tcIiA6IFwib250b3VjaHN0YXJ0XCI7XHJcbiAgICAgICAgbGV0IGZvY3VzRXZlbnQgPSB0aGlzLmlzRGVza3RvcCA/IFwib25tb3VzZWVudGVyXCIgOiBcIm9uY2xpY2tcIjtcclxuXHJcbiAgICAgICAgdGhpcy5hcmVhSFRNTFtmb2N1c0V2ZW50XSA9IHRoaXMub25Gb2N1cy5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRm9jdXMoZSkge1xyXG4gICAgICAgIHRoaXMuc2VuZENvb3JkcyhlLm9mZnNldFgsIGUub2Zmc2V0WSk7XHJcbiAgICAgICAgdGhpcy5hcmVhSFRNTC5vbm1vdXNlbW92ZSA9IGUgPT4gdGhpcy5zZW5kQ29vcmRzKGUub2Zmc2V0WCwgZS5vZmZzZXRZKTtcclxuICAgICAgICB0aGlzLmFyZWFIVE1MW3RoaXMuem9vbUV2ZW50XSA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNEZXNrdG9wKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uWm9vbSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gc2V0VGltZW91dCh0aGlzLm9uWm9vbSwgNTAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJlYUhUTUwub250b3VjaGVuZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJlYUhUTUwub250b3VjaGVuZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYXJlYUhUTUwub25tb3VzZWxlYXZlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRDb29yZHMoKTtcclxuICAgICAgICAgICAgdGhpcy5hcmVhSFRNTC5vbm1vdXNlbW92ZSA9IHRoaXMuYXJlYUhUTUxbdGhpcy56b29tRXZlbnRdID0gbnVsbDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVzaXplKCkge1xyXG4gICAgICAgIGxldCB0b3AgPSB0aGlzLmNhbnZhc0hUTUwuc3R5bGUudG9wLFxyXG4gICAgICAgICAgICBoZWlnaHQgPSB0aGlzLmNhbnZhc0hUTUwub2Zmc2V0SGVpZ2h0LFxyXG4gICAgICAgICAgICB3aWR0aCA9IHRoaXMuY2FudmFzSFRNTC5vZmZzZXRXaWR0aDtcclxuXHJcbiAgICAgICAgdGhpcy5hcmVhSFRNTC5zdHlsZS50b3AgPSB0b3A7XHJcbiAgICAgICAgdGhpcy5hcmVhSFRNTC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5hcmVhSFRNTC5zdHlsZS53aWR0aCA9IHdpZHRoO1xyXG5cclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVzQmFyIHtcclxuICAgIGNvbnN0cnVjdG9yKGN0eCwgZGF0YSwgbWFyZ2luVG9wLCB3aWR0aCkge1xyXG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xyXG5cclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICB0aGlzLm1hcmdpblRvcCA9IG1hcmdpblRvcDtcclxuXHJcbiAgICAgICAgdGhpcy52YWx1ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnhJbmRleGVzID0gW107XHJcbiAgICAgICAgdGhpcy52aXNpYmlsaXRpZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSAwLjU7XHJcbiAgICAgICAgdGhpcy5hbmltU3RlcCA9IDAuMDU7XHJcblxyXG4gICAgICAgIHRoaXMuYXBwZWFyYW5jZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnByZXZTY29wZSA9IDA7XHJcbiAgICAgICAgdGhpcy56b29tRGlyID0gMTtcclxuXHJcbiAgICAgICAgdGhpcy5zY29wZUsgPSBNYXRoLnJvdW5kKDEgLyAod2lkdGggLyA1MCkgKiAxMDApIC8gMTAwO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVzaXplKG1hcmdpblRvcCwgd2lkdGgpIHtcclxuICAgICAgICB0aGlzLm1hcmdpblRvcCA9IG1hcmdpblRvcDtcclxuICAgICAgICB0aGlzLnNjb3BlSyA9IE1hdGgucm91bmQoMSAvICh3aWR0aCAvIDUwKSAqIDEwMCkgLyAxMDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy/QvNC+0LbQvdC+INGB0YfQuNGC0LDRgtGMINC+0YHRgtCw0YLQvtC6INGC0L7Qu9GM0LrQviDQv9GA0Lgg0Y3QutGB0YLQtdC90LTQtVxyXG4gICAgdXBkYXRlKGwsIHIsIHNjb3BlLCBkYXRlcywgaG91cnNNb2RlID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgYXBwcm94aW1hdGVTdGVwID0gc2NvcGUgKiB0aGlzLnNjb3BlSyxcclxuICAgICAgICAgICAgbG9nID0gTWF0aC5sb2coYXBwcm94aW1hdGVTdGVwKSAvIE1hdGgubG9nKDIpLFxyXG4gICAgICAgICAgICB3aG9sZUxvZyA9IE1hdGguZmxvb3IobG9nKTtcclxuICAgICAgICBsZXQgcG93ID0gd2hvbGVMb2cgPCAwID8gMCA6IHdob2xlTG9nO1xyXG4gICAgICAgIGxldCBzdGVwID0gTWF0aC5wb3coMiwgcG93KSAqIDM7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHsgYXBwcm94aW1hdGVTdGVwOiBhcHByb3hpbWF0ZVN0ZXAsIGxvZzogd2hvbGVMb2csIHN0ZXA6IHN0ZXAgfSk7XHJcblxyXG4gICAgICAgIGxldCBiaWFzID0gc3RlcCAtIGwgJSBzdGVwO1xyXG4gICAgICAgIGJpYXMgPT09IHN0ZXAgJiYgKGJpYXMgPSAwKTtcclxuXHJcbiAgICAgICAgLy/RgdC60YDRi9Cy0LDRgtGMINC70Lgg0YHQvNC10LbQvdGL0LUg0LTQsNGC0YtcclxuICAgICAgICB0aGlzLmFwcGVhcmFuY2UgPSAhTWF0aC5yb3VuZChsb2cgLSB3aG9sZUxvZyk7XHJcblxyXG4gICAgICAgIGxldCB6b29tRGlyID0gTWF0aC5zaWduKHNjb3BlIC0gdGhpcy5wcmV2U2NvcGUpO1xyXG4gICAgICAgIGlmICh6b29tRGlyICE9PSAwKSB7XHJcbiAgICAgICAgICAgICh0aGlzLnpvb21EaXIgPSB6b29tRGlyKTtcclxuICAgICAgICAgICAgdGhpcy5wcmV2U2NvcGUgPSBzY29wZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudmFsdWVzID0gW107XHJcbiAgICAgICAgdGhpcy54SW5kZXhlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMudmlzaWJpbGl0aWVzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSBsICsgYmlhczsgaSA8IHI7IGkgKz0gc3RlcCkge1xyXG4gICAgICAgICAgICB0aGlzLnhJbmRleGVzLnB1c2goaSk7XHJcbiAgICAgICAgICAgIGxldCBjdXJEYXRlO1xyXG4gICAgICAgICAgICBpZiAoaG91cnNNb2RlID09PSB0cnVlICYmXHJcbiAgICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAgICAgKHN0ZXAgPCAxMiAmJiB0aGlzLmFwcGVhcmFuY2UgPT09IGZhbHNlKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChzdGVwIDwgMjQgJiYgdGhpcy5hcHBlYXJhbmNlID09PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgKSkge1xyXG4gICAgICAgICAgICAgICAgY3VyRGF0ZSA9IGAke2RhdGVzW2ldWzRdfToke2RhdGVzW2ldWzVdfWA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJEYXRlID0gZGF0ZXNbaV1bMV0gKyBcIiBcIiArIGRhdGVzW2ldWzJdLnNsaWNlKDAsIDMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZhbHVlcy5wdXNoKGN1ckRhdGUpO1xyXG4gICAgICAgICAgICBsZXQgZnJlcXVlbmN5ID0gMjtcclxuICAgICAgICAgICAgdGhpcy52aXNpYmlsaXRpZXMucHVzaCghIShpICUgKHN0ZXAgKiBmcmVxdWVuY3kpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vINC40LzQtdC10YLRgdGPINCyINCy0LjQtNGDINC/0YDQvtC30YDQsNGH0L3QvtGB0YLRjCDRgdC80LXQttC90YvRhSDRjdC70LXQvNC10L3RgtC+0LJcclxuICAgIGFuaW1hdGVWaXNpYmlsaXR5T2ZPc2N1bGFudCgpIHtcclxuICAgICAgICBpZiAodGhpcy56b29tRGlyID09PSAtMSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlYXJhbmNlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSB0aGlzLnZpc2liaWxpdHkgPj0gMSA/ICh0aGlzLnZpc2liaWxpdHkgPSAxKSA6IHRoaXMudmlzaWJpbGl0eSArIHRoaXMuYW5pbVN0ZXA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZWFyYW5jZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eSA9IHRoaXMudmlzaWJpbGl0eSA8PSAwID8gKHRoaXMudmlzaWJpbGl0eSA9IDApIDogdGhpcy52aXNpYmlsaXR5IC0gdGhpcy5hbmltU3RlcDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyhjb29yZHNYLCBsKSB7XHJcbiAgICAgICAgLy/Qu9C+0LPQuNGH0L3QviDQstGL0LfRi9Cy0LDRgtGMINCw0L3QuNC80LDRhtC40Y4g0L7RgtGB0Y7QtNCwLCBcclxuICAgICAgICAvL9C/0L7RgtC+0LzRgyDRh9GC0L4g0LTQsNC20LUg0L/RgNC4INC+0YLRgdGD0YLRgdCy0LjQuCB1cGRhdGUg0LDQvdC40LzQsNGG0LjRjyDQtNC+0LvQttC90LAg0L/RgNC+0LTQvtC70LbQsNGC0YzRgdGPXHJcbiAgICAgICAgdGhpcy5hbmltYXRlVmlzaWJpbGl0eU9mT3NjdWxhbnQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMTVweCBWZXJkYW5hXCI7XHJcblxyXG4gICAgICAgIC8vIGxldCBzY29wZSA9IHRoaXMudmFsdWVzLmxlbmd0aCAtIDE7XHJcblxyXG4gICAgICAgIHRoaXMudmFsdWVzLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgbGV0IGluZCA9IHRoaXMueEluZGV4ZXNbaV07XHJcbiAgICAgICAgICAgIGxldCB4ID0gY29vcmRzWFtpbmQgLSBsXTtcclxuXHJcbiAgICAgICAgICAgIC8vIGxldCBsYWJlbFdpZHRoID0gaXRlbS5sZW5ndGggKiAxMDsgLy/Rg9C70YPRh9GI0LjRgtGMICBcclxuXHJcbiAgICAgICAgICAgIC8vIGxldCBvZmZzZXQgPSAoc2NvcGUgLSBpKSAvIHNjb3BlICogbGFiZWxXaWR0aDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMudmlzaWJpbGl0aWVzW2ldID8gYCR7d2luZG93LnRoZW1lLlhZQXhpcy5zbGljZSgwLCAtMyl9JHt0aGlzLnZpc2liaWxpdHkgKiAuNX0pYCA6IHdpbmRvdy50aGVtZS5YWUF4aXM7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGl0ZW0sIHgsIHRoaXMubWFyZ2luVG9wKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIodGhpcy52aXNpYmlsaXR5KSA/IGZhbHNlIDogdHJ1ZTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiZnVuY3Rpb24gaGV4RGVjKGgpIHtcclxuICAgIHZhciBtID0gaC5zbGljZSgxKS5tYXRjaCgvLnsyfS9nKTtcclxuXHJcbiAgICBtWzBdID0gcGFyc2VJbnQobVswXSwgMTYpO1xyXG4gICAgbVsxXSA9IHBhcnNlSW50KG1bMV0sIDE2KTtcclxuICAgIG1bMl0gPSBwYXJzZUludChtWzJdLCAxNik7XHJcblxyXG4gICAgcmV0dXJuIG0uam9pbignLCcpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gcmVkdWNlTnVtYmVyKHZhbHVlKSB7XHJcbiAgICBpZiAodmFsdWUgPj0gMTAwMCkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8IDEwMDAwMDApIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBNYXRoLnJvdW5kKCh2YWx1ZSAvIDEwMDApICogMTApIC8gMTAgKyBcIktcIjtcclxuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID49IDEwMDAwMDAgJiYgdmFsdWUgPCAxMDAwMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gTWF0aC5yb3VuZCgodmFsdWUgLyAxMDAwMDAwKSAqIDEwKSAvIDEwICsgXCJNXCI7XHJcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+PSAxMDAwMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gTWF0aC5yb3VuZCgodmFsdWUgLyAxMDAwMDAwMDAwKSAqIDEwKSAvIDEwICsgXCJCXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5cclxuY2xhc3MgTGluZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihsYWJlbCwgdmFsdWUsIHksIG9wYWNpdHkpIHtcclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuXHJcbiAgICAgICAgLy/QvdGD0LbQvdC+INC70LjRiNGMINC00LvRjyDRgdGA0LDQstC90LXQvdC40Y8g0YEg0L3QvtCy0YvQvCDQv9C+0LrQvtC70LXQvdC40LXQvFxyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5vcGFjaXR5ID0gb3BhY2l0eTtcclxuICAgICAgICB0aGlzLnN0ZXAgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1vdmVBbmltYXRpb24oZW5kWSwgZHVyLCB0YXJnZXRPcGFjaXR5KSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXRPcGFjaXR5ID0gdGFyZ2V0T3BhY2l0eTtcclxuICAgICAgICB0aGlzLm9wYWNpdHlTdGVwID0gKHRhcmdldE9wYWNpdHkgLSB0aGlzLm9wYWNpdHkpIC8gZHVyO1xyXG4gICAgICAgIHRoaXMub3BhY2l0eVNpZ24gPSBNYXRoLnNpZ24odGhpcy5vcGFjaXR5U3RlcCk7XHJcbiAgICAgICAgdGhpcy5zdGVwID0gKGVuZFkgLSB0aGlzLnkpIC8gZHVyO1xyXG4gICAgICAgIHRoaXMuZW5kWSA9IGVuZFk7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVN0ZXAoZHQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RlcCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLm9wYWNpdHkgKz0gdGhpcy5vcGFjaXR5U3RlcCAqIGR0O1xyXG4gICAgICAgIHRoaXMub3BhY2l0eSAqIHRoaXMub3BhY2l0eVNpZ24gPlxyXG4gICAgICAgICAgICB0aGlzLnRhcmdldE9wYWNpdHkgKiB0aGlzLm9wYWNpdHlTaWduXHJcbiAgICAgICAgICAgICYmICh0aGlzLm9wYWNpdHkgPSB0aGlzLnRhcmdldE9wYWNpdHkpO1xyXG5cclxuICAgICAgICB0aGlzLnkgKz0gdGhpcy5zdGVwICogZHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZmluaXNoQW5pbWF0aW9uKCkge1xyXG4gICAgICAgIHRoaXMub3BhY2l0eSA9IHRoaXMudGFyZ2V0T3BhY2l0eTtcclxuICAgICAgICBpZiAodGhpcy5zdGVwKSB7XHJcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuZW5kWTtcclxuICAgICAgICAgICAgdGhpcy5zdGVwID0gbnVsbDtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuZW5kWTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGRyYXcoY3R4LCB3aWR0aCwgdmlzaWJpbGl0eSwgbGFiZWxDb2xvciwgbGFiZWxYLCBsaW5lQ29sb3IsIG1heExpbmVPcGFjaXR5KSB7XHJcbiAgICAgICAgbGV0IHkgPSB0aGlzLnk7XHJcblxyXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGByZ2JhKCR7bGluZUNvbG9yfSwgJHt0aGlzLm9wYWNpdHkgKiBtYXhMaW5lT3BhY2l0eSAqIHZpc2liaWxpdHl9KWA7XHJcblxyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuXHJcbiAgICAgICAgY3R4Lm1vdmVUbygwLCB5KTtcclxuICAgICAgICBjdHgubGluZVRvKHdpZHRoLCB5KTtcclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBgcmdiYSgke2xhYmVsQ29sb3J9LCAke3RoaXMub3BhY2l0eSAqIC41ICogdmlzaWJpbGl0eX0pYDtcclxuXHJcbiAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMubGFiZWwsIGxhYmVsWCwgeSAtIDEwKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFya2luZ0NvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IoY3R4LCB3aWR0aCwgaGVpZ2h0LCBtYXJnaW5Ub3AsXHJcbiAgICAgICAgbWF4ID0gMSwgbWluID0gMCxcclxuICAgICAgICByaWdodFNpZGUgPSBmYWxzZSwgdmlzaWJpbGl0eSwgbGFiZWxDb2xvcikge1xyXG5cclxuICAgICAgICB0aGlzLmxpbmVzTnVtYmVyID0gNTtcclxuXHJcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XHJcblxyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLm1hcmdpblRvcCA9IG1hcmdpblRvcDtcclxuICAgICAgICB0aGlzLmJvdHRvbUJvdW5kID0gbWFyZ2luVG9wICsgaGVpZ2h0O1xyXG5cclxuICAgICAgICB0aGlzLm1heExpbmVPcGFjaXR5ID0gLjE7XHJcbiAgICAgICAgdGhpcy5saW5lT3BhY2l0eSA9IHRoaXMubWF4TGluZU9wYWNpdHk7XHJcbiAgICAgICAgdGhpcy5zdGF0aWNWaXNpYmlsaXR5ID0gIXJpZ2h0U2lkZTtcclxuXHJcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5ID0gdmlzaWJpbGl0eTtcclxuICAgICAgICB0aGlzLnJpZ2h0U2lkZSA9IHJpZ2h0U2lkZTtcclxuXHJcbiAgICAgICAgbGFiZWxDb2xvciAmJiAodGhpcy5jdXN0b21MYWJlbENvbG9yID0gaGV4RGVjKGxhYmVsQ29sb3IpKTtcclxuXHJcbiAgICAgICAgdGhpcy5kaWYwID0gbWF4IC0gbWluO1xyXG4gICAgICAgIHRoaXMubWluMCA9IG1pbjtcclxuXHJcbiAgICAgICAgdGhpcy50YXJnZXRzID0gW107XHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGluZXNOdW1iZXI7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgeSA9IHRoaXMuYm90dG9tQm91bmQgLSBpICogaGVpZ2h0IC8gKHRoaXMubGluZXNOdW1iZXIgLSAxKTtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgICAgIHk6IHlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGlvbkhhcHBlbnMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbkhhcHBlbnMyID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25SZXNpemUod2lkdGgsIGhlaWdodCwgbWFyZ2luVG9wKSB7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMubWFyZ2luVG9wID0gbWFyZ2luVG9wO1xyXG4gICAgICAgIHRoaXMuYm90dG9tQm91bmQgPSBtYXJnaW5Ub3AgKyBoZWlnaHQ7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saW5lc051bWJlcjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB5ID0gdGhpcy5ib3R0b21Cb3VuZCAtIGkgKiBoZWlnaHQgLyAodGhpcy5saW5lc051bWJlciAtIDEpO1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldHNbaV0ueSA9IHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmluaXRBbmltYXRpb24oMCwgdGhpcy5tYXgsIHRoaXMubWluKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0QW5pbWF0aW9uKGR1ciwgbWF4LCBtaW4gPSAwKSB7XHJcbiAgICAgICAgaWYgKCEoaXNGaW5pdGUobWF4KSAmJiBpc0Zpbml0ZShtaW4pKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdGF0aWNWaXNpYmlsaXR5ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVPcGFjaXR5ID0gdGhpcy5tYXhMaW5lT3BhY2l0eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uSGFwcGVuczIgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLmR1ciA9IHRoaXMuaW5pdER1ciA9IGR1cjtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICAgICAgdGhpcy5kaWYgPSBtYXggLSBtaW47XHJcbiAgICAgICAgdGhpcy5taW4gPSBtaW47XHJcbiAgICAgICAgdGhpcy5tYXggPSBtYXg7XHJcblxyXG4gICAgICAgIC8vY2xvbmVcclxuICAgICAgICBsZXQgdGFyZ2V0czAgPSB0aGlzLnRhcmdldHMubWFwKGEgPT4gKHsgLi4uYSB9KSk7XHJcblxyXG4gICAgICAgIC8v0L7QsdC90L7QstC70Y/RjiDRgdGC0L7Rj9GH0LrQuFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saW5lc051bWJlcjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IG1pbiArICh0aGlzLmRpZiAvIE1hdGguZmxvb3IodGhpcy5saW5lc051bWJlciAtIDEpKSAqIGk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbGFiZWwgPSByZWR1Y2VOdW1iZXIodmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldHNbaV0udmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRzW2ldLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGluZXNOdW1iZXI7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdDBzID0gdGFyZ2V0czA7XHJcbiAgICAgICAgICAgIGxldCB0MCA9IHQwc1tpXTtcclxuICAgICAgICAgICAgbGV0IHZhbHVlMCA9IHQwLnZhbHVlLCBsYWJlbDAgPSB0MC5sYWJlbCwgeSA9IHQwLnk7XHJcbiAgICAgICAgICAgIGxldCB0ID0gdGhpcy50YXJnZXRzW2ldO1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0LnZhbHVlLCBsYWJlbCA9IHQubGFiZWw7XHJcblxyXG4gICAgICAgICAgICAvL9C+0YLRh9Cw0LvQuNCy0LDRjtGCINC40LvQuCDQvNC40LPRgNC40YDRg9GO0YIg0YHRgtC+0Y/Rh9C60LhcclxuICAgICAgICAgICAgbGV0IGluZGV4MCA9IHRoaXMuaXRlbXMuZmluZEluZGV4KGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubGFiZWwgPT09IGxhYmVsMDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh+aW5kZXgwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYSA9IHRoaXMudGFyZ2V0cy5maW5kKHRhcmdldCA9PiB0YXJnZXQubGFiZWwgPT09IGxhYmVsMCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0WSwgdGFyZ2V0T3BhY2l0eTtcclxuICAgICAgICAgICAgICAgIGlmIChhID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZHkgPSB0aGlzLmNhbGNEWSh2YWx1ZTApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFkgPSB0LnkgKyBkeTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRPcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0WSA9IGEueTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRPcGFjaXR5ID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbXNbaW5kZXgwXTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2V0TW92ZUFuaW1hdGlvbih0YXJnZXRZLCB0aGlzLmR1ciwgdGFyZ2V0T3BhY2l0eSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v0L/RgNC40YfQsNC70LjQstCw0Y7RgiDQvtGC0YfQsNC70LjQstCw0Y7RidC40LUg0Lgg0YDQvtC20LTQsNGO0YnQuNC10YHRj1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLml0ZW1zLmZpbmRJbmRleChpdGVtID0+IGl0ZW0ubGFiZWwgPT09IGxhYmVsKTtcclxuICAgICAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLml0ZW1zW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGl0ZW0udmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2V0TW92ZUFuaW1hdGlvbih0LnksIHRoaXMuZHVyLCAxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBkeSA9IHRoaXMuY2FsY0RZKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGxldCBsaW5lID0gbmV3IExpbmUobGFiZWwsIHZhbHVlLCB0LnkgLSBkeSwgMCk7XHJcbiAgICAgICAgICAgICAgICBsaW5lLnNldE1vdmVBbmltYXRpb24odC55LCB0aGlzLmR1ciwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobGluZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZGlmMCA9IHRoaXMuZGlmO1xyXG4gICAgICAgIHRoaXMubWluMCA9IHRoaXMubWluO1xyXG5cclxuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnJlcXVlc3RJRDIpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGNEWSh2YWx1ZSkge1xyXG4gICAgICAgIGxldCB5MCA9ICh2YWx1ZSAtIHRoaXMubWluMCkgLyB0aGlzLmRpZjA7XHJcbiAgICAgICAgbGV0IHkgPSAodmFsdWUgLSB0aGlzLm1pbikgLyB0aGlzLmRpZjtcclxuICAgICAgICByZXR1cm4gKHkwIC0geSkgKiB0aGlzLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlKCkge1xyXG4gICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGxldCBkdCA9IG5vdyAtIHRoaXMubGFzdFRpbWU7XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5vdztcclxuXHJcbiAgICAgICAgdGhpcy5kdXIgLT0gZHQ7XHJcblxyXG4gICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uYW5pbWF0ZVN0ZXAoZHQpKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHVyID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RJRDIgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLmFuaW1hdGUoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmluaXNoQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmlzaEFuaW1hdGlvbigpIHtcclxuICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uZmluaXNoQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm9wYWNpdHkgIT09IDA7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubGluZU9wYWNpdHkgPSB0aGlzLnN0YXRpY1Zpc2liaWxpdHkgPyB0aGlzLm1heExpbmVPcGFjaXR5IDogMDtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbkhhcHBlbnMyID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3RhdGljVmlzaWJpbGl0eShzdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuc3RhdGljVmlzaWJpbGl0eSA9IHN0YXRlO1xyXG4gICAgICAgIHRoaXMubGluZU9wYWNpdHkgPSBzdGF0ZSA/IHRoaXMubWF4TGluZU9wYWNpdHkgOiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgbGV0IGxhYmVsQ29sb3IgPSB0aGlzLmN1c3RvbUxhYmVsQ29sb3IgPyB0aGlzLmN1c3RvbUxhYmVsQ29sb3IgOlxyXG4gICAgICAgICAgICB3aW5kb3cudGhlbWUuWFlBeGlzLnNsaWNlKDUsIC01KTsgLy/QvNC+0LbQvdC+INGA0LXQs9GD0LvRj9GA0LrRgyDQvdCw0L/QuNGB0LDRgtGMICAgXHJcblxyXG4gICAgICAgIGxldCBsaW5lQ29sb3IgPSB3aW5kb3cudGhlbWUuZ3JpZExpbmVzLnNsaWNlKDUsIC01KTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsWCA9IHRoaXMucmlnaHRTaWRlID8gdGhpcy53aWR0aCAtIDUwIDogMTA7XHJcblxyXG4gICAgICAgIGxldCBhcmdzID0gW3RoaXMuY3R4LCB0aGlzLndpZHRoLFxyXG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSwgbGFiZWxDb2xvciwgbGFiZWxYLCBsaW5lQ29sb3IsIHRoaXMubGluZU9wYWNpdHldO1xyXG5cclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIxNXB4IEFyaWFsXCI7XHJcbiAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gMTtcclxuXHJcbiAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5kcmF3KC4uLmFyZ3MpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0aW9uSGFwcGVucyB8fCB0aGlzLmFuaW1hdGlvbkhhcHBlbnMyO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRWaXNpYmlsaXR5QW5pbWF0aW9uKGRpciwgZHVyID0gMjAwKSB7XHJcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5yZXF1ZXN0SUQpO1xyXG5cclxuICAgICAgICB0aGlzLmFuaW1TdGVwID0gMSAvIGR1cjtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB0aGlzLmFuaW1hdGVWaXNpYmlsaXR5KGRpcik7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVZpc2liaWxpdHkoZGlyKSB7XHJcbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy5kdCA9IG5vdyAtIHRoaXMubGFzdFRpbWU7XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5vdztcclxuXHJcbiAgICAgICAgaWYgKGRpciA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSB0aGlzLnZpc2liaWxpdHkgPj0gMSA/ICh0aGlzLnZpc2liaWxpdHkgPSAxKSA6IHRoaXMudmlzaWJpbGl0eSArIHRoaXMuYW5pbVN0ZXAgKiB0aGlzLmR0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eSA9IHRoaXMudmlzaWJpbGl0eSA8PSAwID8gKHRoaXMudmlzaWJpbGl0eSA9IDApIDogdGhpcy52aXNpYmlsaXR5IC0gdGhpcy5hbmltU3RlcCAqIHRoaXMuZHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0ID0gK2RpcjtcclxuICAgICAgICBpZiAodGhpcy52aXNpYmlsaXR5ID09PSB0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25IYXBwZW5zID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25IYXBwZW5zID0gdHJ1ZTtcclxuICAgICAgICAgICAgKHRoaXMucmVxdWVzdElEID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYW5pbWF0ZVZpc2liaWxpdHkoZGlyKSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gZ2V0RGF0YUZyb21KU09OKGpzb24pIHtcclxuICAgIC8v0LrQvtC+0YDQtNC40L3QsNGC0Ysg0LIg0LrRg9GH0LVcclxuICAgIGxldCBjb2x1bW5zID0ganNvbi5jb2x1bW5zO1xyXG4gICAgLy/QvNCw0YHRgdC40LIg0LfQvdCw0YfQtdC90LjQuSBZXHJcbiAgICBsZXQgdmFsdWVzWSA9IGNvbHVtbnMubWFwKGl0ZW0gPT4gaXRlbS5zbGljZSgxKSkuc2xpY2UoMSk7XHJcbiAgICAvL9C80LDRgdGB0LjQsiB0aW1lc3RhbXAg0LTQsNGCXHJcbiAgICBsZXQgZGF0ZXMgPSBjb2x1bW5zWzBdLnNsaWNlKDEpO1xyXG5cclxuICAgIGxldCBjb2xvcnMgPSBPYmplY3QudmFsdWVzKGpzb24uY29sb3JzKTtcclxuICAgIGxldCBuYW1lcyA9IE9iamVjdC52YWx1ZXMoanNvbi5uYW1lcyk7XHJcbiAgICBsZXQgdmFsdWVzTnVtYmVyID0gdmFsdWVzWVswXS5sZW5ndGg7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB2YWx1ZXNZOiB2YWx1ZXNZLFxyXG4gICAgICAgIGRhdGVzOiBkYXRlcyxcclxuICAgICAgICBjb2xvcnM6IGNvbG9ycyxcclxuICAgICAgICBuYW1lczogbmFtZXMsXHJcbiAgICAgICAgdmFsdWVzTnVtYmVyOiB2YWx1ZXNOdW1iZXIsXHJcbiAgICAgICAgbGluZXNOdW1iZXI6IHZhbHVlc051bWJlciAtIDFcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzbGljZURhdGEoZGF0YSwgbCwgcikge1xyXG4gICAgbGV0IGQgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcclxuICAgIGQudmFsdWVzWSA9IGQudmFsdWVzWS5tYXAoaXRlbSA9PiBpdGVtLnNsaWNlKGwsIHIgKyAxKSk7XHJcbiAgICBkLmRhdGVzID0gZC5kYXRlcy5zbGljZShsLCByICsgMSk7XHJcbiAgICBkLnZhbHVlc051bWJlciA9IHIgLSBsICsgMTtcclxuICAgIGQubGluZXNOdW1iZXIgPSBkLnZhbHVlc051bWJlciAtIDE7XHJcbiAgICByZXR1cm4gZDtcclxufSIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLmpzXCI7XHJcblxyXG5sZXQgYXBwID0gbmV3IEFwcChcInRnLWNoYXJ0XCIpO1xyXG5cclxuXHJcblxyXG4iLCJleHBvcnQgbGV0IG1vbnRoTGFiZWxzID0gWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JyxcclxuICAgICdNYXJjaCcsICdBcHJpbCcsICdNYXknLFxyXG4gICAgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLFxyXG4gICAgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJyxcclxuICAgICdEZWNlbWJlciddO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VVbml4dGltZSh0aW1lc3RhbXApIHtcclxuXHJcbiAgICBsZXQgeWVhciA9IE1hdGguY2VpbCh0aW1lc3RhbXAgLyAzMTU1NzYwMCkgKyAxOTY5O1xyXG4gICAgbGV0IGlzWWVhckxlYXAgPSBkZWZpbmVZZWFyTGVhcCh5ZWFyKTtcclxuXHJcbiAgICBsZXQgbGVhcERheXMgPSBNYXRoLmNlaWwoKHllYXIgLSAxOTY5KSAvIDQpO1xyXG4gICAgbGV0IGRheXNTaW5jZVRoZUVwb2NoID0gTWF0aC5jZWlsKHRpbWVzdGFtcCAvIDg2NDAwKTtcclxuICAgIGxldCBuID0gZGF5c1NpbmNlVGhlRXBvY2ggLSBsZWFwRGF5cztcclxuICAgIGxldCBkYXlzUGFzc2VkSW5UaGVDdXJyZW50WWVhciA9IG4gJSAzNjU7XHJcblxyXG4gICAgbGV0IG1vbnRoLCBkYXk7XHJcblxyXG4gICAgbGV0IHNlY29uZHNJbkN1ckRheSA9IHRpbWVzdGFtcCAtICgoZGF5c1NpbmNlVGhlRXBvY2ggLSAxKSAqIDg2NDAwKTtcclxuICAgIGxldCBob3VycyA9IE1hdGguZmxvb3Ioc2Vjb25kc0luQ3VyRGF5IC8gMzYwMCk7XHJcbiAgICBpZiAoaG91cnMgPT09IDI0KSB7XHJcbiAgICAgICAgaG91cnMgPSAwO1xyXG5cclxuICAgICAgICBkYXlzUGFzc2VkSW5UaGVDdXJyZW50WWVhcisrO1xyXG4gICAgICAgIGxldCBtYXhQYXNzZWREYXlzID0gaXNZZWFyTGVhcCA/IDM2NSA6IDM2NDtcclxuICAgICAgICBpZiAoZGF5c1Bhc3NlZEluVGhlQ3VycmVudFllYXIgPiBtYXhQYXNzZWREYXlzKSB7XHJcbiAgICAgICAgICAgIGRheXNQYXNzZWRJblRoZUN1cnJlbnRZZWFyID0gMDtcclxuICAgICAgICAgICAgeWVhcisrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgbW9udGhEYXlzVGFibGUgPSBbXHJcbiAgICAgICAgMzEsIDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMVxyXG4gICAgXTtcclxuICAgIGlzWWVhckxlYXAgPT09IHRydWUgJiYgKG1vbnRoRGF5c1RhYmxlWzFdID0gMjkpO1xyXG5cclxuICAgIGxldCBjb3VudCA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XHJcbiAgICAgICAgY291bnQgKz0gbW9udGhEYXlzVGFibGVbaV07XHJcbiAgICAgICAgaWYgKGNvdW50ID4gZGF5c1Bhc3NlZEluVGhlQ3VycmVudFllYXIpIHtcclxuICAgICAgICAgICAgbW9udGggPSBpO1xyXG4gICAgICAgICAgICBkYXkgPSBkYXlzUGFzc2VkSW5UaGVDdXJyZW50WWVhciArIG1vbnRoRGF5c1RhYmxlW2ldIC0gY291bnQgKyAxO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1pbnV0ZXMgPSBTdHJpbmcoTWF0aC5mbG9vcihzZWNvbmRzSW5DdXJEYXkgLyA2MCkgJSA2MCk7XHJcbiAgICBtaW51dGVzLmxlbmd0aCA9PT0gMSAmJiAobWludXRlcyA9IFwiMFwiICsgbWludXRlcyk7XHJcblxyXG4gICAgbGV0IHdlZWtkYXkgPSBnZXREYXkoZGF5LCBtb250aCArIDEsIHllYXIpO1xyXG5cclxuICAgIHJldHVybiBbd2Vla2RheSwgZGF5LCBtb250aExhYmVsc1ttb250aF0sIHllYXIsIGhvdXJzLCBtaW51dGVzXTtcclxuXHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGRlZmluZVllYXJMZWFwKHllYXIpIHtcclxuICAgICAgICBsZXQgcmVzdWx0O1xyXG5cclxuICAgICAgICBpZiAoeWVhciAlIDQgPT09IDApIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh5ZWFyICUgMTAwID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHllYXIgJSA0MDAgPT09IDApIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RGF5KGRheSwgbW9udGgsIHllYXIpIHtcclxuICAgICAgICBsZXQgZGF5cyA9IFtcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCJdO1xyXG5cclxuICAgICAgICBkYXkgPSBwYXJzZUludChkYXksIDEwKTsgLy/QtdGB0LvQuCDQtNC10L3RjCDQtNCy0YPRhdGB0LjQvNCy0L7Qu9GM0L3Ri9C5INC4IDwxMCBcclxuICAgICAgICBtb250aCA9IHBhcnNlSW50KG1vbnRoLCAxMCk7IC8v0LXRgdC70Lgg0LzQtdGB0Y/RhiDQtNCy0YPRhdGB0LjQvNCy0L7Qu9GM0L3Ri9C5INC4IDwxMCBcclxuXHJcbiAgICAgICAgbGV0IGEgPSBwYXJzZUludCgoMTQgLSBtb250aCkgLyAxMiwgMTApO1xyXG4gICAgICAgIGxldCB5ID0geWVhciAtIGE7XHJcbiAgICAgICAgbGV0IG0gPSBtb250aCArIDEyICogYSAtIDI7XHJcbiAgICAgICAgbGV0IGQgPSAocGFyc2VJbnQoZGF5ICsgeSArIHBhcnNlSW50KHkgLyA0LCAxMCkgLSBwYXJzZUludCh5IC8gMTAwLCAxMCkgKyBwYXJzZUludCh5IC8gNDAwLCAxMCkgKyAoMzEgKiBtKSAvIDEyLCAxMCkpICUgNztcclxuXHJcbiAgICAgICAgcmV0dXJuIGRheXNbZF07XHJcbiAgICB9XHJcblxyXG59IiwiLyoqXHJcbiAqIERyYXdzIGEgcm91bmRlZCByZWN0YW5nbGUgdXNpbmcgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGNhbnZhcy5cclxuICogSWYgeW91IG9taXQgdGhlIGxhc3QgdGhyZWUgcGFyYW1zLCBpdCB3aWxsIGRyYXcgYSByZWN0YW5nbGVcclxuICogb3V0bGluZSB3aXRoIGEgNSBwaXhlbCBib3JkZXIgcmFkaXVzXHJcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjdHhcclxuICogQHBhcmFtIHtOdW1iZXJ9IHggVGhlIHRvcCBsZWZ0IHggY29vcmRpbmF0ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0geSBUaGUgdG9wIGxlZnQgeSBjb29yZGluYXRlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCBUaGUgd2lkdGggb2YgdGhlIHJlY3RhbmdsZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIHJlY3RhbmdsZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gW3JhZGl1cyA9IDVdIFRoZSBjb3JuZXIgcmFkaXVzOyBJdCBjYW4gYWxzbyBiZSBhbiBvYmplY3QgXHJcbiAqICAgICAgICAgICAgICAgICB0byBzcGVjaWZ5IGRpZmZlcmVudCByYWRpaSBmb3IgY29ybmVyc1xyXG4gKiBAcGFyYW0ge051bWJlcn0gW3JhZGl1cy50bCA9IDBdIFRvcCBsZWZ0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbcmFkaXVzLnRyID0gMF0gVG9wIHJpZ2h0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbcmFkaXVzLmJyID0gMF0gQm90dG9tIHJpZ2h0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbcmFkaXVzLmJsID0gMF0gQm90dG9tIGxlZnRcclxuICogQHBhcmFtIHtCb29sZWFufSBbZmlsbCA9IGZhbHNlXSBXaGV0aGVyIHRvIGZpbGwgdGhlIHJlY3RhbmdsZS5cclxuICogQHBhcmFtIHtCb29sZWFufSBbc3Ryb2tlID0gdHJ1ZV0gV2hldGhlciB0byBzdHJva2UgdGhlIHJlY3RhbmdsZS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJvdW5kUmVjdChjdHgsIHgsIHksIHdpZHRoLCBoZWlnaHQsIHJhZGl1cywgZmlsbCwgc3Ryb2tlKSB7XHJcbiAgICBpZiAodHlwZW9mIHN0cm9rZSA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHN0cm9rZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHJhZGl1cyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByYWRpdXMgPSA1O1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiByYWRpdXMgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgcmFkaXVzID0geyB0bDogcmFkaXVzLCB0cjogcmFkaXVzLCBicjogcmFkaXVzLCBibDogcmFkaXVzIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBkZWZhdWx0UmFkaXVzID0geyB0bDogMCwgdHI6IDAsIGJyOiAwLCBibDogMCB9O1xyXG4gICAgICAgIGZvciAodmFyIHNpZGUgaW4gZGVmYXVsdFJhZGl1cykge1xyXG4gICAgICAgICAgICByYWRpdXNbc2lkZV0gPSByYWRpdXNbc2lkZV0gfHwgZGVmYXVsdFJhZGl1c1tzaWRlXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHgubW92ZVRvKHggKyByYWRpdXMudGwsIHkpO1xyXG4gICAgY3R4LmxpbmVUbyh4ICsgd2lkdGggLSByYWRpdXMudHIsIHkpO1xyXG4gICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8oeCArIHdpZHRoLCB5LCB4ICsgd2lkdGgsIHkgKyByYWRpdXMudHIpO1xyXG4gICAgY3R4LmxpbmVUbyh4ICsgd2lkdGgsIHkgKyBoZWlnaHQgLSByYWRpdXMuYnIpO1xyXG4gICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8oeCArIHdpZHRoLCB5ICsgaGVpZ2h0LCB4ICsgd2lkdGggLSByYWRpdXMuYnIsIHkgKyBoZWlnaHQpO1xyXG4gICAgY3R4LmxpbmVUbyh4ICsgcmFkaXVzLmJsLCB5ICsgaGVpZ2h0KTtcclxuICAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHgsIHkgKyBoZWlnaHQsIHgsIHkgKyBoZWlnaHQgLSByYWRpdXMuYmwpO1xyXG4gICAgY3R4LmxpbmVUbyh4LCB5ICsgcmFkaXVzLnRsKTtcclxuICAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHgsIHksIHggKyByYWRpdXMudGwsIHkpO1xyXG4gICAgY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgaWYgKGZpbGwpIHtcclxuICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0cm9rZSkge1xyXG4gICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgIH1cclxuXHJcbn0iLCIvL3tjb2xvcjogLi4uLCBvcGFjaXR5Oi4uLiB9XHJcbi8vZ2V0VHJhbnNwYXJlbnRDb2xvciguLi4pIC0+IGhleERlYyguLi4pXHJcbmxldCB0aGVtZXMgPSB7XHJcbiAgICBkYXk6IHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiBcIndoaXRlXCIsXHJcbiAgICAgICAgc2xpZGVyTWFzazogXCJyZ2JhKDIyNiwgMjM4LCAyNDksIC42KVwiLFxyXG4gICAgICAgIHR1bWJsZXI6IFwicmdiKDE5MiwgMjA5LCAyMjUpXCIsXHJcbiAgICAgICAgdG9vbHRpcDogXCJ3aGl0ZVwiLFxyXG4gICAgICAgIHRvb2x0aXBUZXh0OiBcImJsYWNrXCIsXHJcbiAgICAgICAgZ3JpZExpbmVzOiBcInJnYmEoMjQsIDQ1LCA1OSwgLjEpXCIsXHJcbiAgICAgICAgem9vbU91dFRleHQ6IFwicmdiKDE2LCAxMzksIDIyNylcIixcclxuICAgICAgICBYWUF4aXM6IFwicmdiYSgzNywgMzcsIDQxLCAuNSlcIixcclxuICAgICAgICBoaWdobGlnaHRNYXNrOiBcInJnYmEoMjU1LCAyNTUsIDI1NSwgLjUpXCIsXHJcbiAgICAgICAgdGV4dDogXCJibGFja1wiLFxyXG4gICAgfSxcclxuICAgIG5pZ2h0OiB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogXCJyZ2IoMzYsIDQ3LCA2MilcIixcclxuICAgICAgICBzbGlkZXJNYXNrOiBcInJnYmEoNDgsIDY2LCA4OSwgLjYpXCIsXHJcbiAgICAgICAgdHVtYmxlcjogXCJyZ2IoODYsIDk4LCAxMDkpXCIsXHJcbiAgICAgICAgdG9vbHRpcDogXCJyZ2IoMjgsIDM3LCA1MSlcIixcclxuICAgICAgICB0b29sdGlwVGV4dDogXCJ3aGl0ZVwiLFxyXG4gICAgICAgIGdyaWRMaW5lczogXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIC4xKVwiLFxyXG4gICAgICAgIHpvb21PdXRUZXh0OiBcInJnYig3MiwgMTcwLCAyNDApXCIsXHJcbiAgICAgICAgWFlBeGlzOiBcInJnYmEoMjM2LCAyNDIsIDI0OCwgLjUpXCIsXHJcbiAgICAgICAgaGlnaGxpZ2h0TWFzazogXCJyZ2JhKDM2LCA0NywgNjIsIC41KVwiLFxyXG4gICAgICAgIHRleHQ6IFwid2hpdGVcIixcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGhlbWVzOyJdLCJzb3VyY2VSb290IjoiIn0=
import Checks from "./Checks.js";

import Upper from "./MainController/Upper.js";
import Lower from "./MainController/Lower.js";
import Slider from "./MainController/Slider.js";

import { getDataFromJSON, sliceData } from "./dataHandler.js";
import { monthLabels } from "./parseUnixtime.js";

export default class Box {
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
        this.zoomed = false;

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
                this.data = getDataFromJSON(json);
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
        return fetch(`https://dkuskov.ru/getTelechartData/${path}`)
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
        if (this.zoomed === true) return;
        this.zoomed = true;

        let range = this.defineZoomRange(zoomObj);
        this.setZoomParams(zoomObj, range);

        let monthNumber = String(monthLabels.indexOf(month) + 1);
        monthNumber.length === 1 && (monthNumber = "0" + monthNumber);
        let folder = `${year}-${monthNumber}`;
        let item = String(day);
        item.length === 1 && (item = "0" + item);

        if (this.typeIndex === 5) {
            this.data2 = this.data;
            let l = zoomObj.l;
            this.data = sliceData(this.data2, l + range[0], l + range[1]);
            handle.call(this);
        } else {
            this.getDataFromServer(folder, item)
                .then(result => {
                    if (result === null) {
                        this.zoomed = false;
                        return;
                    }
                    this.data2 = this.data;
                    this.data = getDataFromJSON(result);
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

            this.upper.zoomed = true;
            this.upper.hoursMode = true;
            this.slider.isLive = true;

            this.typeIndex === 5 && (this.lower.chartController.columnMode = true);
        }
    }

    onZoomOut() {
        if (this.slider.isTorn === true) return; // дожидаемся окончания перехода
        this.zoomed = false;
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

        // приближаю
        if (dir === 1) {
            this.savedSliderParams = {
                tumblerStart: this.slider.tumblerStart / lW,
                tumblerWidth: this.slider.tumblerWidth / lW
            };
            let d = this.zoomedScopeStartK,
                dd = Math.floor(this.zoomedScopeStartK / 2);
            tS = lW * dd / d;
            tW = lW / d;
            // отдаляю  
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
            let ctx = this.upperHTML.getContext('2d');
            this.upper = new Upper(
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
                this.lower = new Lower(
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
        this.checksBlock = new Checks(this.html, this.data,
            this.updateChartChecks.bind(this));
    }

    removeCheckBoxes() {
        this.checksBlock.clear();
    }

    initCanvases() {
        let ctx;
        let { w, lW, lH, uH } = this.sizes;

        ctx = this.upperHTML.getContext('2d');
        this.upper = new Upper(
            this.types[0][0], ctx, w, uH, this.sliderK, this.data, 0, lW / this.tumblerLimiter,
            this.upperHTML, this.updateHeaderDate.bind(this), this.onZoom.bind(this)
        );

        ctx = this.lowerHTML.getContext('2d');
        this.lower = new Lower(
            this.types[0][1], ctx, lW, lH, 1, this.data, 0, lW, this.html
        );

        ctx = this.sliderHTML.getContext('2d');
        this.slider = new Slider(
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
        let screenWidth = document.documentElement.clientWidth;
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
            if (this.checksBlock) {
                this.checksBlock.html.style.top = cBT - lH;
            }
            bH += lH;
        } else {
            if (this.checksBlock) {
                this.checksBlock.html.style.top = cBT;
                bH += this.checksBlock.html.offsetHeight;
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
import Base from "./Base/Base.js";
import parseUnixtime from "../parseUnixtime.js";

import { Lines } from "../ChartController/Lines.js";
import { Lines2Y } from "../ChartController/Lines2Y.js";
import { Daily } from "../ChartController/Daily.js";
import { Stacked } from "../ChartController/Stacked.js";
import { Percentage } from "../ChartController/Percentage.js";
import { Pie } from "../ChartController/Pie.js";

import Marking from "../Scale/Marking.js";
import DatesBar from "../Scale/DatesBar.js";

import UpperListener from "./UpperListener.js";


export default class Upper extends Base {
    constructor(type, ctx, width, height, sliderK, data, tumblerStart, tumblerWidth,
        html, updateHeaderDate, onZoom) {
        super(type, ctx, width, height, sliderK, data, html.parentNode);

        this.html = html;
        this.updateHeaderDate = updateHeaderDate;

        this.ratio = [10, 80, 10];

        this.dates = data.dates.map(item =>
            parseUnixtime(item / 1000)
        );

        type === "pie" && this.dividePieData(10);

        let Chart;
        let markingNumber = 1;

        switch (type) {
            case "lines": Chart = Lines;
                break;
            case "lines2Y": Chart = Lines2Y;
                markingNumber = 2;
                break;
            case "stacked": Chart = Stacked;
                break;
            case "daily": Chart = Daily;
                break;
            case "percentage": Chart = Percentage;
                break;
            case "pie": Chart = Pie;
                markingNumber = 0;
        }

        if (this.chartType !== "pie") {
            let datesBarMarginTop = this.height *
                ((100 - this.ratio[2]) + this.ratio[2] / 2) / 100;

            this.datesBar = new DatesBar(
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
            let staticVisArr = [true, false];
            for (let i = 0; i < markingNumber; i++) {
                let vis = 1, color;
                if (type === "lines2Y") {
                    color = this.data.colors[i];
                    vis = Number(this.chartController.checks[i]);
                    vis === 0 && (staticVisArr[1] = true);
                }
                this.markings.push(
                    new Marking(
                        this.ctx, this.width, this.chartHeight, this.chartMarginTop,
                        1, 0, !!i, vis, color, staticVisArr[i]
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

        this.upperListener = new UpperListener(html, this.onSelectionChange.bind(this),
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
        this.leftBoundIndex = this.fittedLeftBoundIndex - leftSideMargin;
        this.rightBoundIndex = this.fittedRightBoundIndex + rightSideMargin;

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
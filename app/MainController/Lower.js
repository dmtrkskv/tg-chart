import roundRect from "../roundRect.js";
import Base from "./Base/Base.js";

import { LinesL } from "../ChartController/Lines.js";
import { Lines2YL } from "../ChartController/Lines2Y.js";
import { DailyL } from "../ChartController/Daily.js";
import { StackedL } from "../ChartController/Stacked.js";
import { PercentageL } from "../ChartController/Percentage.js";


export default class Lower extends Base {
    constructor(type, ctx, width, height, sliderK, data, tumblerStart, tumblerWidth, boxHTML) {
        super(type, ctx, width, height, sliderK, data, boxHTML);

        this.ratio = [0, 100, 0];

        let Chart;

        switch (type) {
            case "lines": Chart = LinesL;
                break;
            case "lines2Y": Chart = Lines2YL;
                break;
            case "stacked": Chart = StackedL;
                break;
            case "daily": Chart = DailyL;
                break;
            case "percentage": Chart = PercentageL;
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
        roundRect(ctx, 0, 0, this.width, this.height, 15, true, false);
        ctx.globalCompositeOperation = "source-over";

        this.animate(input1);
    }

    onResize(width, height) {
        super.onResize(width, height);

        this.onTumblerUpdate(0, this.width);

        this.animationHappens || this.draw();
    }
}
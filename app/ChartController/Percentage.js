import Base from "./Base/Base.js";
import Item from "./Item/Percentage.js";

class PercentageBase extends Base {
    constructor(ctx, width, height, marginTop, data,
        drawPopup
    ) {
        super(ctx, width, height, marginTop, data, drawPopup);

        data.valuesY.forEach((item, i) =>
            this.items.push(new Item(
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


export class Percentage extends PercentageBase {
    constructor(ctx, width, height, marginTop, data,
        drawPopup
    ) {
        super(ctx, width, height, marginTop, data, drawPopup);
        this.axisYmax.newV = 100;
        this.axisYmin.newV = 0;
    }
}

export class PercentageL extends PercentageBase {
    constructor(ctx, width, height, marginTop, data) {
        super(ctx, width, height, marginTop, data);

    }
}
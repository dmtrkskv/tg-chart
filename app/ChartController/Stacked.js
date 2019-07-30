import Base from "./Base/Base.js";
import Item from "./Item/Stacked.js";


class StackedBase extends Base {
    constructor(ctx, width, height, marginTop, data,
        drawPopup
    ) {
        super(ctx, width, height, marginTop, data, drawPopup);

        data.valuesY.forEach((item, i) =>
            this.items.push(new Item(
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

export class Stacked extends StackedBase {
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

    drawMask(coordsX, scaleX) {
        let ctx = this.ctx;

        let i = this.highlightedIndex;
        ctx.beginPath();

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

export class StackedL extends StackedBase {
    constructor(ctx, width, height, marginTop, data) {
        super(ctx, width, height, marginTop, data);
    }
}

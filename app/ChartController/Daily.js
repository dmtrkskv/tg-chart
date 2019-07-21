import Base from "./Base/Base.js";

function hexDec(h) {
    var m = h.slice(1).match(/.{2}/g);

    m[0] = parseInt(m[0], 16);
    m[1] = parseInt(m[1], 16);
    m[2] = parseInt(m[2], 16);

    return m.join(',');
};

class DailyBase extends Base {
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

export class Daily extends DailyBase {
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

// буду делать наследование с немного другим функционалом
export class DailyL extends DailyBase {
    constructor(ctx, width, height, marginTop, data) {
        super(ctx, width, height, marginTop, data);

        this.color = hexDec(this.data.colors[0]);
        this.visibility = 1;
    }

}

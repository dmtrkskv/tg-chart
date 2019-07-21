import ItemBase from "../Base/ItemBase.js";

export default class Item extends ItemBase {
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
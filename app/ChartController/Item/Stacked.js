import ItemBase from "../Base/ItemBase.js";

export default class Item extends ItemBase {
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
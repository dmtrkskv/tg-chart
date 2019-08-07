import ItemBase from "../Base/ItemBase.js";


export default class Item extends ItemBase {
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
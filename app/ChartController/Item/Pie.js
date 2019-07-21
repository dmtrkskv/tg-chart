import ItemBase from "../Base/ItemBase.js";

export default class Item extends ItemBase {
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
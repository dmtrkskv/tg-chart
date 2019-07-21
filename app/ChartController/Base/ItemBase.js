function hexDec(h) {
    var m = h.slice(1).match(/.{2}/g);

    m[0] = parseInt(m[0], 16);
    m[1] = parseInt(m[1], 16);
    m[2] = parseInt(m[2], 16);

    return m.join(',');
};

export default class ItemBase {
    constructor(ctx, height, marginTop, color, values) {
        this.ctx = ctx;

        this.height = height;
        this.marginTop = marginTop;

        this.color = hexDec(color);

        this.values = values;

        this.visibility = 1;

        this.coordsY = [];

        this.animationHappens = false;
    }

    //синхронизация не треубуется, можно не заморачиваться
    //и анимировать локально
    initVisibilityAnimation(dir, dur) {
        cancelAnimationFrame(this.requestID);

        this.animStep = 1 / dur;
        this.lastTime = Date.now();
        this.animateVisibility(dir);
    }

    animateVisibility(dir) {
        let now = Date.now();
        this.dt = now - this.lastTime;
        this.lastTime = now;

        if (dir === true) {
            this.visibility += this.animStep * this.dt;
            this.visibility >= 1 && (this.visibility = 1);
        } else {
            this.visibility -= this.animStep * this.dt;
            this.visibility <= 0 && (this.visibility = 0);
        }

        let target = +dir;
        if (this.visibility === target) {
            this.animationHappens = false;
        } else {
            this.animationHappens = true;
            (this.requestID = requestAnimationFrame(() => this.animateVisibility(dir)));
        }
    }

}
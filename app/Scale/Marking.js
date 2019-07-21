function hexDec(h) {
    var m = h.slice(1).match(/.{2}/g);

    m[0] = parseInt(m[0], 16);
    m[1] = parseInt(m[1], 16);
    m[2] = parseInt(m[2], 16);

    return m.join(',');
};

function reduceNumber(value) {
    if (value >= 1000) {
        if (value < 1000000) {
            value = Math.round((value / 1000) * 10) / 10 + "K";
        } else if (value >= 1000000 && value < 1000000000) {
            value = Math.round((value / 1000000) * 10) / 10 + "M";
        } else if (value >= 1000000000) {
            value = Math.round((value / 1000000000) * 10) / 10 + "B";
        }
    }
    return value;
}


class Line {
    constructor(label, value, y, opacity) {
        this.label = label;
        this.y = y;

        //нужно здесь для сравнения с новыми появившимися линиями
        this.value = value;

        this.opacity = opacity;
        this.step = null;
    }

    setMoveAnimation(endY, dur, targetOpacity) {
        this.targetOpacity = targetOpacity;
        this.opacityStep = (targetOpacity - this.opacity) / dur;
        this.opacitySign = Math.sign(this.opacityStep);
        this.step = (endY - this.y) / dur;
        this.endY = endY;
    }

    animateStep(dt) {
        if (!this.step) return;

        this.opacity += this.opacityStep * dt;
        this.opacity * this.opacitySign >
            this.targetOpacity * this.opacitySign
            && (this.opacity = this.targetOpacity);

        this.y += this.step * dt;
    }

    finishAnimation() {
        this.opacity = this.targetOpacity;
        if (this.step) {
            this.y = this.endY;
            this.step = null;
            delete this.endY;
        }
    }


    draw(ctx, width, visibility, labelColor, labelX, lineColor, maxLineOpacity) {
        let y = this.y;

        ctx.strokeStyle = `rgba(${lineColor}, ${this.opacity * maxLineOpacity * visibility})`;

        ctx.beginPath();

        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        ctx.fillStyle = `rgba(${labelColor}, ${this.opacity * .5 * visibility})`;

        ctx.fillText(this.label, labelX, y - 10);
    }
}

export default class MarkingController {
    constructor(ctx, width, height, marginTop,
        max = 1, min = 0,
        rightSide = false, visibility, labelColor) {

        this.linesNumber = 5;

        this.ctx = ctx;

        this.height = height;
        this.width = width;
        this.marginTop = marginTop;
        this.bottomBound = marginTop + height;

        this.maxLineOpacity = .1;
        this.lineOpacity = this.maxLineOpacity;
        this.staticVisibility = !rightSide;

        this.visibility = visibility;
        this.rightSide = rightSide;

        labelColor && (this.customLabelColor = hexDec(labelColor));

        this.dif0 = max - min;
        this.min0 = min;

        this.targets = [];
        this.items = [];

        for (let i = 0; i < this.linesNumber; i++) {
            let y = this.bottomBound - i * height / (this.linesNumber - 1);
            this.targets.push({
                label: "",
                value: 0,
                y: y
            });
        }

        this.animationHappens = false;
        this.animationHappens2 = false;
    }

    onResize(width, height, marginTop) {
        this.height = height;
        this.width = width;
        this.marginTop = marginTop;
        this.bottomBound = marginTop + height;

        for (let i = 0; i < this.linesNumber; i++) {
            let y = this.bottomBound - i * height / (this.linesNumber - 1);
            this.targets[i].y = y;
        }

        this.initAnimation(0, this.max, this.min);
    }

    initAnimation(dur, max, min = 0) {
        if (!(isFinite(max) && isFinite(min))) return;

        if (this.staticVisibility === false) {
            this.lineOpacity = this.maxLineOpacity;
        }

        this.animationHappens2 = true;

        this.dur = this.initDur = dur;
        this.lastTime = Date.now();

        this.dif = max - min;
        this.min = min;
        this.max = max;

        //clone
        let targets0 = this.targets.map(a => ({ ...a }));

        for (let i = 0; i < this.linesNumber; i++) {
            let value = min + (this.dif / Math.floor(this.linesNumber - 1)) * i;

            let label = reduceNumber(value);
            this.targets[i].value = value;
            this.targets[i].label = label;
        }

        for (let i = 0; i < this.linesNumber; i++) {

            let t0 = targets0[i];
            let value0 = t0.value, label0 = t0.label, y = t0.y;

            let t = this.targets[i];
            let value = t.value, label = t.label;


            let index0 = this.items.findIndex(item => {
                return item.label === label0;
            });
            if (~index0) {
                let a = this.targets.find(target => target.label === label0);
                let targetY, targetOpacity;
                if (a === undefined) {
                    let dy = this.calcDY(value0);
                    targetY = t.y + dy;
                    targetOpacity = 0;
                } else {
                    targetY = a.y;
                    targetOpacity = 1;
                }

                let item = this.items[index0];
                item.setMoveAnimation(targetY, this.dur, targetOpacity);
            }

            let index = this.items.findIndex(item => item.label === label);
            if (~index) {
                let item = this.items[index];
                item.value = value;
                item.setMoveAnimation(t.y, this.dur, 1);
            } else {
                let dy = this.calcDY(value);
                let line = new Line(label, value, t.y - dy, 0);
                line.setMoveAnimation(t.y, this.dur, 1);
                this.items.push(line);
            }
        }

        this.dif0 = this.dif;
        this.min0 = this.min;

        cancelAnimationFrame(this.requestID2);
        this.animate();
    }

    calcDY(value) {
        let y0 = (value - this.min0) / this.dif0;
        let y = (value - this.min) / this.dif;
        return (y0 - y) * this.height;
    }

    animate() {
        let now = Date.now();
        let dt = now - this.lastTime;
        this.lastTime = now;

        this.dur -= dt;

        this.items.forEach(item => item.animateStep(dt));

        if (this.dur > 0) {
            this.requestID2 = requestAnimationFrame(
                () => this.animate()
            );
        } else {
            this.finishAnimation();
        }
    }

    finishAnimation() {
        this.items = this.items.filter(item => {
            item.finishAnimation();
            return item.opacity !== 0;
        });

        this.lineOpacity = this.staticVisibility ? this.maxLineOpacity : 0;
        this.animationHappens2 = false;
    }

    setStaticVisibility(state) {
        this.staticVisibility = state;
        this.lineOpacity = state ? this.maxLineOpacity : 0;
    }

    draw() {
        let labelColor = this.customLabelColor ? this.customLabelColor :
            window.theme.XYAxis.slice(5, -5); //можно регулярку написать   

        let lineColor = window.theme.gridLines.slice(5, -5);

        let labelX = this.rightSide ? this.width - 50 : 10;

        let args = [this.ctx, this.width,
        this.visibility, labelColor, labelX, lineColor, this.lineOpacity];

        this.ctx.font = "15px Arial";
        this.ctx.lineWidth = 1;

        this.items.forEach(item => item.draw(...args));

        return this.animationHappens || this.animationHappens2;
    }

    initVisibilityAnimation(dir, dur = 200) {
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
            this.visibility = this.visibility >= 1 ? (this.visibility = 1) : this.visibility + this.animStep * this.dt;
        } else {
            this.visibility = this.visibility <= 0 ? (this.visibility = 0) : this.visibility - this.animStep * this.dt;
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
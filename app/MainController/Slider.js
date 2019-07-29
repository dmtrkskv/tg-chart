import roundRect from "../roundRect.js";

export default class Slider {
    constructor(ctx, html, width, height, tumblerLimiter, upper) {
        this.ctx = ctx;
        this.html = html;
        this.parentHTML = html.parentNode;

        this.width = width;
        this.height = height;

        this.tumblerLimiter = tumblerLimiter;
        this.minTumblerWidth = this.width / tumblerLimiter;
        this.borders = [16, 3];

        this.upper = upper;

        this.liveDur = 200;

        this.events = ('ontouchstart' in window) ?
            {
                isDesktop: false,
                down: "ontouchstart",
                up: "ontouchend",
                move: "ontouchmove",
                leave: "ontouchend"
            } :
            {
                isDesktop: true,
                down: "onmousedown",
                up: "onmouseup",
                move: "onmousemove",
                leave: "onmouseleave"
            };

        this.html[this.events.down] = e => this.handleTumblerDown(e);

        this.isLive = false;
        this.animationHappens = false;
        this.isTorn = false;
    }

    switchInfluence(state, upper) {
        this.isTorn = !state;
        let stub = { onTumblerUpdate: () => { } };
        upper ? this.onUpperUpdate(upper) : this.onUpperUpdate(stub);
    }

    onUpperUpdate(newUpper) {
        this.upper = newUpper;
    }

    onResize(width, height) {
        let ratio = width / this.width;

        this.tumblerStart *= ratio;
        this.tumblerWidth *= ratio;

        this.width = width;
        this.height = height;

        this.minTumblerWidth = this.width / this.tumblerLimiter;

        this.upper.onTumblerUpdate(this.tumblerStart, this.tumblerWidth);
        this.update(this.tumblerStart, this.tumblerWidth);
    }

    handleTumblerDown(e) {
        let tooltipArea = this.parentHTML.querySelector(".tooltipArea");
        tooltipArea.dispatchEvent(
            new Event("mouseleave")
        );

        if (this.isTorn === true) return;

        window.sliderDown = true;

        let x = this.events.isDesktop ? e.clientX : e.changedTouches[0].clientX;
        let offsetLeft = this.html.getBoundingClientRect().left;
        let offsetX = x - offsetLeft;
        let shiftX = offsetX - this.tumblerStart;

        if (shiftX > 0 && shiftX <= this.tumblerWidth) {
            let side = null;

            if (shiftX < 15) {
                side = "l";
            } else if (shiftX > this.tumblerWidth - 15) {
                side = "r";
            }

            if (side === null) {
                this.handleTumblerMove(shiftX);
            } else {
                this.handleTumblerExtend(e, side);
            }

            document[this.events.up] = () => {
                window.sliderDown = false;
                document[this.events.move] = document.onmouseup = null;
            };
        }
    }

    handleTumblerMove(shiftX) {
        document[this.events.move] = e => {
            let x = this.events.isDesktop ? e.clientX : e.changedTouches[0].clientX;
            let offsetLeft = this.html.getBoundingClientRect().left;
            let offsetX = x - offsetLeft;
            let newTumblerLeft = offsetX - shiftX;

            let space = this.width - this.tumblerWidth;

            if (newTumblerLeft < 0) {
                newTumblerLeft = 0;
            } else if (newTumblerLeft > space) {
                newTumblerLeft = space;
            }

            //дублируется
            if (this.isLive) {
                if (!this.animationHappens &&
                    Math.abs(newTumblerLeft - this.tumblerStart) >=
                    this.minTumblerWidth / 10) {
                    let res = this.calcAnimOffset(newTumblerLeft, this.tumblerWidth);
                    this.initAnimateTumbler(res[0], res[1]);
                }
            } else {
                this.upper.onTumblerUpdate(newTumblerLeft, this.tumblerWidth, true);
                this.update(newTumblerLeft, this.tumblerWidth);
            }
        }
    }


    handleTumblerExtend(e, side) {
        let x = this.events.isDesktop ? e.clientX : e.changedTouches[0].clientX;
        let offsetLeft = this.html.getBoundingClientRect().left;
        let offsetX0 = x - offsetLeft;
        let tumblerWidth0 = this.tumblerWidth;
        let tumblerLeft0 = this.tumblerStart;
        let marginRight0 = this.width - (tumblerLeft0 + tumblerWidth0);

        document[this.events.move] = e => {
            let newTumblerWidth, newTumblerLeft;
            let x = this.events.isDesktop ? e.clientX : e.changedTouches[0].clientX;
            let offsetLeft = this.html.getBoundingClientRect().left;
            let offsetX = x - offsetLeft;
            let offset = offsetX - offsetX0;

            if (side === "r") {
                newTumblerWidth = tumblerWidth0 + offset;
                let newMarginRight = newTumblerWidth + tumblerLeft0;
                newMarginRight > this.width && (newTumblerWidth = this.width - tumblerLeft0);
                newTumblerLeft = tumblerLeft0;
            } else {
                newTumblerWidth = tumblerWidth0 - offset;
                newTumblerLeft = this.width - (marginRight0 + newTumblerWidth);

                if (newTumblerLeft < 0) {
                    newTumblerWidth = this.width - marginRight0;
                    newTumblerLeft = 0;
                }
            }

            if (newTumblerWidth < this.minTumblerWidth) {
                newTumblerWidth = this.minTumblerWidth;
                side === "l" &&
                    (newTumblerLeft = this.width - this.minTumblerWidth - marginRight0);
            } else if (newTumblerWidth > this.width) {
                newTumblerWidth = this.width;
            }

            if (this.isLive) {
                if (!this.animationHappens &&
                    Math.abs(newTumblerWidth - this.tumblerWidth) >=
                    this.minTumblerWidth / 10) {
                    let res = this.calcAnimOffset(newTumblerLeft, newTumblerWidth);
                    this.initAnimateTumbler(res[0], res[1]);
                } newTumblerWidth, this.minTumblerWidth
            } else {
                this.upper.onTumblerUpdate(newTumblerLeft, newTumblerWidth, true);
                this.update(newTumblerLeft, newTumblerWidth);
            }
        }
    }

    update(tumblerStart, tumblerWidth) {
        this.tumblerStart = tumblerStart;
        this.tumblerWidth = tumblerWidth;

        this.draw();
    }

    calcAnimOffset(tumblerStart, tumblerWidth) {
        let dif0;

        dif0 = tumblerStart - this.tumblerStart;
        dif0 !== 0 && (tumblerStart = this.tumblerStart +
            this.minTumblerWidth * Math.round(dif0 / this.minTumblerWidth));

        dif0 = tumblerWidth - this.tumblerWidth;
        dif0 !== 0 && (tumblerWidth = this.tumblerWidth +
            this.minTumblerWidth * Math.round(dif0 / this.minTumblerWidth));

        return [tumblerStart, tumblerWidth];
    }

    initAnimateTumbler(newStart, newTumblerWidth, dur = this.liveDur, resolve) {
        this.updateDT();
        this.dur = dur;
        this.durProgress = 0;

        let dif;

        dif = newStart - this.tumblerStart;
        this.animBiasOfStart = dif / dur;

        dif = newTumblerWidth - this.tumblerWidth;
        this.animBiasOfTumblerWidth = dif / dur;


        this.animationHappens = true;
        cancelAnimationFrame(this.requestID);
        this.animateTumbler(newStart, newTumblerWidth, resolve);
    }

    animateTumbler(newStart, newTumblerWidth, resolve) {
        this.updateDT();
        this.durProgress += this.dt;

        let input1 = true;

        let s1 = this.tumblerStart + this.animBiasOfStart * this.dt;
        let s2 = this.tumblerWidth + this.animBiasOfTumblerWidth * this.dt;

        if (this.durProgress < this.dur) {
            this.tumblerStart = s1;
            this.tumblerWidth = s2;
            this.upper.onTumblerUpdate(this.tumblerStart, this.tumblerWidth, false);

        } else {
            this.tumblerStart = newStart;
            this.tumblerWidth = newTumblerWidth;

            this.animationHappens = false;
            input1 = false;

            this.upper.onTumblerUpdate(this.tumblerStart, this.tumblerWidth, true);
        }

        this.update(this.tumblerStart, this.tumblerWidth);

        if (input1) {
            (this.requestID = requestAnimationFrame(
                () => this.animateTumbler(newStart, newTumblerWidth, resolve)
            ));
        } else {
            resolve && resolve(true);
        }
    }

    updateDT() {
        let now = Date.now();
        this.dt = now - this.lastTime;
        this.lastTime = now;
    }

    draw() {
        let ctx = this.ctx;

        ctx.clearRect(0, 0, this.width, this.height);
        ctx.fillStyle = window.theme.sliderMask;
        roundRect(ctx, 0, 0, this.width, this.height, 15, true, false);
        ctx.fillStyle = window.theme.tumbler;

        let stroke = false;
        if (window.themeType === "day") {
            stroke = true;
            ctx.strokeStyle = "white";
            ctx.lineWidth = 1;
        }
        roundRect(ctx, this.tumblerStart, 0, this.tumblerWidth, this.height, 15, true, stroke);

        let a = this.borders[0], b = this.borders[1];
        ctx.clearRect(this.tumblerStart + a, b, this.tumblerWidth - a * 2, this.height - b * 2);
        stroke && ctx.strokeRect(this.tumblerStart + a, b, this.tumblerWidth - a * 2, this.height - b * 2);

        let margin = this.height / 2.5;
        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(this.tumblerStart + a / 2, this.height - margin);
        ctx.lineTo(this.tumblerStart + a / 2, 0 + margin);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.tumblerStart + this.tumblerWidth - a / 2, this.height - margin);
        ctx.lineTo(this.tumblerStart + this.tumblerWidth - a / 2, 0 + margin);
        ctx.stroke();
    }

}
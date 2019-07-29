export default class Base {
    constructor(type, ctx, width, height, sliderK, data, boxHTML) {
        this.chartType = type;

        this.ctx = ctx;

        this.width = width;
        this.height = height;

        this.sliderK = sliderK;
        this.sliderWidth = width * sliderK;

        this.data = data;

        this.boxHTML = boxHTML;

        this.animationHappens = true;
    }

    onResize(width, height) {
        this.width = width;
        this.height = height;
        this.sliderWidth = this.sliderK * width;

        this.chartHeight = this.height * this.ratio[1] / 100,
            this.chartMarginTop = this.height * this.ratio[0] / 100;

        this.chartController.onResize(this.width, this.chartHeight, this.chartMarginTop);
    }

    onTumblerUpdate(tumblerStart, tumblerWidth, flagHeaderUpdate) {
        this.shouldChartsUpdate = true;

        this.tumblerStart = tumblerStart;
        this.tumblerWidth = tumblerWidth;

        let valuesNumber = this.data.valuesY[0].length,
            n = valuesNumber - 1;

        this.leftBoundIndex = Math.ceil(n * tumblerStart / this.sliderWidth);
        this.rightBoundIndex = Math.floor((n * (tumblerStart + tumblerWidth)) / this.sliderWidth);
        this.rightBoundIndex < this.leftBoundIndex && (this.leftBoundIndex = this.rightBoundIndex);

        this.transitionHappens === true ||
            this.chartController.updateVerticalBounds(this.leftBoundIndex, this.rightBoundIndex);

        flagHeaderUpdate && this.updateHeaderDate(this.defineHeaderDateLabel(
            this.leftBoundIndex, this.rightBoundIndex), this.zoomed);

        this.scaleX = (this.width / valuesNumber) * (this.sliderWidth / tumblerWidth);
    }

    setChecks() {
        [].forEach.call(
            this.boxHTML.querySelectorAll(".checkBox"),
            (item, i) => {
                let state = !!(parseInt(item.dataset.isActive));
                if (state === false) {
                    this.chartController.items[i].visibility = 0;
                    this.chartController.checks[i] = false;
                }
            }
        );
    }

    calcCoordsX(leftBoundIndex, rightBoundIndex, scaleX, offset) {
        let coordsX = [];

        for (let i = 0; i < rightBoundIndex - leftBoundIndex + 1; i++) {
            let x0 = (this.data.valuesNumber - leftBoundIndex - i) * scaleX,
                x = this.width - x0 + offset;
            coordsX.push(Math.round(x * 100) / 100);
        }

        return coordsX;
    }

    onCheckBoxesStateChange(index, state) {
        if (this.markings) {
            if (this.chartType === "lines2Y") {
                this.markings[index].initVisibilityAnimation(state);
                if (index === 0) {
                    this.markings[1].setStaticVisibility(!state);
                }
            }
        }
        this.chartController.animateVisibility(index, state);
        this.chartController.updateVerticalBounds(this.leftBoundIndex, this.rightBoundIndex, 1);

        this.shouldChartsUpdate = true;
        this.animationHappens || this.draw();
    }

    animate(animationHappens) {
        if (animationHappens) {
            this.animationHappens = true;
        } else {
            this.shouldChartsUpdate = false;
            this.animationHappens = false;
            return;
        }

        this.animationHappens && requestAnimationFrame(() => this.draw());
    }

    updateDT() {
        let now = Date.now();
        this.dt = now - this.lastTime;
        this.lastTime = now;
    }


    initAppearAnimation(xFrom, dur) {
        this.updateDT();
        this.dur = dur;
        this.durProgress = 0;

        this.ctx.globalAlpha = 0;

        this.transitionHappens = true;
        this.animate(true);

        this.transitionStepOfS = (this.tumblerStart - xFrom.tumblerStart) / dur;
        this.transitionDiffOfTW = this.tumblerWidth - xFrom.tumblerWidth; //нужен для определения прозрачности
        this.transitionStepOfTW = this.transitionDiffOfTW / dur;

        this.zoomDir = Math.sign(this.transitionStepOfTW);

        //это по сути to
        this.targetStart = this.tumblerStart;
        this.targetTumblerWidth = this.tumblerWidth;

        this.tumblerStart = xFrom.tumblerStart;
        this.tumblerWidth = xFrom.tumblerWidth;

        requestAnimationFrame(() =>
            this.animateAppear());
    }

    animateAppear() {
        this.updateDT();
        this.durProgress += this.dt;

        if (this.durProgress >= this.dur) {
            this.ctx.globalAlpha = 1;
            this.tumblerStart = this.targetStart;
            this.tumblerWidth = this.targetTumblerWidth;
            this.transitionHappens = false;
            this.onTumblerUpdate(this.tumblerStart, this.tumblerWidth, false);

            delete this.targetStart;
            delete this.targetTumblerWidth;
            delete this.zoomDir;
        } else {
            let k1 = this.transitionStepOfS * this.dt,
                k2 = this.transitionStepOfTW * this.dt;

            let ratio = (this.targetTumblerWidth - this.tumblerWidth) / this.transitionDiffOfTW;
            this.ctx.globalAlpha = 1 - ratio;

            this.onTumblerUpdate(this.tumblerStart + k1, this.tumblerWidth + k2, false);


            requestAnimationFrame(() =>
                this.animateAppear());
        }
    }


    initDisappearAnimation(xTo, dur, resolve) {
        this.updateDT();
        this.dur = dur;
        this.durProgress = 0;

        this.transitionHappens = true;
        this.animate(true);

        this.transitionStepOfS = (xTo.tumblerStart - this.tumblerStart) / dur;
        this.transitionDiffOfTW = xTo.tumblerWidth - this.tumblerWidth;
        this.transitionStepOfTW = this.transitionDiffOfTW / dur;

        this.zoomDir = Math.sign(this.transitionStepOfTW);
        this.zoomOffset = Math.sign(this.transitionStepOfTW);

        this.targetStart = xTo.tumblerStart;
        this.targetTumblerWidth = xTo.tumblerWidth;

        requestAnimationFrame(() =>
            this.animateDisappear(resolve));
    }

    animateDisappear(resolve) {
        this.updateDT();
        this.durProgress += this.dt;

        if (this.durProgress >= this.dur) {
            this.ctx.globalAlpha = 0;
            resolve(true);
        } else {
            let k1 = this.transitionStepOfS * this.dt,
                k2 = this.transitionStepOfTW * this.dt;

            let ratio = (this.targetTumblerWidth - this.tumblerWidth) / this.transitionDiffOfTW;
            this.ctx.globalAlpha = ratio;

            this.onTumblerUpdate(this.tumblerStart + k1, this.tumblerWidth + k2, false);

            requestAnimationFrame(() =>
                this.animateDisappear(resolve));
        }
    }

}
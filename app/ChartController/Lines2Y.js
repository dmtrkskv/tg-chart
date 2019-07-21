import Base from "./Base/Base.js";
import Item from "./Item/Lines.js";

export class Lines2Y extends Base {
    constructor(ctx, width, height, marginTop, data,
        drawPopup, animateMarking
    ) {
        super(ctx, width, height, marginTop, data, drawPopup);

        this.lineWidth = 3;

        for (let i = 0; i < 2; i++) {
            let vY = data.valuesY[i];
            this.items.push(new Item(
                this.ctx, height, marginTop, data.colors[i],
                vY, this.lineWidth)
            );
        }

        this.animateMarking = animateMarking;

        this.verticalLineOpacity = .5;

        this.axisYmax2 = {
            curV: 0,
            newV: null,
            lastSavedNewV: null,
            animBias: 0,
            animDuration: this.axisYAnimationDuration
        };

        this.axisYmin2 = {
            curV: 0,
            newV: null,
            lastSavedNewV: null,
            animBias: 0,
            animDuration: this.axisYAnimationDuration
        };

        this.circlesAnim = {
            curV: 0,
            newV: null,
            lastSavedNewV: null,
            animBias: 0,
            animDuration: 100,
        };
    }

    updateVerticalBounds(l, r) {
        let res = this.defineVerticalBounds(l, r);

        this.axisYmax.newV = res.max;
        this.axisYmin.newV = res.min;
        this.axisYmax2.newV = res.max2;
        this.axisYmin2.newV = res.min2;
    }

    defineVerticalBounds(l, r) {
        let slice = this.data.valuesY[0].slice(l, r);
        let slice2 = this.data.valuesY[1].slice(l, r);

        return {
            max: Math.max(...slice),
            min: Math.min(...slice),
            max2: Math.max(...slice2),
            min2: Math.min(...slice2)
        };
    }

    draw(shouldUpdate, coordsX, leftBoundIndex, rightBoundIndex) {
        let input = false;
        if (shouldUpdate) {
            this.updateDT();

            let res1 = this.animate(this.axisYmax);
            let res2 = this.animate(this.axisYmin);
            let res3 = this.animate(this.axisYmax2);
            let res4 = this.animate(this.axisYmin2);

            input = !!res1 || !!res2 || !!res3 || !!res4 || input;

            if (res1 === 2 || res2 === 2) {
                this.animateMarking(this.axisYAnimationDuration,
                    this.axisYmax.newV, this.axisYmin.newV, 0);
            }
            if (res3 === 2 || res4 === 2) {
                this.animateMarking(this.axisYAnimationDuration,
                    this.axisYmax2.newV, this.axisYmin2.newV, 1);
            }

            this.items[0].updateCoordsY(
                leftBoundIndex, rightBoundIndex,
                this.axisYmax.curV, this.axisYmin.curV);
            this.items[1].updateCoordsY(
                leftBoundIndex, rightBoundIndex,
                this.axisYmax2.curV, this.axisYmin2.curV);
        }

        input = this.items.reduce((accum, item) => {
            return item.draw(coordsX) || accum;
        }, false) || input;

        if (this.isHightlight === true) {
            if (window.sliderDown !== true) {
                input = !!this.animate(this.circlesAnim) || input;
                this.items.forEach(item =>
                    item.drawCircleInPoint(this.circlesAnim.curV, coordsX)
                );
            }
            this.drawVerticalLine();
        } else {
            this.circlesAnim.lastSavedNewV = null;
        }

        return input;
    }

    highlightItem(x, y, coordsX, scaleX, leftBoundIndex) {
        this.focusX = x; //зачем?
        this.focusY = y;

        this.isHightlight = true;
        let index = Math.floor((x - coordsX[0]) / scaleX); //вместо round
        index < 0 && (index = 0);

        this.circlesAnim.newV = coordsX[index];

        let dockets = this.items.reduce((accum, item, i) => {
            if (this.checks[i] === true) {
                accum.push({
                    name: this.data.names[i],
                    value: this.prepareValue(this.data.valuesY[i][index + leftBoundIndex]),
                });
            } else {
                accum.push({ name: "", value: "", });
            }
            return accum;
        }, []);

        this.drawPopup(index, dockets);
    }


}


export class Lines2YL extends Base {
    constructor(ctx, width, height, marginTop, data,
        drawPopup
    ) {
        super(ctx, width, height, marginTop, data, drawPopup);

        this.linesWidth = 2;

        for (let i = 0; i < 2; i++) {
            let vY = data.valuesY[i];
            this.items.push(new Item(
                this.ctx, height, marginTop, data.colors[i],
                vY, this.lineWidth)
            );
        }

        this.axisYmax2 = {
            curV: 0,
            newV: null,
            lastSavedNewV: null,
            animBias: 0,
            animDuration: this.axisYAnimationDuration
        };

        this.axisYmin2 = {
            curV: 0,
            newV: null,
            lastSavedNewV: null,
            animBias: 0,
            animDuration: this.axisYAnimationDuration
        };
    }

    updateVerticalBounds(l, r) {
        let res = this.defineVerticalBounds(l, r);

        this.axisYmax.newV = res.max;
        this.axisYmin.newV = res.min;
        this.axisYmax2.newV = res.max2;
        this.axisYmin2.newV = res.min2;
    }

    defineVerticalBounds(l, r) {
        let slice = this.data.valuesY[0].slice(l, r);
        let slice2 = this.data.valuesY[1].slice(l, r);

        return {
            max: Math.max(...slice),
            min: Math.min(...slice),
            max2: Math.max(...slice2),
            min2: Math.min(...slice2)
        };
    }

    draw(shouldUpdate, coordsX, leftBoundIndex, rightBoundIndex) {
        let input = false;
        this.updateDT();

        let res1 = this.animate(this.axisYmax);
        let res2 = this.animate(this.axisYmin);
        let res3 = this.animate(this.axisYmax2);
        let res4 = this.animate(this.axisYmin2);

        input = !!res1 || !!res2 || !!res3 || !!res4 || input;

        this.items[0].updateCoordsY(
            leftBoundIndex, rightBoundIndex,
            this.axisYmax.curV, this.axisYmin.curV);
        this.items[1].updateCoordsY(
            leftBoundIndex, rightBoundIndex,
            this.axisYmax2.curV, this.axisYmin2.curV);

        input = this.items.reduce((accum, item) => {
            return item.draw(coordsX) || accum;
        }, false) || input;

        return input;
    }

}

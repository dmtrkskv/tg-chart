import Base from "./Base/Base.js";
import Item from "./Item/Lines.js";


export class Lines extends Base {
    constructor(ctx, width, height, marginTop, data,
        drawPopup, animateMarking,
    ) {
        super(ctx, width, height, marginTop, data, drawPopup);

        this.lineWidth = 3;

        data.valuesY.forEach((item, i) =>
            this.items.push(new Item(
                this.ctx, height, marginTop, data.colors[i],
                item, this.lineWidth)
            )
        );
        this.animateMarking = animateMarking;

        this.verticalLineOpacity = .5;

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
    }

    defineVerticalBounds(l, r) {
        let [maxs, mins] = [[], []];

        this.checks.forEach((item, i) => {
            if (item === false) return;
            let slice = this.data.valuesY[i].slice(l, r);
            maxs.push(Math.max(...slice));
            mins.push(Math.min(...slice));
        });
        //тут можно ловить инфинити, когда чеков 0, но оно нигде не вредит

        return { max: Math.max(...maxs), min: Math.min(...mins) };
    }

    draw(shouldUpdate, coordsX, leftBoundIndex, rightBoundIndex) {
        let input = false;

        if (shouldUpdate) {
            this.updateDT();

            let res1 = this.animate(this.axisYmax);
            let res2 = this.animate(this.axisYmin);

            if (res1 === 2 || res2 === 2) {
                this.animateMarking(this.axisYAnimationDuration,
                    this.axisYmax.newV, this.axisYmin.newV);
            }

            input = !!res1 || !!res2 || input;

            this.items.forEach(item =>
                item.updateCoordsY(
                    leftBoundIndex, rightBoundIndex,
                    this.axisYmax.curV, this.axisYmin.curV)
            );
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
                //не забыть
                accum.push({ name: "", value: "", });
            }
            return accum;
        }, []);

        this.drawPopup(index, dockets);
    }

    // функция должна взять старый сохраненный X0, по индексу вычислить новый X, 
    // произвести анимацию от X0 к X на каждом шаге отрисовки, заставляя линию перерисовываться


}

// буду делать наследование с немного разным функционалом
export class LinesL extends Base {
    constructor(ctx, width, height, marginTop, data) {
        super(ctx, width, height, marginTop, data);

        this.lineWidth = 2;

        data.valuesY.forEach((item, i) =>
            this.items.push(new Item(
                this.ctx, height, marginTop, data.colors[i],
                item, this.lineWidth)
            )
        );

    }

    updateVerticalBounds(l, r) {
        let res = this.defineVerticalBounds(l, r);
        this.axisYmax.newV = res.max;
        this.axisYmin.newV = res.min;
    }

    defineVerticalBounds(l, r) {
        let [maxs, mins] = [[], []];

        this.checks.forEach((item, i) => {
            if (item === false) return;
            let slice = this.data.valuesY[i].slice(l, r);
            maxs.push(Math.max(...slice));
            mins.push(Math.min(...slice));
        });

        return { max: Math.max(...maxs), min: Math.min(...mins) };
    }

    draw(shouldUpdate, coordsX, leftBoundIndex, rightBoundIndex) {
        let input = false;
        this.updateDT();

        let res1 = !!this.animate(this.axisYmax);
        let res2 = !!this.animate(this.axisYmin);
        input = !!res1 || !!res2 || input;

        this.items.forEach(item =>
            item.updateCoordsY(
                leftBoundIndex, rightBoundIndex,
                this.axisYmax.curV, this.axisYmin.curV)
        );

        input = this.items.reduce((accum, item) => {
            return item.draw(coordsX) || accum;
        }, false) || input;

        return input;
    }

}

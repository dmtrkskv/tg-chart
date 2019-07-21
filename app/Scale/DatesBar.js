export default class DatesBar {
    constructor(ctx, data, marginTop, width) {
        this.ctx = ctx;

        this.data = data;

        this.marginTop = marginTop;

        this.values = [];
        this.xIndexes = [];
        this.visibilities = [];
        this.visibility = 0.5;
        this.animStep = 0.05;

        this.appearance = false;

        this.prevScope = 0;
        this.zoomDir = 1;

        this.scopeK = Math.round(1 / (width / 50) * 100) / 100;
    }

    onResize(marginTop, width) {
        this.marginTop = marginTop;
        this.scopeK = Math.round(1 / (width / 50) * 100) / 100;
    }

    //можно считать остаток только при экстенде
    update(l, r, scope, dates, hoursMode = false) {
        let approximateStep = scope * this.scopeK,
            log = Math.log(approximateStep) / Math.log(2),
            wholeLog = Math.floor(log);
        let pow = wholeLog < 0 ? 0 : wholeLog;
        let step = Math.pow(2, pow) * 3;

        // console.log({ approximateStep: approximateStep, log: wholeLog, step: step });

        let bias = step - l % step;
        bias === step && (bias = 0);

        //скрывать ли смежные даты
        this.appearance = !Math.round(log - wholeLog);

        let zoomDir = Math.sign(scope - this.prevScope);
        if (zoomDir !== 0) {
            (this.zoomDir = zoomDir);
            this.prevScope = scope;
        }

        this.values = [];
        this.xIndexes = [];
        this.visibilities = [];

        for (let i = l + bias; i < r; i += step) {
            this.xIndexes.push(i);
            let curDate;
            if (hoursMode === true &&
                (
                    (step < 12 && this.appearance === false) ||
                    (step < 24 && this.appearance === true)
                )) {
                curDate = `${dates[i][4]}:${dates[i][5]}`;
            } else {
                curDate = dates[i][1] + " " + dates[i][2].slice(0, 3);
            }

            this.values.push(curDate);
            let frequency = 2;
            this.visibilities.push(!!(i % (step * frequency)));
        }
    }

    // имеется в виду прозрачность смежных элементов
    animateVisibilityOfOsculant() {
        if (this.zoomDir === -1) {
            if (this.appearance === true) {
                this.visibility = this.visibility >= 1 ? (this.visibility = 1) : this.visibility + this.animStep;
            } else {
                this.visibility = 0;
            }
        } else {
            if (this.appearance === false) {
                this.visibility = this.visibility <= 0 ? (this.visibility = 0) : this.visibility - this.animStep;
            } else {
                this.visibility = 1;
            }
        }
    }

    draw(coordsX, l) {
        //логично вызывать анимацию отсюда, 
        //потому что даже при отсутсвии update анимация должна продолжаться
        this.animateVisibilityOfOsculant();

        this.ctx.font = "15px Verdana";

        // let scope = this.values.length - 1;

        this.values.forEach((item, i) => {
            let ind = this.xIndexes[i];
            let x = coordsX[ind - l];

            // let labelWidth = item.length * 10; //улучшить  

            // let offset = (scope - i) / scope * labelWidth;

            this.ctx.fillStyle = this.visibilities[i] ? `${window.theme.XYAxis.slice(0, -3)}${this.visibility * .5})` : window.theme.XYAxis;
            this.ctx.fillText(item, x, this.marginTop);
        });

        return Number.isInteger(this.visibility) ? false : true;
    }


}






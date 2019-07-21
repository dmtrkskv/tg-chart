export default class Base {
    constructor(ctx, width, height, marginTop, data, drawPopup, deletePopup) {
        this.ctx = ctx;

        this.width = width;
        this.height = height;
        this.marginTop = marginTop;
        this.chartHeight = height + marginTop;

        this.data = data;

        this.drawPopup = drawPopup;
        this.deletePopup = deletePopup;

        this.items = [];
        this.amounts = [];

        this.isHightlight = false;
        this.animationHappens = false;

        this.axisYAnimationDuration = 200;

        this.axisYmax = {
            curV: 0,
            newV: null,
            lastSavedNewV: null,
            animBias: 0,
            animDuration: this.axisYAnimationDuration
        };

        this.axisYmin = {
            curV: 0,
            newV: null,
            lastSavedNewV: null,
            animBias: 0,
            animDuration: this.axisYAnimationDuration
        };

        this.lastTime = 0;

        this.checks = new Array(this.data.valuesY.length).fill(true);
    }


    onResize(width, height, marginTop) {
        this.width = width;
        this.height = height;
        this.marginTop = marginTop;
        this.chartHeight = height + marginTop;

        this.items.forEach(item => {
            item.width = width;
            item.height = height;
            item.marginTop = marginTop;
        });
    }

    //возвращает: 

    //если 0 - нет анимации
    //если 1 - инициация впервые
    //если 2 - иницация 
    //если 3 - идет анимация
    //если 4 - анимация окончена    

    animate(o) {
        let dif = o.newV - o.curV;

        if (dif !== 0) {

            if (o.lastSavedNewV === null) {
                o.lastSavedNewV = o.curV = o.newV;

                return 1;
            } else if (o.lastSavedNewV !== o.newV) {
                o.lastSavedNewV = o.newV;
                o.animBias = Math.round(100 * (dif / o.animDuration)) / 100;

                return 2;
            }

            let s = Math.round(100 * (o.curV + o.animBias * this.dt)) / 100;

            if ((dif > 0 && s < o.newV) || (dif < 0 && s > o.newV)) {
                o.curV = s;

                return 3;
            } else {
                o.curV = o.newV;

                return 4;
            }
        }
        return 0;
    }

    updateDT() {
        let now = Date.now();
        this.dt = now - this.lastTime;
        this.lastTime = now;
    }

    animateMarking() { }

    animateVisibility(index, state) {
        this.items[index].initVisibilityAnimation(state, this.axisYAnimationDuration);
        this.checks[index] = state;
    }

    unhighlight() {
        this.isHightlight = false;
    }

    prepareValue(value) {
        return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }

    drawVerticalLine() {
        let ctx = this.ctx;
        ctx.strokeStyle = window.theme.gridLines;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.focusX, 0);
        ctx.lineTo(this.focusX, this.chartHeight);
        ctx.stroke();
    }
}
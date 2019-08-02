import Item from "./Item/Pie.js";

export class Pie {
    constructor(ctx, width, height, marginTop, data,
        drawPopup) {
        this.ctx = ctx;

        this.width = width;
        this.height = height;
        this.marginTop = marginTop;

        this.data = data;

        this.drawPopup = drawPopup;

        this.radius = this.height / 2;

        this.centerX = this.width / 2;
        this.centerY = this.height / 2 + this.marginTop;

        this.animationDuration = 200;

        this.checks = new Array(this.data.valuesY.length).fill(true);

        this.items = [];
        data.valuesY.forEach((item, i) =>
            this.items.push(new Item(
                this.ctx,
                this.centerX, this.centerY, this.radius,
                data.colors[i]
            ))
        );

        this.total = 0;
        this.pieSlicesTotal = [];

        this.isHightlight = false;
        this.animationHappens = false;
    }

    onResize(width, height, marginTop) {
        this.height = height;
        this.marginTop = marginTop;
        this.width = width;

        this.radius = this.height / 2;

        this.centerX = this.width / 2;
        this.centerY = this.height / 2 + this.marginTop;

        this.items.forEach(item => {
            item.centerX0 = this.centerX;
            item.centerY0 = this.centerY;
            item.centerX = this.centerX;
            item.centerY = this.centerY;

            item.radius = this.radius;
            item.maxLabelSize = this.radius * 2 / 5;
        });

        this.draw(true);
    }


    updateVerticalBounds(leftBoundIndex, rightBoundIndex) {
        this.leftBoundIndex = leftBoundIndex;
        this.rightBoundIndex = rightBoundIndex;
    }

    checkEnteringTheCircle(x, y) {
        return (
            (x - this.centerX) * (x - this.centerX) +
            (y - this.centerY) * (y - this.centerY)
            <= this.radius * this.radius
        );
    }

    highlightItem(x, y) {
        this.focusX = x;
        this.focusY = y;

        if (this.checkEnteringTheCircle(x, y)) {
            this.isHightlight = true;

            let atan = Math.atan2((y - this.centerY), (x - this.centerX));
            atan < 0 && (atan += 2 * Math.PI);
            let dockets = new Array(this.items.length).fill({ name: "", value: "" });

            for (let i = 0; i < this.items.length; i++) {
                let item = this.items[i];

                if (atan > this.items[i].startAngle && atan < this.items[i].endAngle) {
                    dockets[i] = {
                        name: this.data.names[i],
                        value: this.prepareValue(this.items[i].value.toFixed()),
                    };

                    // let angle = item.startAngle - (item.startAngle - item.endAngle) / 2;
                    // let popupX = item.centerX + item.radius / 2 * Math.cos(angle);
                    // let popupY = item.centerY + item.radius / 2 * Math.sin(angle);

                    this.drawPopup(i, dockets);
                    let count = 0;
                    for (let i = 0; i < this.checks.length; ++i) {
                        if (this.checks[i] == true) count++;
                    }
                    count === 1 || item.initPushAnimation(true, this.animationDuration);
                } else {
                    item.initPushAnimation(false, this.animationDuration);
                }
            }
        } else {
            return false;
        }
    }


    prepareValue(value) {
        return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }

    unhighlight() {
        this.items.forEach(item => {
            item.initPushAnimation(false, this.animationDuration);
        });
        this.isHightlight = false;
    }

    animateVisibility(index, state) {
        this.items[index].initVisibilityAnimation(state, this.animationDuration);
        this.checks[index] = state;
        this.unhighlight();
    }

    //считать с учетом кусочка
    calcTotals() {
        this.pieSlicesTotal = [];

        for (let i = 0; i < this.data.valuesY.length; i++) {
            let slicesValuesYItem = this.data.valuesY[i].slice(
                this.leftBoundIndex, this.rightBoundIndex + 1
            );

            let sum = 0;
            for (let j = 0; j < slicesValuesYItem.length; j++) {
                sum += slicesValuesYItem[j] *
                    this.items[i].visibility;
            }

            this.pieSlicesTotal[i] = Math.floor(sum / this.data.freq);
        }

        return this.calcSumInArray(this.pieSlicesTotal);
    }

    calcSumInArray(array) {
        return array.reduce((accum, item) => {
            return (accum += item);
        }, 0);
    }

    draw(shouldUpdate) {
        if (shouldUpdate) {
            let total = this.calcTotals();
            this.items.reduce((startAngle, item, i) => 
                item.update(startAngle, this.pieSlicesTotal[i], total),
                0);
        }

        return this.items.reduce((accum, item) => {
            return item.draw() || accum;
        }, false);
    }

}

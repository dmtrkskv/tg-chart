export default class Checks {
    constructor(parentHTML, data, onChange) {
        this.parentHTML = parentHTML;

        this.html = parentHTML.appendChild(document.createElement("div"));
        this.html.className = "check";

        this.items = [];
        data.names.forEach((name, i) => {
            this.items.push(new CheckBox(
                this.html, data.colors[i], name, i,
                onChange
            ));
        });
        setTimeout(() =>
            this.items.forEach(item => {
                item.html.style.opacity = 1;
                item.html.style.transform = "perspective(10px) translateZ(0)";
            }), 0);

        this.events = ('ontouchstart' in window) ?
            {
                down: "ontouchstart",
                up: "ontouchend",
            } :
            {
                down: "onmousedown",
                up: "onmouseup",
            };

        this.html[this.events.down] = this.handleBehaviour.bind(this);
    }

    handleBehaviour(e) {
        let target = e.target;
        if (target === this.html) return;
        while (!target.classList.contains("checkBox")) {
            target = target.parentNode;
        }
        let index = +target.getAttribute("id");

        let t = setTimeout(() => {
            this.html[this.events.up] = null;
            this.delegateGroup(index);
        }, 500);

        this.html[this.events.up] = () => {
            clearTimeout(t);
            this.delegate(index);
            this.html[this.events.up] = null;
        }
    }

    delegateGroup(index) {
        if (this.isOneActive(index)) {
            this.items.forEach(item => item.react(true));
        } else {
            this.items.forEach((item, i) => {
                if (index === i) {
                    item.react(true);
                } else {
                    item.react(false);
                }
            });
        }
    }

    delegate(index) {
        if (this.isOneActive(index)) {
            this.items[index].shake();
            return;
        }

        let newState = !this.items[index].state;
        this.items[index].react(newState);
    }

    isOneActive(index) {
        let sum;
        sum = [].reduce.call(this.html.childNodes, (accum, item, i) => {
            return index === i ? accum : accum += +item.dataset.isActive;
        }, 0);
        return sum === 0;
    }

    clear() {
        this.items.forEach(item => {
            item.html.style.opacity = 0;
            item.html.style.transform = "perspective(10px) translateZ(-10px)";
        });
        setTimeout(() => this.html.remove(), 200);
    }
}


class CheckBox {
    constructor(parentHTML, color, name, index, onChange) {
        this.name = name;
        this.color = color;

        this.parentHTML = parentHTML;

        this.buildHTML(index);

        this.state = true;

        this.index = index;
        this.onChange = onChange;

        this.html.dataset.isActive = 1;
    }

    shake() {
        let c = this.html.classList;
        if (c.contains("shakingBlock")) return;
        c.add("shakingBlock");
        setTimeout(() => c.remove("shakingBlock"), 800);
    }

    react(state) {
        this.html.dataset.isActive = +state;
        this.state = state;
        this.onChange(this.index, state);
        this.reDraw(state);
    }

    reDraw(state) {
        if (state) {
            this.html.style.background = this.color;
            this.label.style.color = "white";
            this.stateMarkHTML.style.transform = "scale(1)";
        } else {
            this.html.style.background = "rgba(0,0,0,0)"
            this.label.style.color = this.color;
            this.stateMarkHTML.style.transform = "scale(0)";
        }
    }

    buildHTML(id) {
        let parentHTML = this.parentHTML;
        this.html = parentHTML.appendChild(document.createElement("div"));
        let h = this.html;
        h.className = "checkBox";
        h.style.background = this.color;
        h.style.borderColor = this.color;
        h.id = id;

        this.stateMarkHTML = h.appendChild(document.createElementNS('http://www.w3.org/2000/svg', "svg"));
        let a = this.stateMarkHTML;
        a.setAttribute("viewBox", "0 0 46 46");
        a.setAttribute("class", "checkMark");
        let path = a.appendChild(document.createElementNS('http://www.w3.org/2000/svg', "path"));
        path.setAttribute("d",
            "M20.687,38.332c-2.072,2.072-5.434,2.072-7.505,0L1.554,26.704c-2.072-2.071-2.072-5.433,0-7.504    c2.071-2.072,5.433-2.072,7.505,0l6.928,6.927c0.523,0.522,1.372,0.522,1.896,0L36.642,7.368c2.071-2.072,5.433-2.072,7.505,0    c0.995,0.995,1.554,2.345,1.554,3.752c0,1.407-0.559,2.757-1.554,3.752L20.687,38.332z"
        );

        this.label = h.appendChild(document.createElement("div"));
        this.label.textContent = this.name;
        this.label.className = "checkLabel";

    }

}
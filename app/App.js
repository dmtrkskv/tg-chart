import Box from "./Box.js";
import themes from "./themes.js";

let requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame
window.requestAnimationFrame = requestAnimationFrame;

let pairs = [
    [["lines", "lines"], ["lines", "lines"]],
    [["lines2Y", "lines2Y"], ["lines2Y", "lines2Y"]],
    [["stacked", "stacked"], ["stacked", "stacked"]],
    [["daily", "daily"], ["lines", null]],
    [["percentage", "percentage"], ["pie", "percentage"]],
];

export default class App {
    constructor(appId) {
        this.isDesktop = !('ontouchstart' in window);

        this.html = document.getElementById(appId);
        this.html.setAttribute("id", "app");

        this.boxesWrapper = this.html.appendChild(document.createElement("div"));
        this.boxesWrapper.className = "boxesWrapper";

        this.boxes = [];

        for (let i = 0; i < pairs.length; i++) {
            this.boxes.push(new Box(this.boxesWrapper, "#" + (i + 1), pairs[i], i + 1));
        }

        this.themeSwitcherHTML = this.html.appendChild(document.createElement("div"));
        this.themeSwitcherHTML.className = "themeSwitcher";

        this.theme = "night";
        this.switchTheme();
        this.themeSwitcherHTML.onclick = this.switchTheme.bind(this);

        let resizeEvent = this.isDesktop ? "onresize" : "onorientationchange";
        window[resizeEvent] = this.handleResize.bind(this);
    }

    switchTheme() {
        if (this.theme === "day") {
            this.theme = "night";
        } else {
            this.theme = "day";
        }

        switch (this.theme) {
            case "day":
                this.themeSwitcherHTML.textContent = "Switch to Night Mode";
                window.theme = themes.day;
                break;
            case "night":
                this.themeSwitcherHTML.textContent = "Switch to Day Mode";
                window.theme = themes.night;
                break;
        }
        window.themeType = this.theme;

        this.boxes.forEach(item => item.setTheme());
        document.body.style.background = window.theme.background;
    }

    handleResize() {
        if (!this.isDesktop) {
            setTimeout(update.bind(this), 200);
        } else {
            update.call(this);
        }

        function update() {
            this.boxes.forEach(item => item.onResize());
        }
    }

}
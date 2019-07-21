export default class UpperListener {
    constructor(canvasHTML, sendCoords, onZoom) {
        this.canvasHTML = canvasHTML;

        this.sendCoords = sendCoords;
        this.onZoom = onZoom;

        let parent = canvasHTML.parentNode;
        this.areaHTML = parent.querySelector(".tooltipArea");

        this.onResize();

        this.isDesktop = !('ontouchstart' in window);
        this.zoomEvent = this.isDesktop ? "onclick" : "ontouchstart";
        let focusEvent = this.isDesktop ? "onmouseenter" : "onclick";

        this.areaHTML[focusEvent] = this.onFocus.bind(this);
    }

    onFocus(e) {
        this.sendCoords(e.offsetX, e.offsetY);
        this.areaHTML.onmousemove = e => this.sendCoords(e.offsetX, e.offsetY);
        this.areaHTML[this.zoomEvent] = () => {
            if (this.isDesktop) {
                this.onZoom();
            } else {
                let id = setTimeout(this.onZoom, 500);
                this.areaHTML.ontouchend = () => {
                    clearTimeout(id);
                    this.areaHTML.ontouchend = null;
                }
            }
        }

        this.areaHTML.onmouseleave = () => {
            this.sendCoords();
            this.areaHTML.onmousemove = this.areaHTML[this.zoomEvent] = null;
        };
    }

    onResize() {
        let top = this.canvasHTML.style.top,
            height = this.canvasHTML.offsetHeight,
            width = this.canvasHTML.offsetWidth;

        this.areaHTML.style.top = top;
        this.areaHTML.style.height = height;
        this.areaHTML.style.width = width;

    }
}
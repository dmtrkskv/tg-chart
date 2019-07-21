//{color: ..., opacity:... }
//getTransparentColor(...) -> hexDec(...)
let themes = {
    day: {
        background: "white",
        sliderMask: "rgba(226, 238, 249, .6)",
        tumbler: "rgb(192, 209, 225)",
        tooltip: "white",
        tooltipText: "black",
        gridLines: "rgba(24, 45, 59, .1)",
        zoomOutText: "rgb(16, 139, 227)",
        XYAxis: "rgba(37, 37, 41, .5)",
        highlightMask: "rgba(255, 255, 255, .5)",
        text: "black",
    },
    night: {
        background: "rgb(36, 47, 62)",
        sliderMask: "rgba(48, 66, 89, .6)",
        tumbler: "rgb(86, 98, 109)",
        tooltip: "rgb(28, 37, 51)",
        tooltipText: "white",
        gridLines: "rgba(255, 255, 255, .1)",
        zoomOutText: "rgb(72, 170, 240)",
        XYAxis: "rgba(236, 242, 248, .5)",
        highlightMask: "rgba(36, 47, 62, .5)",
        text: "white",
    }
}

export default themes;
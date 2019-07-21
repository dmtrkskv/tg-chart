export function getDataFromJSON(json) {
    //координаты в куче
    let columns = json.columns;
    //массив значений Y
    let valuesY = columns.map(item => item.slice(1)).slice(1);
    //массив timestamp дат
    let dates = columns[0].slice(1);

    let colors = Object.values(json.colors);
    let names = Object.values(json.names);
    let valuesNumber = valuesY[0].length;

    return {
        valuesY: valuesY,
        dates: dates,
        colors: colors,
        names: names,
        valuesNumber: valuesNumber,
        linesNumber: valuesNumber - 1
    };
}

export function sliceData(data, l, r) {
    let d = Object.assign({}, data);
    d.valuesY = d.valuesY.map(item => item.slice(l, r + 1));
    d.dates = d.dates.slice(l, r + 1);
    d.valuesNumber = r - l + 1;
    d.linesNumber = d.valuesNumber - 1;
    return d;
}
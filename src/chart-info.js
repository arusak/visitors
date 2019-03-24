export class ChartInfo {
    constructor(chartData, key) {
        this.dots = chartData.columns.find(col => col[0] === key);
        this.dots.shift();
        this.title = chartData.names[key];
        this.color = chartData.colors[key];
    }
}
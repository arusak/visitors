export class ChartInfo {
    constructor(chartData, key) {
        this.dots = chartData.columns.find(col => col[0] === key).slice(1);
        this.title = chartData.names[key];
        this.color = chartData.colors[key];
    }
}
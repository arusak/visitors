import {Line} from './line.js';
import {ChartInfo} from './chart-info.js';
import {YAxis} from './y-axis.js';
import {XAxis} from './x-axis.js';
import {Minimap} from './minimap.js';

export class ChartController {
    constructor() {
        this.loadData().then(data => {
            this.initCharts(data[4]);
            this.update();
        });
    }

    loadData() {
        return fetch('https://rusak.me/tg/chart_data.json', {
            method: 'GET',
        }).catch(err => {
            console.error('Error loading chart data');
            console.error(err);
        }).then(response => {
            return response && response.json();
        });
    }

    initCharts(chartData) {
        let dotCount = chartData.columns[0].length;

        this.start = dotCount > 40 ? dotCount - 30 : 0;
        this.end = dotCount - 1;

        this.kx = 1;
        this.ky = 1;

        let chartsInfo = this.getChartsInfo(chartData);
        this.lines = chartsInfo.map(info => new Line(info));
        this.xAxis = new XAxis(this.getXAxisData(chartData));
        this.yAxis = new YAxis();
        this.minimap = new Minimap(chartsInfo, this.start, this.end);
    }

    update() {
        this.lines.forEach(line => line.draw(this.kx, this.ky, this.start, this.end))
    }

    getChartsInfo(chartData) {
        return Object.keys(chartData.types)
            .filter(key => chartData.types[key] === 'line')
            .map(key => new ChartInfo(chartData, key));
    }

    getXAxisData(chartData) {
        let key = Object.keys(chartData.types)
            .find(key => chartData.types[key] === 'x');

        return chartData.columns.find(col => col[0] === key).slice(1);
    }
}
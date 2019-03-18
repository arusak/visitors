import {Line} from './line.js';
import {ChartInfo} from './chart-info.js';
import {YAxis} from './y-axis.js';
import {XAxis} from './x-axis.js';
import {Minimap} from './minimap.js';
import {ButtonsController} from './buttons.controller.js';

const $dataSet = 4;
const $defaultSlice = 100;
const $width = 600;
const $height = 400;

export class ChartController {
    constructor() {
        this.width = $width;
        this.height = $height;
        this.container = document.getElementById('charts');
        this.container.style.width = this.width + 'px';
        this.container.style.height = this.height + 'px';

        this.loadData().then(data => {
            this.initCharts(data[$dataSet]);
            this.render();
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

        this.start = dotCount > $defaultSlice + 20 ? dotCount - $defaultSlice - 1 : 0;
        this.end = dotCount - 1;

        this.chartsInfo = this.getChartsInfo(chartData);
        this.lines = this.chartsInfo.map(info => new Line(info, this.container));
        new ButtonsController(this);

        this.kx = this.getKx();
        this.ky = this.getKy();

        this.xAxis = new XAxis(document.getElementById('x-axis'), $width, this.getXAxisData(chartData));
        this.yAxis = new YAxis(document.getElementById('y-axis'), $height);

        this.minimap = new Minimap(this.container, this.chartsInfo, this.start, this.end, this.updateStart.bind(this), this.updateEnd.bind(this));

        this.render();
    }

    render() {
        // console.log(`[${this.start}, ${this.end}]`);
        this.lines.forEach(line => {
            line.erase();
            line.render(this.kx, this.ky, this.start, this.end);
        });
        this.xAxis.render(this.start, this.end, this.kx);
        this.yAxis.render(this.maxY);
    }

    getChartsInfo(chartData) {
        return Object.keys(chartData.types)
            .filter(key => chartData.types[key] === 'line')
            .map(key => new ChartInfo(chartData, key, this.width, this.height));
    }

    getXAxisData(chartData) {
        let key = Object.keys(chartData.types)
            .find(key => chartData.types[key] === 'x');

        return chartData.columns.find(col => col[0] === key).slice(1);
    }

    getKx() {
        return this.width / (this.end - this.start);
    }

    getKy() {
        // might use for loop or other tech to optimize memory usage

        let maxValues = this.chartsInfo.map(line => {
            let piece = line.dots.slice(this.start, this.end);
            return Math.max(...piece);
        });
        this.maxY = Math.max(...maxValues);

        return this.height / this.maxY;
    }

    updateStart(start) {
        this.start = +start;
        // this.end = this.start + $defaultSlice - 1;
        this.kx = this.getKx();
        this.ky = this.getKy();
        this.render();
    }

    updateEnd(end) {
        this.end = +end;
        this.kx = this.getKx();
        this.ky = this.getKy();
        this.render();
    }

    showLine(idx) {
        this.lines[idx].show();
        this.lines[idx].render(this.kx, this.ky, this.start, this.end);
    }

    hideLine(idx) {
        this.lines[idx].hide();
    }
}
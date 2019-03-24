import {Line} from './line.js';
import {ChartInfo} from './chart-info.js';
import {YAxis} from './y-axis.js';
import {XAxis} from './x-axis.js';
import {Slider} from './slider.js';
import {ButtonsController} from './buttons.controller.js';
import {Mark} from './mark.js';
import {Minimap} from './minimap.js';

const $dataSet = 4;
const $defaultSlice = 100;
const $width = 600;
const $height = 400;
const $miniMapHeight = 100;
const $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
        return fetch('./tg/chart_data.json', {
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
        this.lines = this.chartsInfo.map(info => new Line(info, this.container, this.width, this.height, 2));
        new ButtonsController(this);

        this.kx = this.getKx();
        this.ky = this.getKy(this.height);

        let dates = this.getXAxisData(chartData);
        this.xAxis = new XAxis(document.getElementById('x-axis'), $width, dates);
        this.yAxis = new YAxis(document.getElementById('y-axis'), $height);

        new Slider(this.width, this.chartsInfo, this.start, this.end, this.update.bind(this));
        this.minimap = new Minimap(this.chartsInfo, this.width, 100);

        this.mark = new Mark(this.lines, this.width, this.height, dates);

        this.render();
    }

    render() {
        this.ky = this.getKy(this.height);

        this.lines.filter(line => !line.hidden)
            .forEach(line => {
                line.erase();
                line.render(this.kx, this.ky, this.start, this.end);
            });

        this.minimap.render(this.getKy($miniMapHeight));
        this.mark.erase();
        this.xAxis.render(this.start, this.end, this.kx);
        this.yAxis.render(this.maxY, this.ky);
    }

    getChartsInfo(chartData) {
        return Object.keys(chartData.types)
            .filter(key => chartData.types[key] === 'line')
            .map(key => new ChartInfo(chartData, key));
    }

    getXAxisData(chartData) {
        let key = Object.keys(chartData.types)
            .find(key => chartData.types[key] === 'x');

        return chartData.columns.find(col => col[0] === key).slice(1).map(formatDate);
    }

    getKx() {
        return this.width / (this.end - this.start);
    }

    getKy(height) {
        // might use for loop or other tech to optimize memory usage

        let maxValues = this.chartsInfo.filter(chart => !chart.hidden)
            .map(chartData => {
                let piece = chartData.dots.slice(this.start, this.end);
                return Math.max(...piece);
            });

        this.maxY = Math.max(...maxValues);

        return height / this.maxY;
    }

    update({start, end}) {
        this.start = start;
        this.end = end;

        this.kx = this.getKx();
        this.ky = this.getKy(this.height);

        this.render();
    }

    showLine(idx) {
        this.chartsInfo[idx].hidden = false;
        this.lines[idx].updateVisibility();
        this.render();
    }

    hideLine(idx) {
        this.chartsInfo[idx].hidden = true;
        this.lines[idx].updateVisibility();
        this.render();
    }
}

function formatDate(timestamp) {
    let date = new Date(timestamp);
    return `${$months[date.getMonth()]} ${date.getDate()}`;
}
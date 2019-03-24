import {Line} from './line.js';

export class Minimap {
    constructor(chartsData, width, height) {
        let container = document.getElementById('minimap');
        container.style.width = width + 'px';
        container.style.height = height + 'px';
        this.width = width;
        this.height = height;
        this.chartsData = chartsData;

        this.end = chartsData[0].dots.length;

        this.lines = [];

        chartsData.forEach(chart => {
            let line = new Line(chart, container, width, height, 1.25);
            this.lines.push(line);
        });
    }

    render() {
        let ky = this.getKy();
        this.lines.forEach(line => {
            line.updateVisibility();
            if (!line.hidden) {
                line.erase();
                line.render(this.width / this.end, ky, 0, this.end);
            }
        });
    }

    getKy(height) {
        // might use for loop or other tech to optimize memory usage

        let maxValues = this.chartsData.filter(chart => !chart.hidden)
            .map(chartData => {
                let piece = chartData.dots.slice(this.start, this.end);
                return Math.max(...piece);
            });

        this.maxY = Math.max(...maxValues);

        return this.height / this.maxY;
    }
}
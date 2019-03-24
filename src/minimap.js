import {Line} from './line.js';

export class Minimap {
    constructor(chartsData, width, height) {
        let container = document.getElementById('minimap');
        container.style.width = width + 'px';
        container.style.height = height + 'px';
        this.width = width;
        this.height = height;

        this.end = chartsData[0].dots.length;

        this.lines = [];

        chartsData.forEach(chart => {
            let line = new Line(chart, container, width, height, 1.25);
            this.lines.push(line);
        });
    }

    render(ky) {
        this.lines.forEach(line => {
            line.updateVisibility();
            if (!line.hidden) {
                line.erase();
                line.render(this.width / this.end, ky, 0, this.end);
            }
        });
    }
}
export class Line {
    constructor(chartData, container, width, height) {
        this.chartData = chartData;
        this.width = width;
        this.height = height;

        let canvas = Object.assign(document.createElement('canvas'), {width, height});
        container.append(canvas);
        this.ctx = canvas.getContext('2d');

    }

    render(kx, ky, start, end) {
        if (this.hidden) return;

        // console.log(' ');

        function log(i) {
            // console.log(`${start + i}, ${this.dots[i]} -> ${this.calcX(i, kx)}, ${this.calcY(i, start, ky)}`);
        }

        this.pixelsX = [];
        this.pixelsY = [];

        this.ctx.beginPath();
        this.ctx.moveTo(0, this.calcY(0, start, ky));
        log(0);
        for (let i = 1; i < end - start; i++) {
            let x = Math.round(i * kx);
            let y = this.calcY(i, start, ky);
            this.ctx.lineTo(x, y);
            this.pixelsX[i] = x;
            this.pixelsY[i] = y;
            log(i);
        }
        this.ctx.strokeStyle = this.chartData.color;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }


    erase() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    calcY(i, start, ky) {
        return Math.trunc(this.height - this.chartData.dots[i + start] * ky) + 0.5;
    }

    show() {
        this.ctx.canvas.classList.remove('hidden');
        this.hidden = false;
    }

    hide() {
        this.ctx.canvas.classList.add('hidden');
        this.hidden = true;
    }
}
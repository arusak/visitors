export class Line {
    constructor(info, container) {
        this.container = container;
        this.info = info;
        this.dots = info.dots;
        this.ctx = this.createContext(info.width, info.height, container);
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
            let x = this.calcX(i, kx);
            let y = this.calcY(i, start, ky);
            this.ctx.lineTo(x, y);
            this.pixelsX[i] = x;
            this.pixelsY[i] = y;
            log(i);
        }
        this.ctx.strokeStyle = this.info.color;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }


    erase() {
        this.ctx.clearRect(0, 0, this.info.width, this.info.height);
    }

    calcX(i, kx) {
        return Math.round(i * kx);
    }

    calcY(i, start, ky) {
        return Math.trunc(this.info.height - this.dots[i + start] * ky) + 0.5;
    }

    show() {
        this.ctx.canvas.classList.remove('hidden');
        this.hidden = false;
    }

    hide() {
        this.ctx.canvas.classList.add('hidden');
        this.hidden = true;
    }

    createContext(width, height, container) {
        let canvas = Object.assign(document.createElement('canvas'), {width, height});
        container.append(canvas);
        return canvas.getContext('2d');
    }
}
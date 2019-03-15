export class Line {
    constructor(info, container) {
        this.info = info;
        this.dots = info.dots;
        this.ctx = this.createContext(info.width, info.height, container);
    }

    draw(kx, ky, start, end) {
        let that = this;

        function log(i) {
            // console.log(`${start + i}, ${that.dots[i]} -> ${that.calcX(i, kx)}, ${that.calcY(i, start, ky)}`);
        }

        console.log(' ');
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.calcY(0, start, ky));
        log(0);
        for (let i = 1; i < end - start; i++) {
            this.ctx.lineTo(this.calcX(i, kx), this.calcY(i, start, ky));
            log(i);
        }
        this.ctx.strokeStyle = this.info.color;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }


    erase() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    calcX(i, kx) {
        return Math.round(i * kx);
    }

    calcY(i, start, ky) {
        return Math.trunc(this.info.height - this.dots[i + start] * ky) + 0.5;
    }

    show() {

    }

    hide() {

    }

    createContext(width, height, container) {
        let canvas = Object.assign(document.createElement('canvas'), {width, height});
        container.append(canvas);
        return canvas.getContext('2d');
    }
}
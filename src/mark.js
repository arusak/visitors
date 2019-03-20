const $radius = 6;
const $circleStrokeWidth = 4;

export class Mark {
    constructor(lines, width, height) {
        this.width = width;
        this.height = height;
        this.ctx = this.initCanvas(width, height);
        this.lines = lines;
        this.rulerColor = '#dfe6eb';
    }

    render(mouseX) {
        let visibleLines = this.lines.filter(line => !line.hidden);
        if (visibleLines.length === 0) return;

        this.erase();

        let idx = Math.round((mouseX * visibleLines[0].pixelsX.length) / this.width);
        let x = visibleLines[0].pixelsX[idx];

        this.drawRuler(x);

        visibleLines.forEach(line => {
            this.drawCircle(x, line.pixelsY[idx], line.info.color);
        });
    }

    erase() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    drawCircle(x, y, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, $radius, 0, 2 * Math.PI);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = $circleStrokeWidth;
        this.ctx.stroke();
        this.ctx.fill();
    }

    drawRuler(x) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0.5);
        this.ctx.lineTo(x, this.height - 0.5);
        this.ctx.strokeStyle = this.rulerColor;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    initCanvas(width, height) {
        let canvas = Object.assign(document.createElement('canvas'), {width, height});
        canvas.addEventListener('mousemove', evt => this.render(evt.clientX));
        canvas.addEventListener('mouseout', () => this.erase());
        canvas.addEventListener('click', evt => this.render(evt.clientX));

        document.body.addEventListener('visualModeChange', () => {
            let night = document.body.classList.contains('night');
            this.ctx.fillStyle = night ? '#242f3e' : 'white';
            this.rulerColor = night ? '#3b4a5a' : '#dfe6eb'
        });

        document.getElementById('mark').append(canvas);

        return Object.assign(canvas.getContext('2d'), {lineWidth: $circleStrokeWidth, fillStyle: 'white'});
    }
}


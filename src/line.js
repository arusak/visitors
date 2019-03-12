export class Line {
    constructor(info) {
        this.info = info;
        this.dots = info.dots;
    }

    draw(kx, ky, start, end) {
        this.start = start;
        this.end = end;

        console.log(this.info.title, this.info.color);
        console.log(this.dots.slice(start, end));
    }

    show() {

    }

    hide() {

    }
}
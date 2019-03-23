const $limit = 5;
const $round = 10;

export class YAxis {

    constructor(container, height) {
        this.container = container;
        this.height = height;
        this.container.style.height = height + 'px';

        this.ticks = [];
        for (let i = 0; i <= $limit; i++) {
            this.ticks[i] = document.createElement('span');
            this.container.appendChild(this.ticks[i]);
        }
    }

    render(max, ky) {
        let p = price(max);
        let gap = Math.round(p * ky);

        for (let i = 0; i <= $limit; i++) {
            let tick = this.ticks[i];
            tick.innerText = i * p;
            tick.style.top = Math.round(this.height - (i * gap)) + 'px';
        }
    }
}

function base(number) {
    return Math.pow($round, Math.trunc(Math.log10(number) / Math.log10($round)));
}

function div(number, divider) {
    return Math.round(number / divider);
}

function price(max) {
    let frac = max / $limit;
    let B = base(frac);
    // console.log('max:', max, 'frac:', frac, 'B:', B, '(frac div B):', div(frac, B));
    return div(frac, B) * B;
}


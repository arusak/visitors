const $limit = 5;
const $round = 10;

export class YAxis {

    constructor(container, height) {
        this.container = container;
        this.height = height;
        this.container.style.height = height + 'px';
    }

    render(max, ky) {
        this.container.innerText = '';

        //todo gotta use rounded numbers here
        let p = price(max);
        let gap = Math.round(p * ky);
        let ticks = [];
        for (let i = 0; i <= $limit; i++) {
            let tick = Object.assign(document.createElement('span'), {innerText: i * p});
            tick.style.top = this.height - (i * gap) + 'px';
            ticks[i] = tick;
            this.container.appendChild(tick);

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
    console.log('max:', max, 'frac:', frac, 'B:', B, '(frac div B):', div(frac, B));
    return div(frac, B) * B;
}


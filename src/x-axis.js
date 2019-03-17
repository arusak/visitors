const $tickCount = 5;
const $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export class XAxis {
    constructor(container, width, xDots) {
        this.xDots = xDots.map(formatDate);
        this.container = container;
        this.container.style.width = width + 'px';
    }

    // fixme heavily unoptimized (move if already rendered and maybe cache)
    render(start, end, kx) {
        this.container.innerText = '';

        // todo is this korrekt?
        let gapTicks = Math.trunc((end - start) / ($tickCount + 1));
        let gapPx = gapTicks * kx;
        let ticks = [];
        for (let i = 0; i < $tickCount + 1; i++) {
            let tick = Object.assign(document.createElement('span'), {innerText: this.xDots[start + i * gapTicks]});
            tick.style.left = i * gapPx + 'px';
            ticks[i] = tick;
            this.container.appendChild(tick);
        }
    }
}

function formatDate(timestamp) {
    let date = new Date(timestamp);
    return `${$months[date.getMonth()]} ${date.getDate()}`;
}
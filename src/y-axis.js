const $ticksCount = 10;

export class YAxis {

    constructor(container, height) {
        this.container = container;
        this.height = height;
        this.container.style.height = height + 'px';
    }

    render(max) {
        this.container.innerText = '';

        //todo gotta use rounded numbers here
        let gapTicks = Math.round(max / $ticksCount);
        let gapPx = Math.round(this.height / $ticksCount);
        let ticks = [];
        for (let i = 0; i < $ticksCount; i++) {
            let tick = Object.assign(document.createElement('span'), {innerText: i * gapTicks});
            tick.style.top = this.height - (i * gapPx) + 'px';
            ticks[i] = tick;
            this.container.appendChild(tick);

        }
    }
}
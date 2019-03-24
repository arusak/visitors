const $maxTickWidth = 100;

export class XAxis {
    constructor(container, width, xDots) {
        this.container = container;
        this.container.style.width = width + 'px';

        this.prerender(xDots);
    }

    prerender(dots) {
        this.wrapper = Object.assign(document.createElement('div'), {className: 'wrapper'});
        this.ticks = dots.map(dot => Object.assign(document.createElement('span'), {innerText: dot}));
        this.visibility = [];

        this.ticks.forEach((tick, idx) => {
            tick.style.opacity = '0';
            // tick.style.left = idx * 100 + 'px';
            this.wrapper.appendChild(tick);
            // invisible at the beginning
            this.visibility[idx] = false;
        });

        this.container.append(this.wrapper);
    }

    render(start, end, kx) {
        //this.wrapper.style.left = -1 * start * kx + 'px';
        let n = Math.trunc($maxTickWidth / kx);
        for (let i = 0; i < this.visibility.length; i++) {
            let newVisibility = i % n === 0;
            let oldVisibility = this.visibility[i];
            // if (newVisibility !== oldVisibility) {
            this.updateTickVisibility(i, newVisibility, kx);
            // }
        }

        this.wrapper.style.left = -kx * start + 'px';
    }

    updateTickVisibility(idx, visible, kx) {
        this.ticks[idx].style.opacity = visible ? '1' : '0';
        if (visible) {
            this.ticks[idx].style.left = Math.trunc(kx * idx) + 'px';
        }
    }
}

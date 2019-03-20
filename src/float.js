const $shift = 30;

export class Float {
    constructor(width) {
        this.width = width;
        this.view = document.getElementById('float');
        this.visible = false;
    }

    render(left, date, values) {
        let str = `${date}<br>`;

        values.forEach(v => str += `${v}<br>`);
        this.view.innerHTML = str;

        this.view.style.left = left + 'px';

        if (left < this.width / 2) {
            this.view.style.transform = `translateX(-${$shift}px)`
        } else {
            this.view.style.transform = `translateX(${-Math.round(this.view.clientWidth) + $shift}px)`
            // this.view.style.left = left - this.view.clientWidth + 30 + 'px';
        }

        if (!this.visible) {
            this.visible = true;
            this.view.style.opacity = '1';
        }
    }

    hide() {
        if (this.visible) {
            this.visible = false;
            this.view.style.opacity = '0';
        }
    }
}
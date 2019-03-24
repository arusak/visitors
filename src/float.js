const $shift = 30;

export class Float {
    constructor(lines, width) {
        this.width = width;
        this.lines = lines;
        this.view = document.getElementById('float');
        this.visible = false;
    }

    render(left, date, values) {
        let str = `<span class="date">${date}</span>`;

        values.forEach((v, i) => str += `
            <span class="chart" style="color: ${this.lines[i].chartData.color}">
                <span class="value">${v}</span><br>
                <span class="title">${this.lines[i].chartData.title}</span>
            </span>
        `);
        this.view.innerHTML = str;


        if (left < this.width / 2) {
            this.view.style.left = left + $shift + 'px';
            // this.view.style.transform = `translateX(${$shift}px)`
        } else {
            this.view.style.left = left - Math.round(this.view.clientWidth + $shift) + 'px';
            // this.view.style.transform = `translateX(-${Math.round(this.view.clientWidth + $shift)}px)`
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
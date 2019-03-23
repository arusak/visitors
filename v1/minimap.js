const $minWindow = 10;

export class Minimap {
    constructor(container, lines, start, end, onStartChange, onEndChange) {
        this.container = container;
        this.lines = lines;
        this.startValue = start;
        this.endValue = end;

        this.render();

        this.initSlider('start', start, slider => {
            let value = +slider.value;
            if (value <= this.endValue - $minWindow) {
                this.startValue = value;
                onStartChange(value);
            } else {
                slider.value = this.startValue
            }
        });

        this.initSlider('end', end, slider => {
            let value = +slider.value;
            if (value >= this.startValue + $minWindow) {
                this.endValue = value;
                onEndChange(value);
            } else {
                slider.value = this.endValue;
            }
        });
    }

    initSlider(id, value, onChange) {
        let slider = document.getElementById(id);
        slider.min = 0;
        slider.max = this.lines[0].dots.length - 1;
        slider.step = 1;
        slider.value = value;

        slider.addEventListener('change', () => onChange(slider));

        return slider;
    }

    render() {
        // let canvas = Object.assign(document.createElement('canvas'), {width, height});
        // let ctx = canvas.getContext('2d');

        // this.container.append(canvas);
    }
}
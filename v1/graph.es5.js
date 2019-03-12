const buildGraph = (function () {
    let data;
    const $height = 300;
    const $width = 600;
    const $colors = ['#00b400', '#ce0000', '#0000d4', '#00bbcc', '#bbbb00', '#bb0bb'];
    const $tickColor = '#eee';
    const $axisColor = '#ddd';
    const $xMargin = 40;
    const $yMargin = 40;

    let float;

    function main(par) {
        data = par;

        createButtons(data);

        const [xCtx, yCtx, dotsCtx, markCtx] = init();

        // dotsCtx.canvas.style.top = `-${$yMargin}px`;
        // dotsCtx.canvas.style.left = `${$xMargin}px`;

        for (let i = 0; i < data.length; i++) {
            drawStatic(dotsCtx, data[i].days, $colors[i]);
        }

        setupTracking(markCtx, data);

        yCtx.font = '12px sans-serif';
        drawYTicks(yCtx, data);

        xCtx.fillStyle = '#999';
        xCtx.font = '10px sans-serif';
        drawXTicks(xCtx, data[0].days);
    }

    function drawStatic(ctx, dots, color) {
        let interval = Math.floor(ctx.canvas.width / dots.length);
        ctx.beginPath();
        ctx.moveTo(0, $height - dots[0].value + 0.5);
        for (let i = 1; i < dots.length - 1; i++) {
            ctx.lineTo(i * interval, $height - dots[i].value + 0.5);
            //console.log(`lineTo ${i * interval}, ${dots[i].value}`);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function drawYTicks(ctx) {
        const yTicksNumber = 5;
        let interval = Math.round($height / yTicksNumber);
        for (let i = 0; i < yTicksNumber; i++) {
            let y = $height - i * interval + 0.5;
            ctx.moveTo(0, y);
            ctx.lineTo($width, y);
            ctx.strokeStyle = i === 0 ? $axisColor : $tickColor;
            ctx.stroke();

            ctx.fillStyle = '#999';
            ctx.fillText(i * interval, 0, y - 5);
        }
    }

    function drawXTicks(ctx, dots) {
        const $maxXTickWidth = 50;
        let xTicksNumber = $width / $maxXTickWidth;
        let interval = Math.floor(dots.length / xTicksNumber);
        for (let i = 0; i < xTicksNumber; i++) {
            // console.log(`${interval * i * $maxXTickWidth}, ${$height - 20}`);
            ctx.fillText(dots[interval * i].day, i * $maxXTickWidth, $height - 20);
        }
    }

    function init() {
        let container = document.getElementById('graph');
        return ['x', 'y', 'dots', 'mark'].map(id => {
            let el = Object.assign(document.createElement('canvas'), {width: $width, height: $height, id});
            container.append(el);
            return el.getContext('2d');
        });
    }

    function createButtons(data) {
        for (let i = 0; i < data.length; i++) {
            let btn = Object.assign(document.createElement('button'), {innerText: data[i].title});
            btn.addEventListener('click', () => toggleGraph(i));

            let icon = Object.assign(document.createElement('span'), {className: 'icon'});
            btn.prepend(icon);

            document.getElementById('buttons').append(btn);
        }
    }

    function setupTracking(ctx, data) {
        float = Object.assign(document.createElement('div'), {id: 'float'});
        document.body.append(float);
        ctx.canvas.addEventListener('mousemove', evt => {
            showFloat(data.map(d => coordsToValues(d.dots, {x: evt.clientX, y: evt.clientY})));
        });
        ctx.canvas.addEventListener('mouseout', hideFloat);
    }

    function coordsToValues(dots, {x, y}) {
        // shitty version
        return {x: x, y: y};
    }

    function showFloat(values) {
        let str = `<i>${values[0].x}</i><br>`;
        values.forEach(v => str += `${v.y}<br>`);
        float.innerHTML = str;
        float.style.display = 'inline-block';
    }

    function hideFloat() {
        float.style.display = 'none';
    }

    function toggleGraph(idx) {
        // on button click
    }

    return main;
}());



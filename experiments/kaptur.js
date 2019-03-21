function run() {
    let canvas1 = Object.assign(document.getElementById('c1'), {width: 400, height: 400});
    let canvas2 = Object.assign(document.getElementById('c2'), {width: 400, height: 400});
    let canvas3 = Object.assign(document.getElementById('c3'), {width: 400, height: 400});
    let canvas4 = Object.assign(document.getElementById('c4'), {width: 400, height: 400});
    let video = document.querySelector('video');

    let initCtx = (canvas, color) => {
        let ctx = canvas.getContext('2d');
        // ctx.fillStyle = 'white';
        ctx.strokeStyle = color;

        // ctx.fillRect(0, 0, 400, 400);

        ctx.x = 200;
        ctx.y = 200;

        ctx.moveTo(ctx.x, ctx.y);

        return ctx;
    };

    let pushCoords = (ctx) => {
        ctx.x += Math.round(Math.random() * 20 - 10);
        ctx.y += Math.round(Math.random() * 20 - 10);
        if (ctx.x >= 400) ctx.x -= 10;
        if (ctx.y >= 400) ctx.y -= 10;
        if (ctx.x <= 0) ctx.x += 10;
        if (ctx.y <= 0) ctx.y += 10;
    };

    let draw = (ctx) => {
        pushCoords(ctx);
        ctx.lineTo(ctx.x, ctx.y);
        pushCoords(ctx);
        ctx.lineTo(ctx.x, ctx.y);
        pushCoords(ctx);
        ctx.lineTo(ctx.x, ctx.y);
        ctx.stroke();
        requestAnimationFrame(() => draw(ctx));
    };

    let ctx1 = initCtx(canvas1, 'teal');
    let ctx2 = initCtx(canvas2, 'orange');
    let ctx3 = initCtx(canvas3, 'brown');
    let ctx4 = initCtx(canvas4, 'lime');

    requestAnimationFrame(() => draw(ctx1));
    requestAnimationFrame(() => draw(ctx2));
    requestAnimationFrame(() => draw(ctx3));
    requestAnimationFrame(() => draw(ctx4));

    capture();
}

function capture(){
    let canvas = document.getElementById('c3');
    let stream = canvas.captureStream(25);
    let video = document.getElementById('video');
    video.srcObject = stream;
    video.oncanplay = console.log;


}
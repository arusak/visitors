function run() {
    let video = document.querySelector('video');

    let initCtx = (canvas, color) => {
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.strokeStyle = 'white';

        ctx.fillRect(0, 0, 400, 400);

        ctx.x = 200;
        ctx.y = 200;

        ctx.moveTo(ctx.x, ctx.y);

        return ctx;
    };

    let pushCoords = (ctx) => {
        ctx.x += Math.round(Math.random() * 40 - 20);
        ctx.y += Math.round(Math.random() * 40 - 20);
        if (ctx.x >= 400) ctx.x -= 20;
        if (ctx.y >= 400) ctx.y -= 20;
        if (ctx.x <= 0) ctx.x += 20;
        if (ctx.y <= 0) ctx.y += 20;
    };

    let draw = (ctx) => {
        pushCoords(ctx);
        ctx.lineTo(ctx.x, ctx.y);
        pushCoords(ctx);
        ctx.lineTo(ctx.x, ctx.y);
        pushCoords(ctx);
        ctx.lineTo(ctx.x, ctx.y);
        ctx.stroke();
    };

    let can = Object.assign(document.createElement('canvas'), {width: 400, height:400});
    let con = initCtx(can, 'teal');
    let stream = can.captureStream(2);
    video.srcObject = stream;

    setInterval(()=>{
        draw(con);
        console.log(document.getElementById('video').srcObject.getTracks()[0].muted);
    }, 1000);
}

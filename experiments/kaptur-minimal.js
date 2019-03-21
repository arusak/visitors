function run() {
    let video = document.querySelector('video');

    let initCtx = (canvas, color) => {
        let ctx = canvas.getContext('2d');
        ctx.fillRect(0, 0, 400, 400);
        return ctx;
    };

    let can = Object.assign(document.createElement('canvas'), {width: 400, height: 400});
    let con = initCtx(can);
    let stream = can.captureStream(2);
    stream.getTracks()[0].onmute = console.log;
    // video.srcObject = stream;

    let cnt = 0;

    setInterval(() => {
        // if (cnt < 5) draw(con);
        // cnt++;
        console.log(stream.getTracks()[0]);
    }, 1000);

}

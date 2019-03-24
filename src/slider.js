const $handleWidth = 10;
const $magnet = 0.99;

export class Slider {
    constructor(width, height, chartsData, start, end, onChange) {
        this.callback = onChange;
        this.charts = chartsData;
        this.width = width;

        this.kx = this.width / this.charts[0].dots.length;

        this.init(start, end, height);
    }

    init(start, end, height) {
        let gates = document.getElementById('slider');
        let left = document.getElementById('left');
        let leftHandle = document.getElementById('left-handle');
        let right = document.getElementById('right');
        let rightHandle = document.getElementById('right-handle');
        let clear = document.getElementById('clear');

        gates.style.height = height + 'px';
        gates.style.width = this.width + 'px';
        left.style.left = start * this.kx - this.width + 'px';
        right.style.left = end * this.kx + 'px';
        leftHandle.style.right = -$handleWidth + 'px';
        leftHandle.style.width = $handleWidth + 'px';
        rightHandle.style.left = -$handleWidth + 'px';
        rightHandle.style.width = $handleWidth + 'px';

        // todo use currying here
        let handleAction = (delta, gate, otherGate, gateOffset, otherGateOffset, isLeft) => {
            let newOffset = gateOffset + delta;

            if (Math.abs(newOffset) <= this.width && Math.abs(newOffset - otherGateOffset) > this.width + $handleWidth * 2) {
                // console.log(newOffset, otherGateOffset, newOffset - otherGateOffset);
                gate.style.left = newOffset + 'px';

                let newLeftOffset = isLeft ? newOffset : otherGateOffset;
                let newRightOffset = isLeft ? otherGateOffset : newOffset;

                // todo remove code dup
                if (-newLeftOffset > $magnet * this.width) {
                    let magnetShift = this.width + newLeftOffset;
                    newLeftOffset = -this.width;
                    newRightOffset -= magnetShift;
                }

                if (newRightOffset > $magnet * this.width) {
                    let magnetShift = this.width - newRightOffset;
                    newRightOffset = this.width;
                    newLeftOffset += magnetShift;
                }

                this.callback(this.calcValues(newLeftOffset, newRightOffset));
            }
        };

        let clearAction = (delta, left, right, leftOffset, rightOffset) => {
            let newLeftOffset = leftOffset + delta;
            let newRightOffset = rightOffset + delta;
            if (newLeftOffset > -this.width && newRightOffset < this.width) {
                if (-newLeftOffset > $magnet * this.width) {
                    let magnetShift = this.width + newLeftOffset;
                    newLeftOffset = -this.width;
                    newRightOffset -= magnetShift;
                }

                if (newRightOffset > $magnet * this.width) {
                    let magnetShift = this.width - newRightOffset;
                    newRightOffset = this.width;
                    newLeftOffset += magnetShift;
                }

                left.style.left = newLeftOffset + 'px';
                right.style.left = newRightOffset + 'px';

                this.callback(this.calcValues(newLeftOffset, newRightOffset));
            }
        };

        setupHandle(leftHandle, left, right, handleAction, true);
        setupHandle(rightHandle, right, left, handleAction);

        setupHandle(clear, left, right, clearAction);
    }

    calcValues(leftOffset, rightOffset) {
        return {
            start: Math.trunc((leftOffset + this.width) / this.kx),
            end: Math.trunc(rightOffset / this.kx)
        };
    }
}

function setupHandle(handle, gate, otherGate, action, isLeft) {
    let mouseStart;
    let gateOffset;
    let otherGateOffset;

    handle.addEventListener('mousedown', evt => {
        // console.log('mousedown', Date.now());
        mouseStart = evt.clientX;
        gateOffset = parseInt(gate.style.left, 10);
        otherGateOffset = parseInt(otherGate.style.left, 10);
    });

    window.addEventListener('mouseup', () => {
        // console.log('mouseup', Date.now());
        mouseStart = undefined;
    });

    document.body.addEventListener('mouseout', evt => {
        let from = evt.relatedTarget || evt.toElement;
        if (!from || from.nodeName === 'HTML') {
            // console.log('mouseout');
            mouseStart = undefined;
        }
    }, false);

    document.body.addEventListener('mousemove', evt => {
        if (mouseStart) {
            let delta = evt.clientX - mouseStart;
            action(delta, gate, otherGate, gateOffset, otherGateOffset, isLeft);
        }
    });
}
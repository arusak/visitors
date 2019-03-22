window.addEventListener('DOMContentLoaded', (event) => {
    let left = document.getElementById('left');
    let leftHandle = document.getElementById('left-handle');
    let right = document.getElementById('right');
    let rightHandle = document.getElementById('right-handle');
    let clear = document.getElementById('clear');


    left.style.left = '-600px';
    right.style.left = '600px';

    let handleAction = (delta, gate, otherGate, gateOffset, otherGateOffset) => {
        let newOffset = gateOffset + delta;

        if (Math.abs(newOffset) <= 600 && Math.abs(newOffset - otherGateOffset) > 640) {
            // console.log(newOffset, otherGateOffset, newOffset - otherGateOffset);
            gate.style.left = newOffset + 'px';
        }
    };

    let clearAction = (delta, left, right, leftOffset, rightOffset) => {
        if (leftOffset + delta > -600 && rightOffset + delta < 600) {
            left.style.left = leftOffset + delta + 'px';
            right.style.left = rightOffset + delta + 'px';
        }
    };

    setupHandle(leftHandle, left, right, handleAction);
    setupHandle(rightHandle, right, left, handleAction);

    setupHandle(clear, left, right, clearAction);

});

function setupHandle(handle, gate, otherGate, action) {
    let mouseStart;
    let gateOffset;
    let otherGateOffset;

    handle.addEventListener('mousedown', evt => {
        console.log('mousedown', Date.now());
        mouseStart = evt.clientX;
        gateOffset = parseInt(gate.style.left, 10);
        otherGateOffset = parseInt(otherGate.style.left, 10);
    });

    window.addEventListener('mouseup', () => {
        console.log('mouseup', Date.now());
        mouseStart = undefined;
    });

    document.body.addEventListener('mouseout', evt => {
        let from = evt.relatedTarget || evt.toElement;
        if (!from || from.nodeName === 'HTML') {
            console.log('mouseout');
            mouseStart = undefined;
        }
    }, false);

    document.body.addEventListener('mousemove', evt => {
        if (mouseStart) {
            let delta = evt.clientX - mouseStart;
            action(delta, gate, otherGate, gateOffset, otherGateOffset);
        }
    });
}


const limit = 5;

const round = 10;

function base(number) {
    return Math.pow(round, Math.trunc(Math.log10(number) / Math.log10(round)));
}

function div(number, divider) {
    return Math.round(number / divider);
}

function price(max) {
    let frac = max / limit;
    let B = base(frac);
    console.log('max:', max, 'frac:', frac, 'B:', B, '(frac div B):', div(frac, B));
    return div(frac, B) * B;
}

let table = document.getElementById('table');

for (let max = 3; max < 200; max += 3) {
    // console.log(i, base(i));
    let P = price(max);
    console.log(max, P);
    let ticks = [];
    for (let j = 1; j <= 5; j++) {
        ticks.push(P * j);
    }

    let row = Object.assign(document.createElement('tr'), {innerHTML: `<td><b>${max}</b></td><td>${ticks.join('</td><td>')}</td>`})
    table.appendChild(row);
}


import {ChartController} from './chart.controller.js';
import {VisualController} from './visual.controller.js';

console.log(window.location.search);

let url = new URL(window.location);
let id = url.searchParams.get('id');

loadData().then(data => {
    new VisualController();
    new ChartController(data[+id]);
});


function loadData() {
    return fetch('./tg/chart_data.json', {
        method: 'GET',
    }).catch(err => {
        console.error('Error loading chart data');
        console.error(err);
    }).then(response => {
        return response && response.json();
    });
}
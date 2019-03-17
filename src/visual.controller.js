export class VisualController {
    constructor() {
        let nightSwitch = document.getElementById('night-switch');
        let daySwitch = document.getElementById('day-switch');

        nightSwitch.addEventListener('click', ()=>{
            document.body.classList.add('night');
        });

        daySwitch.addEventListener('click', ()=>{
            document.body.classList.remove('night');
        });
    }
}
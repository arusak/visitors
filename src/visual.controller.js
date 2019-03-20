export class VisualController {
    constructor() {
        let nightSwitch = document.getElementById('night-switch');
        let daySwitch = document.getElementById('day-switch');

        nightSwitch.addEventListener('click', () => {
            document.body.classList.add('night');
            document.body.dispatchEvent(new Event('visualModeChange', {mode: 'night'}));
        });

        daySwitch.addEventListener('click', () => {
            document.body.classList.remove('night');
            document.body.dispatchEvent(new Event('visualModeChange', {mode: 'day'}));
        });
    }
}
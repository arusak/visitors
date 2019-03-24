export class ButtonsController {
    constructor(chartController) {
        this.chartController = chartController;
        this.container = document.getElementById('buttons');
        chartController.chartsInfo.forEach(this.createButton.bind(this));
    }

    createButton(meta, idx) {
        let button = Object.assign(document.createElement('button'),
            {
                dataSet: {idx},
                className: 'active',
                innerHTML: `<span style="background-color:${meta.color};border-color:${meta.color}" class="active">✓</span>${meta.title}`
            });
        button.addEventListener('click', () => {
            if (button.className === 'active') {
                button.className = 'inactive';
                this.chartController.hideLine(idx);
            } else {
                button.className = 'active';
                this.chartController.showLine(idx);
            }
        });

        this.container.appendChild(button);
    };
}
const gridSize = 960;
const numSqrs = 16;
const maxRGBVal = 255;
const gridColor = `rgb(${maxRGBVal}, ${maxRGBVal}, ${maxRGBVal})`;

let grid;

window.onload = () => {
    createGrid(numSqrs);
}

function createGrid(numSqrs) {

    grid = document.getElementById("grid");
    const btn = document.getElementById("btn");

    grid.style.width = gridSize + 'px';

    for (let i = 0; i < (numSqrs * numSqrs); i++) {

        const div = document.createElement("div");
        div.classList.add("square");
        div.style.width = gridSize / numSqrs + 'px';
        div.style.height = gridSize / numSqrs + 'px';

        div.style.backgroundColor = gridColor;

        //events
        div.onmouseover = ev => {
            const color = ev.target.style.backgroundColor;

            ev.target.style.backgroundColor = darkenColor(color);

        };

        btn.onclick = () => {
            chooseNewGridSize();
        }

        grid.appendChild(div);
    }
}

function chooseNewGridSize() {
    let sizePrt = prompt('Indicate a new size to the grid, between 1 and 100 (default: 16)', `${numSqrs}`)
    if (sizePrt != null) {
        const choice = parseInt(sizePrt);
        if (choice > 0) {
            grid.innerHTML = '';
            createGrid(choice);
        }
    }

}

function darkenColor(color) {

    const colorsOnly = color.substring(color.indexOf('(') + 1, color.lastIndexOf(')')).split(/,\s*/);

    const components = {};
    components.red = parseInt(colorsOnly[0]);
    components.green = parseInt(colorsOnly[1]);
    components.blue = parseInt(colorsOnly[2]);

    Object.keys(components).forEach(
        key => {
            if (components[key] > 0) {
                components[key] -= 10;
            }
        }
    )

    // const opacity = parseFloat(colorsOnly[3]);

    return `rgb(${components.red}, ${components.green}, ${components.blue}, 1)`;

}



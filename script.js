

const grid = document.querySelector('#grid');
const root = document.querySelector(':root');
const rgbSwitch = document.querySelector('#rgb');
const clearBtn = document.querySelector('#clear');
const penColorPanel = document.querySelector('#pen-color');
const pixelSizeSlider = document.querySelector('#pixel-size');

const createGrid = function (n) {
    root.style.setProperty('--number-of-grid-squares', n);
    
    for (let i = 0; i < n * n; i++) {
        const gridSquare = document.createElement('div');
    
        gridSquare.classList.add('grid-square');
    
        grid.appendChild(gridSquare);
    }
};

const removeGrid = function () {
    for (const gridSquare of Array.from(grid.children)) {
        gridSquare.remove();
    }
};

const colorize = function (event) {
    const target = event.target;

    target.style.backgroundColor = (rgbSwitch.checked) 
        ? '#' + Math.floor(Math.random()*16777215).toString(16) 
        : getComputedStyle(root).getPropertyValue('--pen-color');
};

const clearGrid = function () {
    for (const gridSquare of Array.from(grid.children)) {
        gridSquare.style.backgroundColor = 'white';
    }
};

const getContrast = function (color) {
    if (color[0] == '#') {
        color = color.slice(1);
    }

    if (color.length == 3) {
        color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }

    let r = parseInt(color.slice(0, 2), 16);
    let g = parseInt(color.slice(2, 4), 16);
    let b = parseInt(color.slice(4, 6), 16);

    return (r * .299 + g * .587 + b * .114) > 186 ? '#000000' : '#ffffff';
}

grid.addEventListener('mouseover', colorize);

rgbSwitch.addEventListener('change', () => {
    const container = document.querySelector('#container');

    if (rgbSwitch.checked) {
        container.style.background = 'var(--rgb-linear)';
    }
    else {
        container.style.background = 'radial-gradient(white, var(--gradient-color))';
    }
});

pixelSizeSlider.addEventListener('input', () => {
    const pixelSizeLabel = document.querySelector('#pixel-size-label');
    const n = pixelSizeSlider.value;

    pixelSizeLabel.textContent = `${n} x ${n}`;
    removeGrid();
    createGrid(n);
});

clearBtn.addEventListener('click', clearGrid);

penColorPanel.addEventListener('change', () => {
    const color = penColorPanel.value;
    root.style.setProperty('--pen-color', color);
    root.style.setProperty('--contrast-color', getContrast(color));
});

createGrid(16);

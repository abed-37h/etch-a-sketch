

const grid = document.querySelector('#grid');
const root = document.querySelector(':root');
const pixelSizeSlider = document.querySelector('#pixel-size');
const clearBtn = document.querySelector('#clear');
const changeColorBtn = document.querySelector('#change-color');

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

    target.classList.add('colored');
};

const clearGrid = function () {
    for (const gridSquare of Array.from(grid.children)) {
        gridSquare.classList.remove('colored');
    }
};

const changeColor = function (color) {
    root.style.setProperty('--pen-color', color);
};

grid.addEventListener('mouseover', colorize);

pixelSizeSlider.addEventListener('input', () => {
    const pixelSizeLabel = document.querySelector('#pixel-size-label');
    const n = pixelSizeSlider.value;

    pixelSizeLabel.textContent = `${n} x ${n}`;
    removeGrid();
    createGrid(n);
});

clearBtn.addEventListener('click', clearGrid);

changeColorBtn.addEventListener('click', () => {
    const color = prompt("Type the color you want to use");
    if (color == null || color == '') return;
    changeColor(color);
});

createGrid(16);



const grid = document.querySelector('#grid');
const root = document.querySelector(':root');
const pixelSizeSlider = document.querySelector('#pixel-size');
const clearBtn = document.querySelector('#clear');
const penColorPanel = document.querySelector('#pen-color');

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

grid.addEventListener('mouseover', colorize);

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
});

createGrid(16);

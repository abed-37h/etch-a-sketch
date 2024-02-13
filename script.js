

const grid = document.querySelector('#grid');
const root = document.querySelector(':root');
const changePixelSizeBtn = document.querySelector('#change-pixel-size');

const createGrid = function (n) {
    root.style.setProperty('--number-of-grid-squares', n);
    
    for (let i = 0; i < n * n; i++) {
        const gridSquare = document.createElement('div');
    
        gridSquare.classList.add('grid-square');
    
        grid.appendChild(gridSquare);
    }
};

const removeGrid = function () {
    for (const gridSquare of Array.from(grid.childNodes)) {
        gridSquare.remove();
    }
};

const colorize = function (event) {
    const target = event.target;

    target.classList.add('colored');
};

grid.addEventListener('mouseover', colorize);

changePixelSizeBtn.addEventListener('click', () => {
    let n = prompt('Enter new pixel size:\nMust be <= 100', 16);
    if (isNaN(n)) {
        n = 16;
    }
    else if (n > 100) {
        n = 100;
    }
    else if (n < 8) {
        n = 8;
    }

    removeGrid();
    createGrid(n);
});

createGrid(16);

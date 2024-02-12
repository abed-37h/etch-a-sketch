

const grid = document.querySelector('#grid');
const root = document.querySelector(':root');

const createGrid = function (n) {
    root.style.setProperty('--number-of-grid-squares', n);
    
    for (let i = 0; i < n * n; i++) {
        const gridSquare = document.createElement('div');
    
        gridSquare.classList.add('grid-square');
    
        grid.appendChild(gridSquare);
    }
}

const colorize = function (event) {
    const target = event.target;

    target.classList.add('colored');
}

grid.addEventListener('mouseover', colorize);

createGrid(16);

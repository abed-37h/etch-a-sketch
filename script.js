

const createGrid = function (n) {
    const grid = document.querySelector('#grid');
    const root = document.querySelector(':root');
    
    root.style.setProperty('--number-of-grid-squares', n);
    
    for (let i = 0; i < n * n; i++) {
        const gridSquare = document.createElement('div');
    
        gridSquare.classList.add('grid-square');
    
        grid.appendChild(gridSquare);
    }
}

createGrid(16);

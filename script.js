

let mouseDown = false;
let erase = false;

const root = document.querySelector(':root');
const grid = document.querySelector('#grid');
const rgbSwitch = document.querySelector('#rgb');
const clearBtn = document.querySelector('#clear');
const controls = document.querySelector('#controls');
const penColorPanel = document.querySelector('#pen-color');
const pixelSizeSlider = document.querySelector('#pixel-size');

const createGrid = function (n) {
    root.style.setProperty('--number-of-grid-squares', n);
    
    for (let i = 0; i < n * n; i++) {
        const gridSquare = document.createElement('div');
    
        gridSquare.classList.add('grid-square');
        gridSquare.setAttribute('draggable', 'false');

        gridSquare.addEventListener('mousedown', (event) => {
            if (event.button === 0) {
                mouseDown = true;
                erase = false;
                colorize(event);
            }
            
            else if (event.button === 2) {
                mouseDown = true;
                erase = true;
                colorize(event);
            }
        });
        gridSquare.addEventListener('mouseover', colorize);
    
        grid.appendChild(gridSquare);
    }
};

const removeGrid = function () {
    for (const gridSquare of Array.from(grid.children)) {
        gridSquare.remove();
    }
};

const colorize = function (event) {
    if (!mouseDown) return;
    
    const target = event.target;

    target.style.backgroundColor = (erase) ? 'white' : (rgbSwitch.checked) 
        ? '#' + Math.floor(Math.random()*16777215).toString(16) 
        : getComputedStyle(root).getPropertyValue('--pen-color');

    const shadeEffectSwitch = document.querySelector('#shade-effect');

    if (shadeEffectSwitch.checked && !erase) {
        addShade(target);
    }
    else {
        resetBrightness(target);
    }
};

const addShade = function (element) {
    let brightness = parseInt((element.dataset.brightness || 110));

    if (brightness) {
        brightness -= 10;
        element.style.filter = `brightness(${brightness}%)`;
        element.dataset.brightness = brightness;
    }
}

const clearGrid = function () {
    for (const gridSquare of Array.from(grid.children)) {
        gridSquare.style.backgroundColor = 'white';
        resetBrightness(gridSquare);
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
};

const resetBrightness = function (element) {
    element.style.filter = 'brightness(100%)';
    element.dataset.brightness = 100;
};

window.addEventListener('mouseup', () => {
    mouseDown = false;
});

window.addEventListener('load', () => {
    createGrid(16);
    container.style.marginRight = controls.clientWidth + 128 + 'px';
});

grid.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

penColorPanel.addEventListener('change', () => {
    const color = penColorPanel.value;
    root.style.setProperty('--pen-color', color);
    root.style.setProperty('--contrast-color', getContrast(color));
});

rgbSwitch.addEventListener('change', () => {
    const container = document.querySelector('#container');

    if (rgbSwitch.checked) {
        container.parentElement.style.background = 'var(--rgb-linear)';
    }
    else {
        container.parentElement.style.background = 'radial-gradient(white, var(--gradient-color))';
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

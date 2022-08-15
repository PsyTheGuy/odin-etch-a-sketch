function setHighLightBNW(element) {
  element.style.backgroundColor = 'rgb(0, 0, 0)';
}

function setHighlightGrayscale(element) {
  const currentShade = element.style.backgroundColor.match(/\d+/g)[0];
  element.style.backgroundColor = `rgb(${currentShade - 25}, ${currentShade - 25}, ${currentShade - 25})`;
}

function setHighlightRainbow(element) {
  const R = Math.floor(Math.random() * 255)
  const G = Math.floor(Math.random() * 255)
  const B = Math.floor(Math.random() * 255)
  element.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
}

function highlightSquare() {
  if (activeMode == 'grayscale') {
    setHighlightGrayscale(this);
  } else if (activeMode == 'rainbow') {
    setHighlightRainbow(this);
  } else {
    setHighLightBNW(this);
  };
}

function createSquare(grid, colNum, rowNum) {
  const square = document.createElement('div');
  square.style.backgroundColor = 'rgb(250, 250, 250)';
  square.style.gridColumn = colNum;
  square.style.gridRow = rowNum;
  square.addEventListener('mouseover', highlightSquare, 'once');
  grid.appendChild(square);
}

function createGrid() {
  const device = document.querySelector('.device');
  if (device.children.length > 1) {device.removeChild(device.firstChild)};
  const grid = document.createElement('div');
  grid.classList.add('grid');
  for (let colNum = 0; colNum < gridSize; colNum++) {
    for (let rowNum = 0; rowNum < Math.round(gridSize/4*3); rowNum++) {
      createSquare(grid, colNum+1, rowNum+1);
    }
  }
  device.insertBefore(grid, device.firstChild);
}

function selectBtn(btn) {
  document.querySelectorAll('input[type="button"]').forEach(btn => btn.classList.remove('btn-selected'));
  btn.classList.add('btn-selected');
}

let activeMode = 'bnw';
let gridSize = 16;

const range = document.getElementById('gridsize-rng');
const bnwBtn = document.getElementById('bnw-btn');
const rainbowBtn = document.getElementById('rainbow-btn');
const grayscaleBtn = document.getElementById('grayscale-btn');
const createBtn = document.getElementById('create-btn');

range.addEventListener('change', () => {
  document.getElementById('gridsize-txt').textContent = range.value;
  gridSize = range.value;
});
bnwBtn.addEventListener('click', () => {
  activeMode = 'bnw';
  selectBtn(bnwBtn);
});
rainbowBtn.addEventListener('click', () => {
  activeMode = 'rainbow';
  selectBtn(rainbowBtn);
});
grayscaleBtn.addEventListener('click', () => {
  activeMode = 'grayscale';
  selectBtn(grayscaleBtn);
});
createBtn.addEventListener('click', () => {
  createGrid();
  document.querySelectorAll('input[type="button"]').forEach(btn => btn.classList.remove('btn-selected'));
});
window.addEventListener('load', createGrid);

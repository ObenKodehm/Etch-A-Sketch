const sketch = (function sketchGrid() {
  const sketchContainer = document.getElementById('sketch-container');

  function setGrid(n) {
    sketchContainer.style.gridTemplateRows = `repeat(${n}, minmax(0, 1fr))`;
    sketchContainer.style.gridTemplateColumns = `repeat(${n}, minmax(0, 1fr))`;
  }

  function clearGrid() {
    const gridSize = sketchContainer.childElementCount;
    const gridCollection = sketchContainer.children;
    for (let i = 0; i < gridSize; i += 1) {
      const gridElement = gridCollection.item(i);
      gridElement.style.backgroundColor = '#FCF6F5FF';
      gridElement.classList.toggle('border', true);
    }
  }

  function createDiv() {
    const divElement = document.createElement('div');
    divElement.classList = 'border border-solid border-[#BFBFBF] w-auto h-auto';
    return divElement;
  }

  function createAndModifyGrid(n) {
    const m = (n * n) - sketchContainer.childElementCount;

    setGrid(n);

    if (m > 0) {
      for (let i = 0; i < m; i += 1) {
        const gridBlock = createDiv();
        sketchContainer.appendChild(gridBlock);
      }
    } else {
      for (let i = 0; i < Math.abs(m); i += 1) {
        sketchContainer.removeChild(sketchContainer.lastElementChild);
      }
    }
  }

  return { createAndModifyGrid, clearGrid };
}());

(function setButtons() {
  const sizeButton = document.querySelector('button[name="Grid Size"]');
  sizeButton.addEventListener('click', () => {
    const gridSize = prompt('Enter a grid size between 1 and 64: ');

    if (Number.isNaN(gridSize) === NaN || gridSize < 1 || gridSize > 64) {
      alert('Enter a valid grid size between 1 and 64.');
    } else {
      sketch.clearGrid();
      sketch.createAndModifyGrid(Number(gridSize));
    }
  });

  const colorChoiceButton = document.querySelector('button[name="Choose Color"]');
  const colorChoices = document.getElementById('color-choice');
  colorChoiceButton.addEventListener('click', () => {
    colorChoices.classList.toggle('hidden');
    colorChoices.classList.toggle('flex');
  });

  const clearButton = document.querySelector('button[name="Clear"]');
  clearButton.addEventListener('click', () => {
    sketch.clearGrid();
  });
}());

let gridColor = () => '#000';
const sketchContainer = document.getElementById('sketch-container');
sketchContainer.addEventListener('mouseover', (event) => {
  const gridElement = event.target;
  if (gridElement.id !== 'sketch-container') {
    gridElement.style.backgroundColor = gridColor();
    gridElement.classList.toggle('border', false);
  }
});

(function setColorButtons() {
  function showColorChoice(choice) {
    const currentColorPara = document.getElementById('color');
    currentColorPara.textContent = choice;
  }

  const blackColorButton = document.querySelector('button[name="Black"]');
  blackColorButton.addEventListener('click', () => {
    gridColor = () => '#000';
    sketch.clearGrid();
    showColorChoice('Color: #000');
  });

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const randomizeColorButton = document.querySelector('button[name="Randomize"]');
  randomizeColorButton.addEventListener('click', () => {
    const randomColor = getRandomColor();
    gridColor = () => randomColor;
    sketch.clearGrid();
    showColorChoice(`Color: ${randomColor}`);
  });

  const chaosColorButton = document.querySelector('button[name="Chaos"]');
  chaosColorButton.addEventListener('click', () => {
    gridColor = () => getRandomColor();
    sketch.clearGrid();
    showColorChoice('Just A Chaos.');
  });

  const colorPicker = document.getElementById('color-picker');
  colorPicker.addEventListener('change', (event) => {
    const colorPick = event.target.value;
    gridColor = () => colorPick;
    sketch.clearGrid();
    showColorChoice(`Color: ${colorPick}`);
  });
}());

sketch.createAndModifyGrid(16);

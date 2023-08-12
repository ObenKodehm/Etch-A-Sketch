// Initialize the sketch object using an immediately invoked function expression (IIFE).
const sketch = (function createSketch() {
  const sketchContainer = document.getElementById('sketch-container');

  // Set the grid template rows and columns to create a grid layout.
  function setGridSize(n) {
    sketchContainer.style.gridTemplateRows = `repeat(${n}, minmax(0, 1fr))`;
    sketchContainer.style.gridTemplateColumns = `repeat(${n}, minmax(0, 1fr))`;
  }

  // Clear the grid by resetting background colors and applying border to grid elements.
  function clearSketch() {
    const totalGridElements = sketchContainer.childElementCount;
    const gridElementCollection = sketchContainer.children;
    for (let i = 0; i < totalGridElements; i += 1) {
      const gridElement = gridElementCollection.item(i);
      gridElement.style.backgroundColor = '#FCF6F5FF'; // Reset background color
      gridElement.classList.toggle('border', true); // Apply border class
    }
  }

  // Create a new div element with specified CSS classes.
  function createGridElement() {
    const gridElement = document.createElement('div');
    gridElement.classList = 'border border-solid border-[#BFBFBF] w-auto h-auto';
    return gridElement;
  }

  // Create and modify the grid based on the specified size.
  function adjustGridSize(newSize) {
    // calculate difference between number of elements present in grid and number of elements needed
    const diff = (newSize * newSize) - sketchContainer.childElementCount;

    setGridSize(newSize); // update grid layout

    if (diff > 0) {
      // Add new grid blocks if required
      for (let i = 0; i < diff; i += 1) {
        const gridElement = createGridElement();
        sketchContainer.appendChild(gridElement);
      }
    } else {
      // Remove excess grid blocks if required
      for (let i = 0; i < Math.abs(diff); i += 1) {
        sketchContainer.removeChild(sketchContainer.lastElementChild);
      }
    }
  }

  // return public methods for the sketch objects
  return { adjustGridSize, clearSketch };
}());

// Define event listeners and handlers for UI buttons and interactions.
(function setupUIInteractions() {
  // Event listener for grid size button.
  const gridSizeButton = document.querySelector('button[name="Grid Size"]');
  gridSizeButton.addEventListener('click', () => {
    // change grid size by prompting the user
    const newSize = prompt('Enter a grid size between 1 and 64: ');

    if (Number.isNaN(newSize) === NaN || newSize < 1 || newSize > 64) {
      alert('Enter a valid grid size between 1 and 64.');
    } else {
      sketch.clearSketch();
      sketch.adjustGridSize(Number(newSize));
    }
  });

  // Event listener for color choice button.
  const colorChoiceButton = document.querySelector('button[name="Choose Color"]');
  const colorChoicesContainer = document.getElementById('color-choice');
  colorChoiceButton.addEventListener('click', () => {
    // toggle the tailwind css class to hide the color choices
    colorChoicesContainer.classList.toggle('hidden');
    colorChoicesContainer.classList.toggle('flex');
  });

  // Event listener for clear button.
  const clearButton = document.querySelector('button[name="Clear"]');
  clearButton.addEventListener('click', () => {
    // clear the grid
    sketch.clearSketch();
  });
}());

// Define the initial grid color and set up event listener for mouseover interactions.
let currentGridColor = () => '#000'; // Default grid Color
const sketchContainer = document.getElementById('sketch-container');
sketchContainer.addEventListener('mouseover', (event) => {
  // use event delegation to set the bakcground color and remove border class
  const gridElement = event.target;
  if (gridElement.id !== 'sketch-container') {
    gridElement.style.backgroundColor = currentGridColor();
    gridElement.classList.toggle('border', false);
  }
});

// Define color choice button handlers and functions for changing grid colors.
(function setupColorChoiceButtons() {
  // Update the displayed current color choice.
  function displaySelectedColor(choice) {
    const selectedColorPara = document.getElementById('color');
    selectedColorPara.textContent = choice;
  }

  // Event listener for black color button.
  const blackColorButton = document.querySelector('button[name="Black"]');
  blackColorButton.addEventListener('click', () => {
    currentGridColor = () => '#000'; // Set grid color to black
    sketch.clearSketch();
    displaySelectedColor('Color: #000');
  });

  // Generate a random color.
  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    return `rgb(${r}, ${g}, ${b})`;
  };

  // Event listener for randomize color button.
  const randomizeColorButton = document.querySelector('button[name="Randomize"]');
  randomizeColorButton.addEventListener('click', () => {
    const randomColor = generateRandomColor();
    currentGridColor = () => randomColor; // Set current grid color to a random color
    sketch.clearSketch();
    displaySelectedColor(`Color: ${randomColor}`);
  });

  // Event listener for chaos color button.
  const chaosColorButton = document.querySelector('button[name="Chaos"]');
  chaosColorButton.addEventListener('click', () => {
    // On every mouseover set current grid color to a random color
    currentGridColor = () => generateRandomColor();
    sketch.clearSketch();
    displaySelectedColor('Just A Chaos.');
  });

  // Event listener for color picker.
  const colorPicker = document.getElementById('color-picker');
  colorPicker.addEventListener('change', (event) => {
    const pickedColor = event.target.value;
    currentGridColor = () => pickedColor; // Set current grid color to the selected color
    sketch.clearSketch();
    displaySelectedColor(`Color: ${pickedColor}`);
  });
}());

// Initialize the sketch grid with a default size of 16.
sketch.adjustGridSize(16);

const container = document.getElementById('sketch-grid');
const size = document.querySelector('button[name="Size"]');
const chooseColorBtn = document.querySelector('button[name="Color"]');
const colorChoice = document.getElementById('color-choice');
const black = document.querySelector('button[name="Black"]');
const randomize = document.querySelector('button[name="Randomize"]');
const colorPick = document.querySelector('input[name="color-picker"]');
const clear = document.querySelector('button[name = "Clear"]');
const colorHex = document.querySelector('p');
let n = 16;
let color = "#000";

window.addEventListener('load', sketch(n, color));

//   MAIN SKETCH
function sketch(n, color) {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
  setGrid(n);
  for (let i = 0; i < n*n; i++) {
    const div = document.createElement('div');
    div.classList += (" border border-solid border-[#BFBFBF] w-auto h-auto");
    container.appendChild(div);
    div.addEventListener('mouseover', () => {
      div.classList.toggle("border", false);
      div.style.backgroundColor = color;
    });
    clear.addEventListener('click', () => {
      div.classList.toggle("border", true);
      div.style.backgroundColor = "#FCF6F5FF";
    });
  }
}

// CHANGING SIZE
size.addEventListener('click', setSize);
function setSize() {
  n = prompt("Enter a Grid Size.", 16);
  if (n >= 1 && n <= 64) {
    sketch(n, color);
  } else {
    confirm("Enter a Number between 1 and 64.");
  }
}

function setGrid(a) {
  container.style['grid-template-columns'] = `repeat(${a}, 1fr)`;
  container.style['grid-template-rows'] = `repeat(${a}, 1fr)`;
}

// SETTING COLORS
function setColorBlack() {
  colorHex.textContent = "#000";
  sketch(n, "#000");
}

function randomColor() {
  let r = Math.floor(Math.random()*255);
  let g = Math.floor(Math.random()*255);
  let b = Math.floor(Math.random()*255);

  color =  '#' + r.toString(16) + g.toString(16) + b.toString(16);
  colorHex.textContent = color;
  sketch(n, color);
}

colorPick.addEventListener('input', () => {
  color = colorPick.value;
  colorHex.textContent = color;
  sketch(n, color);
});


function openTab() {
  if (colorChoice.style.display === "flex") {
    colorChoice.style.display = "none";
  }else {
    colorChoice.style.display = "flex";
  }
}

chooseColorBtn.addEventListener('click', openTab);
randomize.addEventListener('click', randomColor);
black.addEventListener('click', setColorBlack);


// Chaotic Colors Sketch
const chaos = document.querySelector('button[name="Chaos"]');
chaos.addEventListener('click', chaotic);

function randomnation() {
  let r = Math.floor(Math.random()*255);
  let g = Math.floor(Math.random()*255);
  let b = Math.floor(Math.random()*255);

  return `rgb(${r},${g},${b})`;
}

function chaotic() {
  sketchChaotic(n);
  colorHex.textContent = "Just a Chaos.";
}

function sketchChaotic(n) {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
  setGrid(n);
  for (let i = 0; i < n*n; i++) {
    const div = document.createElement('div');
    div.classList += (" border border-solid border-[#BFBFBF] w-auto h-auto");
    container.appendChild(div);
    div.addEventListener('mouseover', () => {
      div.style.backgroundColor = randomnation();
      div.classList.toggle("border", false);
    });
    clear.addEventListener('click', () => {
      div.classList.toggle("border", true);
      div.style.backgroundColor = "#FCF6F5FF";
    });
  }
}

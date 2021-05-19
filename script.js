const container = document.querySelector('.container');
const size = document.querySelector('button[name="Size"]');
const chooseColorBtn = document.querySelector('button[name="Color"]');
const colorChoice = document.querySelector('.color-choices');
const black = document.querySelector('button[name="Black"]');
const randomize = document.querySelector('button[name="Randomize"]');
// const chaos = document.querySelector('button[name="Chaos"]');              To Be Continued
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
    div.style.border = "1px solid #BFBFBF";
    div.style.height = "auto";
    div.style.width = "auto";
    container.appendChild(div);
    div.addEventListener('mouseover', () => {
      div.style.backgroundColor = color;
      div.style.border = "none";
    });
    clear.addEventListener('click', () => {
      div.style.backgroundColor = "#FCF6F5FF";
      div.style.border = "1px solid #BFBFBF";
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
  let r = Math.floor(Math.random()*254);
  let g = Math.floor(Math.random()*254);
  let b = Math.floor(Math.random()*254);

  color = `rgb(${r},${g},${b})`;
  colorHex.textContent = color;
  sketch(n, color)
}

// function chaosColor() {              To Be Continued
//                                      To Be Continued
// }                                    To Be Continued

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
// chaos.addEventListener('click', chaosColor);     To Be Continued

// This file contains all the JavaScript functionality for managing the stack operations and updating the UI.

const stack = document.getElementById("stack");
const emptyInd = document.getElementById("empty");
const fullInd = document.getElementById("full");
const lc = document.getElementById("lc");
const dc = document.getElementById("dc");

const MAX = 7;
let data = [];
let counter = 1;

// создаем ячейки
for (let i = 0; i < MAX; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.setAttribute("data-index", MAX - i); // Индекс ячейки
  stack.appendChild(cell);
}

function updateIndicators() {
  emptyInd.classList.toggle("active", data.length === 0);
  fullInd.classList.toggle("active", data.length === MAX);
}

function updateLCandDC() {
  lc.innerHTML = "ЛЧ<br>" + data.length;
  dc.innerHTML = "DC<br>" + (data.length > 0 ? "RG" + data.length : "-");
}

function push() {
  if (data.length >= MAX) {
    alert("Стек полный!");
    return;
  }
  data.push("RG" + counter++);
  redraw();

  // Подсветить соответствующую стрелку
  const arrow = document.querySelector('.arrow-line.dc-stack-' + data.length);
  if (arrow) {
    arrow.classList.add('active');
    setTimeout(() => {
      arrow.classList.remove('active');
    }, 500);
  }
}

function pop() {
  if (data.length === 0) {
    alert("Стек пуст!");
    return;
  }
  data.pop();
  redraw();
}

function shift() {
  if (data.length === 0) return;
  let first = data.shift();
  data.push(first);
  redraw();
}

function redraw() {
  const cells = stack.querySelectorAll(".cell");
  cells.forEach((c, i) => {
    if (i < data.length) {
      c.textContent = data[data.length - 1 - i];
      c.classList.add("active");
    } else {
      c.textContent = "";
      c.classList.remove("active");
    }
  });
  updateIndicators();
  updateLCandDC();
}

updateIndicators();
updateLCandDC();
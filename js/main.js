"use strict"

let matrix = Array(1).fill(Array(1).fill(0));
let characteristics = [];
let objects = [];

let inputStr = document.getElementById("inputStr");
let addCharacteristicBtn = document.getElementById('addCharacteristicBtn');
let addObjectBtn = document.getElementById('addObjectBtn');

let question = document.getElementById("question");
let yesBtn = document.getElementById("btnYes");
let noBtn = document.getElementById("btnNo");
let answer = document.getElementById("answer");

let copiedMatrix,
  copiedCharacteristics,
  copiedObjects;

addCharacteristicBtn.addEventListener("click", () => {
  if (!inputStr.value) {
    alert("Введите значение");
  } else if (characteristics.includes(inputStr.value)) {
    alert("Такая характеристика уже есть");
  } else {
    characteristics.push(inputStr.value)
    characteristics.length === 1 ? {} : addRow(matrix);
    redrawMatrix(matrix);
    redrawCharacteristics(characteristics);
    inputStr.value = "";

    copyData();
    makeFirstSteps(copiedMatrix, copiedCharacteristics);
  }
});

addObjectBtn.addEventListener("click", () => {
  if (!inputStr.value) {
    alert("Введите значение");
  } else if (objects.includes(inputStr.value)) {
    alert("Такой объект уже есть");
  } else {
    objects.push(inputStr.value)
    objects.length === 1 ? {} : addCollumn(matrix);
    redrawMatrix(matrix);
    redrawObjects(objects);
    inputStr.value = "";

    copyData();
    makeFirstSteps(copiedMatrix, copiedCharacteristics);
  }
});

function addRow(matr) {
  let num = matr[0].length;
  matr.push(Array(num).fill(0));
}

function addCollumn(matr) {
  matr.map(item => item.push(0));
}

function redrawMatrix(matrix) {
  let table = document.getElementById("table");
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  matrix.map((row, row_i) => {
    let tr = table.insertRow();
    row.map((collumn, collumn_i) => {
      let td = tr.insertCell();
      let btn = document.createElement('button');
      btn.className = "btnCell";
      btn.innerHTML = matrix[row_i][collumn_i];
      td.appendChild(btn);

      btn.addEventListener("click", () => {
        (+btn.innerHTML === 0) ? btn.innerHTML = 1 :
          (+btn.innerHTML === 1) ? btn.innerHTML = 0 : alert(`not 1 not 0`);
        matrix[row_i][collumn_i] = +btn.innerHTML;

        copyData();
        makeFirstSteps(copiedMatrix, copiedCharacteristics);
      });
    });
  });
}

function redrawCharacteristics(characteristics) {
  let charsNames = document.getElementById("characteristicsNames");
  while (charsNames.firstChild) {
    charsNames.removeChild(charsNames.firstChild);
  }

  characteristics.map(item => {
    let li = document.createElement('li');
    li.innerHTML = item;
    charsNames.appendChild(li);
  });
}

function redrawObjects(objects) {
  let objsNames = document.getElementById("objectsNames");
  while (objsNames.firstChild) {
    objsNames.removeChild(objsNames.firstChild);
  }

  objects.map(item => {
    let li = document.createElement('li');
    li.innerHTML = item;
    objsNames.appendChild(li);
  });
}

yesBtn.addEventListener("click", () => {
  yesBtn.setAttribute('disabled', true);
  noBtn.setAttribute('disabled', true);

  removeObjectsWithXChar(getCharFromQuestion(), 0);
  if (copiedObjects.length === 0) {
    answer.innerText = "решение не найдено";
  } else if (copiedObjects.length === 1) {
    answer.innerText = `ИСКОМЫЙ ОБЪЕКТ - ${copiedObjects[0]}`;
  } else {
    makeFirstSteps();
  }

  console.log(copiedMatrix);
  console.log(copiedCharacteristics);
  console.log(copiedObjects);
});

noBtn.addEventListener("click", () => {
  yesBtn.setAttribute('disabled', true);
  noBtn.setAttribute('disabled', true);

  removeObjectsWithXChar(getCharFromQuestion(), 1);
  if (copiedObjects.length === 0) {
    answer.innerText = "решение не найдено";
  } else if (copiedObjects.length === 1) {
    answer.innerText = `ИСКОМЫЙ ОБЪЕКТ - ${copiedObjects[0]}`;
  } else {
    makeFirstSteps(copiedMatrix, copiedCharacteristics);
  }

  console.log(copiedMatrix);
  console.log(copiedCharacteristics);
  console.log(copiedObjects);
});

//algorithm

function copyData() {
  copiedMatrix = getCopiedMatrix(matrix);
  copiedCharacteristics = characteristics.slice();
  copiedObjects = objects.slice();
}

function getCopiedMatrix(matr) {
  let copiedMatr = matr.map(row => Array.from(row));
  return copiedMatr;
}

function makeFirstSteps() {
  question.innerText = `вопрос`;
  answer.innerText = `тут будет ответ`;
  yesBtn.disabled = true;
  noBtn.disabled = true;
  if (copiedObjects.length > 1 && copiedCharacteristics.length > 0) {
    excludeNullLines();
    if (copiedCharacteristics.length === 0) {
      copiedObjects.length = 0;
    }

    let num = getFirstRowWithMinSum();

    if (copiedObjects.length > 1 && copiedCharacteristics.length > 0) {
      console.log("copiedCharacteristics[num] " + copiedCharacteristics[num]);
      console.log("copiedCharacteristics " + copiedCharacteristics);
      console.log("num " + num);

      question.innerText = `ИМЕЕТ ЛИ ОБЪЕКТ ${copiedCharacteristics[num]}?`;
      yesBtn.disabled = false;
      noBtn.disabled = false;
      
    }
  }
}

function excludeNullLines() { 
  let m2 = [], chars2 = [];

  copiedMatrix.map((row, index) => {
    if (row.some(ch => ch === 0) && row.some(ch => ch === 1)) {
      m2.push(row);
      chars2.push(copiedCharacteristics[index]);
    }
  });

  copiedMatrix = m2.map(row => Array.from(row));
  copiedCharacteristics = chars2;

  copiedMatrix.includes
}

function getFirstRowWithMinSum() {
  return copiedMatrix.reduce((minRowIndex, row, index) => {
    let rowSum = row.reduce((sum, num) => sum + num, 0);
    let minRowSum = copiedMatrix[minRowIndex].reduce((sum, num) => sum + num, 0);
    if (rowSum < minRowSum)
      return index;
    else
      return minRowIndex;
  }, 0);
}

function removeObjectsWithXChar(char, X) {
  let m2 = [], obj2 = [];
  for (let k = 0; k < copiedMatrix.length; k++)
    m2.push([]);

  let rowNum = copiedCharacteristics.indexOf(char);

  copiedMatrix[rowNum].map((item, index) => {
    if (item !== X) {
      copiedMatrix.map((row, i) => {
        m2[i].push(row[index]);
      });
      obj2.push(copiedObjects[index]);
    }
  });
  copiedMatrix = m2.map(row => Array.from(row));
  copiedObjects = obj2;
}

function askTheQuestion(characteristic) {
  question.innerText = `ИМЕЕТ ЛИ ОБЪЕКТ ${characteristic}?`;
  yesBtn.disabled = false;
  noBtn.disabled = false;
}

function getCharFromQuestion() {
  let str = question.textContent || question.innerText;
  let arr = str.split(/ |\?/);
  return arr[arr.length - 2];
}
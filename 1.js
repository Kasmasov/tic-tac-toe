const cells = document.querySelectorAll(".cell"); //поллучаем в переменную cells все node с классом .cell
const mainScreen = document.querySelector(".mainScreen"); // получаю в переменную mainScreen node с классом .mainScreen
const startButton = document.querySelector(".startButton"); // получаю в переменную startButton node (кнопку) с классом .startButton
const arrayOfNode = Array.from(cells); // получаю переменную arrayOfNode в виде массива из переменной cells
const cellForResult = wrapper(arrayOfNode); // функция (замыкание) обертка с массивом arrayOfNode,  как агрументом, для сокращения кода в условиях
const resultWindowDiv = document.querySelector(".resultWindowDiv"); // создаю div для окна с оповещением, кто выиграл
const resultButtonDiv = document.querySelector(".resultButtonDiv"); // создаю ссылку, как кнопку, для окна с оповещением, кто выиграл
const resultText = document.querySelector(".resultText"); // создаю ссылку, как кнопку, для окна с оповещением, кто выиграл
const plus = "+"; //переменная определяет textContext игрока
const zero = "o"; //переменная определяет textContext копьютера
let arrayOfCells = []; // пустой массив для перебора и определения последней ячейки куда поставится крестик автоматически
let playerResult, compResult; //  переменная отслеживает результат игрока/копьютера, объявляю для глобальной области видимости

startButton.addEventListener("click", () => {
  document.querySelector(".firstScreen").style.display = "none"; //выключаю видимотсть первого окна
  document.querySelector(".mainScreen").style.display = "flex"; //включаю видимость основного окна
});

mainScreen.addEventListener("click", gameControl); //вешаю событие на родителя mainScreen для прослушивания дивов

function gameControl() {
  printX(event.target); // запускаю функцию установки крестика с объектом на который сработало событие клик курсор
  const numberOfCell = event.target.getAttribute("data-cellNumber"); //получаю номер ячейки из DOM дерева через data-cellNumber
  arrayOfCells[numberOfCell] = event.target; //записываю в массив объект, на котором сработало событие клик
  let lastCell = lastCellControl(arrayOfCells); // запускаю функцию для получения значения какое количество ячеек заполенно
  rusultControl(lastCell, arrayOfCells, arrayOfNode);
}

function wrapper(arr) {
  return function (value) {
    return arr[value].textContent;
  };
}

function rusultControl(lastCell, arrayOfCells, arrayOfNode) {
  playerResult =
    (cellForResult(0) == plus &&
      cellForResult(1) == plus &&
      cellForResult(2) == plus) ||
    (cellForResult(3) == plus &&
      cellForResult(4) == plus &&
      cellForResult(5) == plus) ||
    (cellForResult(6) == plus &&
      cellForResult(7) == plus &&
      cellForResult(8) == plus) ||
    (cellForResult(0) == plus &&
      cellForResult(3) == plus &&
      cellForResult(6) == plus) ||
    (cellForResult(1) == plus &&
      cellForResult(4) == plus &&
      cellForResult(7) == plus) ||
    (cellForResult(2) == plus &&
      cellForResult(5) == plus &&
      cellForResult(8) == plus) ||
    (cellForResult(0) == plus &&
      cellForResult(4) == plus &&
      cellForResult(8) == plus) ||
    (cellForResult(2) == plus &&
      cellForResult(4) == plus &&
      cellForResult(6) == plus);

  compResult =
    (cellForResult(0) == zero &&
      cellForResult(1) == zero &&
      cellForResult(2) == zero) ||
    (cellForResult(3) == zero &&
      cellForResult(4) == zero &&
      cellForResult(5) == zero) ||
    (cellForResult(6) == zero &&
      cellForResult(7) == zero &&
      cellForResult(8) == zero) ||
    (cellForResult(0) == zero &&
      cellForResult(3) == zero &&
      cellForResult(6) == zero) ||
    (cellForResult(1) == zero &&
      cellForResult(4) == zero &&
      cellForResult(7) == zero) ||
    (cellForResult(2) == zero &&
      cellForResult(5) == zero &&
      cellForResult(8) == zero) ||
    (cellForResult(0) == zero &&
      cellForResult(4) == zero &&
      cellForResult(8) == zero) ||
    (cellForResult(2) == zero &&
      cellForResult(4) == zero &&
      cellForResult(6) == zero);

  for (let key in arrayOfNode) {
    if (
      lastCell == 8 &&
      arrayOfNode.hasOwnProperty(key) !== arrayOfCells.hasOwnProperty(key) &&
      !playerResult && !compResult
    ) {
      arrayOfCells[key] = cells[key].textContent = plus;
      rusultControl();
    }
  }


  if (playerResult) {
    let text = "Вы победили!!!";
    resultWindow(text);
  }
  if (compResult) {
    let text = "Вы проиграли!!!";
    resultWindow(text);
  }
  if (!compResult && !playerResult && lastCell == 8) {
    let text = "Дружеская ничья!!!";
    resultWindow(text);
  }
  return playerResult || compResult;
}

function lastCellControl(arr) {
  let cellsCounter = 0;
  for (let key in arr) {
    arr.hasOwnProperty(key) ? cellsCounter++ : cellsCounter;
  }
  return cellsCounter;
}

function printX(item) {
  if (!item.textContent && !compResult) {
    item.textContent = plus;
    rusultControl();
    if (!playerResult) {
      printO(cells);
    }
  } else {
    const text = "Эта клетка уже занята, выберите другую";
    const buttonText = "Продолжить игру";
    resultWindow(text, buttonText);
  }
  return item;
}

function printO(items) {
  const rendomNum = Math.floor(Math.random() * (9 - 0) + 0);
  !items[rendomNum].textContent
    ? (items[rendomNum].textContent = zero) && !playerResult
    : printO(items);
  arrayOfCells[rendomNum] = items[rendomNum];

  return items;
}
function resultWindow(text, buttonText = "Начать игру сначала") {
  mainScreen.removeEventListener("click", gameControl);
  mainScreen.style.opacity = 0.2;
  resultWindowDiv.style.display = "flex";
  resultText.textContent = text;
  resultButtonDiv.textContent = buttonText;
  resultButtonDiv.addEventListener("click", restart);
}
function restart() {
  if ((resultButtonDiv.textContent == "Продолжить игру")) {
    mainScreen.addEventListener("click", gameControl);
    mainScreen.style.opacity = 1;
    resultWindowDiv.style.display = "none";
  }
  else if((resultButtonDiv.textContent == "Начать игру сначала")) {
    compResult = false;
    cells.forEach((el) => (el.textContent = ""));
    arrayOfCells = [];
    mainScreen.style.opacity = 1;
    resultWindowDiv.style.display = "none";
    mainScreen.addEventListener("click", gameControl);
  }
}


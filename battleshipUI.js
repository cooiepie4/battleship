import { Ship, Gameboard, Player } from "./battleship.js";
let board = document.querySelector(".board");
let opBoard = document.querySelector(".op-board");
let addShipButton = document.querySelector(".addShip");
let shipLength = document.querySelector("#shipLength");
let shipRow = document.querySelector("#shipRow");
let shipCol = document.querySelector("#shipCol");
let shipVert = document.querySelector("#shipVert");
let startGame = document.querySelector(".startGame");
let createAShip = document.querySelector(".createAShip");
const shipLimits = {
  4: 1,
  3: 2,
  2: 2,
  1: 3,
};

const placedShips = {
  4: 0,
  3: 0,
  2: 0,
  1: 0,
};

const player1 = new Player("cooiepie4", "human");
const player2 = new Player("cooiebot4", "computer");

const gameboard1 = player1.gameboard;
const gameboard2 = player2.gameboard;

const gameboardArray2 = gameboard2.board;
const gameboardArray1 = gameboard1.board;

function populateBoard(board, size) {
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${size} , 1fr)`;
  board.style.gridTemplateRows = `repeat(${size} , 1fr)`;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const square = document.createElement("div");
      square.classList.add("grid-square");
      square.dataset.value = gameboardArray1[i][j];
      if (gameboardArray1[i][j] !== null) {
        square.classList.add("ship");
      } else {
        square.classList.add("empty");
      }

      board.appendChild(square);
    }
  }
}
populateBoard(board, 10);

function populateOpBoard(board, row, col) {
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${col} , 1fr)`;
  board.style.gridTemplateRows = `repeat(${row} , 1fr)`;

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const square = document.createElement("div");
      square.classList.add("grid-square");
      square.dataset.row = row;
      square.dataset.col = col;
      square.addEventListener("click", (event) => {
        colorSquare.call(event.target, gameboard2, row, col);
      });
      board.appendChild(square);
    }
  }
}

populateOpBoard(opBoard, 10, 10);

function colorSquare(gameboard, row, col) {
  if (
    this.classList.contains("hitGridSquare") ||
    this.classList.contains("missGridSquare")
  ) {
    return; // Exit the function if the cell has already been clicked
  }
  const hitStatus = gameboard.receiveAttack(parseInt(row), parseInt(col));
  if (hitStatus) {
    this.classList.add("hitGridSquare");
    botAttack();
    checkWinner();
  } else {
    this.classList.add("missGridSquare");
    botAttack();
    checkWinner();
  }
}

addShipButton.addEventListener("click", (event) => {
  event.preventDefault();
  const length = parseInt(shipLength.value);
  const row = parseInt(shipRow.value);
  const col = parseInt(shipCol.value);
  const vertical = shipVert.value === "true"; // Check if selected option is true

  console.log("Length:", length);
  console.log("Row:", row);
  console.log("Col:", col);
  console.log("Vertical:", vertical);

  let ship = new Ship(length);

  if (placedShips[length] < shipLimits[length]) {
    gameboard1.placeShip(ship, row, col, vertical);
    placedShips[length]++;
  } else {
    alert("reached the ship limit");
  }

  populateBoard(board, 10);
});

startGame.addEventListener("click", () => {
  if (!checkAllShipsPlaced()) {
    return;
  } else {
    opBoard.style.display = "grid";
    createAShip.style.display = "none";
  }
});

function placeShipsOpBoard() {
  const ships = [
    new Ship(4), // Destroyer
    new Ship(3), // Mini Destroyer 1
    new Ship(3), // Mini Destroyer 2
    new Ship(2), // Little Boy 1
    new Ship(2), // Little Boy 2
    new Ship(1), // Life Boat 1
    new Ship(1), // Life Boat 2
    new Ship(1), // Life Boat 3
  ];

  ships.forEach((ship) => {
    let placed = false;

    while (!placed) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      const vertical = getRandomVertical();

      try {
        gameboard2.placeShip(ship, row, col, vertical);
        placed = true; // Ship placed successfully
      } catch (error) {
        // Handle the error (e.g., log it or ignore it)
        console.error("Failed to place ship:", error);
        // Loop will retry placing the ship
      }
    }
  });
}
function getRandomVertical() {
  return Math.random() < 0.5;
}

function botAttack() {
  let row, col;
  do {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
  } while (gameboardArray1 === "M" || gameboardArray1 === "0");

  const isHit = gameboard1.receiveAttack(row, col);
  updatePlayerBoard(row, col, isHit);
}
function checkWinner() {
  if (gameboard1.sunkAllShips() === true) {
    alert("you won");
    opBoard.style.display = "none";
  } else if (gameboard2.sunkAllShips() === true) {
    alert("computer won");
  } else {
    return;
  }
}

function updatePlayerBoard(row, col, isHit) {
  const square = board.children[row * 10 + col];

  if (isHit) {
    square.classList.add("hitGridSquare");
  } else {
    square.classList.add("missGridSquare");
  }
}

function checkAllShipsPlaced() {
  for (let i = 1; i < 5; i++) {
    if (placedShips[i] < shipLimits[i]) {
      alert(
        "You must placed 1 ship with the length of 4, 2 with the length of 3, 2 with the length of 2, and 3 with the length of 1"
      );
      return false;
    }
  }
  return true;
}

placeShipsOpBoard();

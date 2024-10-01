import { Ship, Gameboard, Player } from "./battleship.js";
let board = document.querySelector(".board");
let opBoard = document.querySelector(".op-board");
const ship = new Ship(4);
const ship1 = new Ship(4);

const player1 = new Player("cooiepie4", "human");
const player2 = new Player("cooiebot4", "computer");

const gameboard1 = player1.gameboard;
const gameboard2 = player2.gameboard;

const gameboardArray1 = gameboard1.board;
const gameboardArray2 = gameboard2.board;

gameboard1.placeShip(ship, 0, 0, false);
gameboard2.placeShip(ship1, 0, 0, false);

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
  this.style.border = "solid red 1px";
  gameboard.receiveAttack(parseInt(row), parseInt(col));
}

console.table(gameboardArray2);
console.log(ship1.hits);
console.log(ship1.isSunk());

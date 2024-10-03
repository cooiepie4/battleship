export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    if (this.hits === this.length) {
      return true;
    } else {
      return false;
    }
  }
}

export class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = this.createBoard();
    this.ships = [];
  }

  createBoard() {
    return Array(this.size)
      .fill(null)
      .map(() => Array(this.size).fill(null));
  }

  placeShip(ship, row, col, vertical) {
    const length = ship.length;

    for (let i = 0; i < length; i++) {
      const r = vertical ? row + i : row;
      const c = vertical ? col : col + i;

      if (r >= this.size || c >= this.size || this.board[r][c] !== null) {
        throw new Error("Invalid placement!");
      }

      if (vertical) {
        if (c > 0 && this.board[r][c - 1] !== null) {
          throw new Error("Invalid placement!");
        }
        if (c < this.size - 1 && this.board[r][c + 1] !== null) {
          throw new Error("Invalid placement!");
        }
        if (r > 0 && this.board[r - 1][c] !== null) {
          throw new Error("Invalid placement!");
        }
        if (r + length < this.size && this.board[r + length][c] !== null) {
          throw new Error("Invalid placement!");
        }
      } else {
        if (r > 0 && this.board[r - 1][c] !== null) {
          throw new Error("Invalid placement!");
        }
        if (r < this.size - 1 && this.board[r + 1][c] !== null) {
          throw new Error("Invalid placement!");
        }
        if (c > 0 && this.board[r][c - 1] !== null) {
          throw new Error("Invalid placement!");
        }
        if (c + length < this.size && this.board[r][c + length] !== null) {
          throw new Error("Invalid placement!");
        }
      }
    }

    for (let i = 0; i < length; i++) {
      const r = vertical ? row + i : row;
      const c = vertical ? col : col + i;
      this.board[r][c] = ship;
      this.ships.push(ship);
    }
  }

  receiveAttack(row, col) {
    const target = this.board[row][col];
    if (target instanceof Ship) {
      target.hit();
      this.board[row][col] = 0;
      return true;
    } else if (this.board[row][col] === null) {
      this.board[row][col] = "M";
      return false;
    }
    return false;
  }

  sunkAllShips() {
    return this.ships.every((ship) => ship.isSunk());
    //every(function()) or every(() => ) returns true or false
  }
}

export class Player {
  constructor(name, playerType) {
    this.name = name;
    this.playerType = playerType;
    this.gameboard = new Gameboard();
  }
}

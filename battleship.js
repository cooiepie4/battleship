class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    if (this.length === this.hits) {
      return true;
    } else {
      return false;
    }
  }
}

class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = this.createBoard();
    this.ships = [];
    this.ship = new Ship();
  }

  createBoard() {
    return Array(this.size)
      .fill(null)
      .map(() => Array(this.size).fill(null));
  }

  placeShip(ship, row, col, vertical) {
    const length = ship.length;

    // Check if the ship can be placed (within bounds and not overlapping)
    for (let i = 0; i < length; i++) {
      const r = vertical ? row + i : row;
      const c = vertical ? col : col + i;

      // Check if out of bounds or if already occupied
      if (r >= this.size || c >= this.size || this.board[r][c] !== null) {
        throw new Error("Invalid placement!");
      }
    }

    // Place the ship
    for (let i = 0; i < length; i++) {
      const r = vertical ? row + i : row;
      const c = vertical ? col : col + i;
      this.board[r][c] = 1; // or you could store the ship object itself
      this.ships.push([r, c]);
    }
  }

  receiveAttack(ship, row, col) {
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i][0] === row && this.ships[i][1] === col) {
        this.board[row][col] = 0;
        ship.hit();
        return;
      }
      console.log("missed!");
    }
  }
}

module.exports = {
  Ship,
  Gameboard,
};

const { Ship, Gameboard } = require("./battleship");

describe("Ship", () => {
  test("create a ship with a length and is not sunk", () => {
    const ship = new Ship(4);

    expect(ship.length).toBe(4);
    expect(ship.isSunk()).toBe(false);
  });

  test("records hits correctly", () => {
    const ship = new Ship(4);
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test("ship sinks correctly", () => {
    const ship = new Ship(4);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe("gameBoard", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("test that ship is placed vertically", () => {
    const ship = new Ship(4);

    gameboard.placeShip(ship, 0, 0, true);
    expect(gameboard.board[0][0]).toBe(1);
    expect(gameboard.board[1][0]).toBe(1);
    expect(gameboard.board[2][0]).toBe(1);
    expect(gameboard.board[3][0]).toBe(1);
  });

  test("test that ship is placed horizontally", () => {
    const ship = new Ship(4);

    gameboard.placeShip(ship, 0, 0, false);
    expect(gameboard.board[0][0]).toBe(1);
    expect(gameboard.board[0][1]).toBe(1);
    expect(gameboard.board[0][2]).toBe(1);
    expect(gameboard.board[0][3]).toBe(1);
  });

  test("test that ship can not overlap", () => {
    const ship = new Ship(4);

    gameboard.placeShip(ship, 0, 0, true);

    expect(() => {
      gameboard.placeShip(ship, 1, 0, true);
    }).toThrow("Invalid placement!");
  });

  test("test that ship can not be placed out of bounds", () => {
    const ship = new Ship(4);

    expect(() => {
      gameboard.placeShip(ship, 10, 10, true);
    }).toThrow("Invalid placement!");
  });
});

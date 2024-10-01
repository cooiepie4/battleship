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
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[1][0]).toBe(ship);
    expect(gameboard.board[2][0]).toBe(ship);
    expect(gameboard.board[3][0]).toBe(ship);
  });

  test("test that ship is placed horizontally", () => {
    const ship = new Ship(4);

    gameboard.placeShip(ship, 0, 0, false);
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[0][1]).toBe(ship);
    expect(gameboard.board[0][2]).toBe(ship);
    expect(gameboard.board[0][3]).toBe(ship);
    expect(gameboard.board[0][4]).toBe(null);
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
  test("check the ships array", () => {
    const ship = new Ship(4);
    gameboard.placeShip(ship, 0, 0, false);
    expect(gameboard.ships).toStrictEqual([ship, ship, ship, ship]);
  });
  test("check if the ship receives an attack when hit", () => {
    const ship = new Ship(4);
    gameboard.placeShip(ship, 0, 0, false);
    gameboard.receiveAttack(0, 1);
    expect(ship.hits).toBe(1);
  });

  test("check if ship sinks when attacked enough times", () => {
    const ship = new Ship(4);
    gameboard.placeShip(ship, 0, 0, false);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 2);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 3);
    expect(ship.isSunk()).toBe(true);
  });
  test("check if the board knows when all ships are sunk", () => {
    // Create a mock Ship class
    const Ship = jest.fn();

    // Mock the isSunk method
    Ship.mockImplementation(() => {
      return {
        isSunk: jest.fn(),
      };
    });

    const ship1 = new Ship();
    const ship2 = new Ship();

    // Set the return values for isSunk
    ship1.isSunk.mockReturnValue(true);
    ship2.isSunk.mockReturnValue(true);

    // Place ships on the gameboard
    gameboard.placeShip(ship1, 0, 0, true);
    gameboard.placeShip(ship2, 9, 0, false);

    // Check if all ships are sunk
    expect(gameboard.sunkAllShips(ship1, ship2)).toBe(true);
  });
  test("check if the board knows if not all ships are sunk", () => {
    const Ship = jest.fn();
    Ship.mockImplementation(() => {
      return {
        isSunk: jest.fn(),
      };
    });
    const ship1 = new Ship();
    const ship2 = new Ship();

    // Set the return values for isSunk
    ship1.isSunk.mockReturnValue(true);
    ship2.isSunk.mockReturnValue(false);
    // Place ships on the gameboard
    gameboard.placeShip(ship1, 0, 0, true);
    gameboard.placeShip(ship2, 9, 0, false);

    // Check if all ships are sunk
    expect(gameboard.sunkAllShips(ship1, ship2)).toBe(false);
  });
});

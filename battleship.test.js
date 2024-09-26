const Ship = require("./battleship");

describe("Ship", () => {
  test("create a ship with a length and is not sunk", () => {
    const ship = new Ship(4);

    expect(ship.length).toBe(4);
    expect(ship.isSunk()).toBe(false);
  });
});

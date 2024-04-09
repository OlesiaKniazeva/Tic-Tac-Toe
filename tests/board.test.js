import { createBoard, createCell } from "../src/board";

describe("createBoard", () => {
  const board = createBoard;

  beforeEach(() => {
    board.resetBoard();
  });

  it("should initialize all cells with *", () => {
    board.getRawBoard().forEach((row) => {
      row.forEach((cell) => {
        expect(cell.getSymbol()).toBe("*");
      });
    });
  });

  it("should update the board with a cell", () => {
    const cell = createCell();
    cell.setSymbol("x");
    board.updateBoard([0, 0], cell);
    expect(board.getRawBoard()[0][0]).toEqual(cell);
  });

  it("should count the number of filled cells", () => {
    const cell = createCell();
    cell.setSymbol("x");

    board.updateBoard([0, 0], cell);
    board.updateBoard([1, 1], cell);
    board.updateBoard([2, 1], cell);

    let filledCells = 0;
    board.getRawBoard().forEach((row) => {
      row.forEach((cell) => {
        if (cell.getSymbol() !== "*") {
          filledCells++;
        }
      });
    });

    expect(filledCells).toBe(3);
  });

  it("Should return all available three signs in a row — horisontal, diagonal, vertical", () => {
    const cell = createCell();
    cell.setSymbol("x");

    board.updateBoard([0, 0], cell);
    board.updateBoard([1, 1], cell);
    board.updateBoard([2, 2], cell);

    let rows = board.getRows([0, 0]);
    const expectedRows = [
      ["x", "*", "*"],
      ["x", "*", "*"],
      ["x", "x", "x"],
    ];

    expect(rows.length).toEqual(expectedRows.length);
    expect(rows).toEqual(expect.arrayContaining(expectedRows));
  });

  it("Should return all available three signs in a row — horisontal, diagonal, vertical2", () => {
    const cell = createCell();
    cell.setSymbol("x");

    board.updateBoard([0, 0], cell);
    board.updateBoard([1, 1], cell);
    board.updateBoard([2, 2], cell);

    let rows = board.getRows([1, 1]);
    
    const expectedRows = [
      ["*", "x", "*"],
      ["*", "x", "*"],
      ["x", "x", "x"],
      ["*", "x", "*"],
    ];

    expect(rows.length).toEqual(expectedRows.length);
    expect(rows).toEqual(expect.arrayContaining(expectedRows));
  });
});

describe("createCell", () => {
  it("should create a cell with initial value null", () => {
    const cell = createCell();
    expect(cell.getSymbol()).toBe("*");
    cell.setSymbol("v");
    expect(cell.getSymbol()).toBe("v");
    cell.resetCell();
    expect(cell.getSymbol()).toBe("*");
  });
});

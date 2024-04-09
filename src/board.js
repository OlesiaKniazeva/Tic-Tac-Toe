export const createBoard = (function () {
  const boardSide = 3;
  const maxCellsAmount = boardSide * boardSide;

  const board = Array(boardSide)
    .fill()
    .map(() =>
      Array(boardSide)
        .fill()
        .map(() => createCell())
    );

  let filledCellsAmount = 0;

  const getFilledCellsAmount = () => {
    return filledCellsAmount;
  };

  const getMaxCellsAmount = () => {
    return maxCellsAmount;
  };

  const getRowsWithCoordinates = (cellCoordinates) => {
    const [x, y] = cellCoordinates;

    let horisontalRow = board[x].map((cell, index) => ({
      symbol: cell.getSymbol(),
      coordinates: [x, index],
    }));
    let verticalRow = board.map((row, index) => ({ symbol: row[y].getSymbol(), coordinates: [index, y] }));

    let rows = [horisontalRow, verticalRow];

    if (x === y) {
      const diagonalFromLeftTop = board.map((row, index) => ({ symbol: row[index].getSymbol(), coordinates: [index, index] }));
      rows.push(diagonalFromLeftTop);
    }

    if (x + y === boardSide - 1) {
      const diagonalFromRightTop = board.map((row, index) => ({ symbol: row[boardSide - 1 - index].getSymbol(), coordinates: [index, boardSide - 1 - index] }));
      rows.push(diagonalFromRightTop);
    }

    return rows;
  };

  const getRawBoard = () => {
    return board;
  };

  const updateBoard = (cellCoordinates, cell) => {
    if (
      cellCoordinates[0] < 0 ||
      cellCoordinates[1] < 0 ||
      cellCoordinates[0] > boardSide ||
      cellCoordinates[1] > boardSide
    ) {
      throw Error("Passing invalid cell coordinate");
    }
    board[cellCoordinates[0]][cellCoordinates[1]] = cell;
    filledCellsAmount++;
  };

  const resetBoard = () => {
    board.forEach((row) => {
      row.forEach((cell) => {
        cell.resetCell();
      });
    });
    filledCellsAmount = 0;
  };

  return {
    updateBoard,
    getFilledCellsAmount,
    getMaxCellsAmount,
    getRawBoard,
    getRowsWithCoordinates,
    resetBoard,
  };
})();

export function createCell() {
  let symbol = null;

  const getSymbol = () => symbol || "*";

  const setSymbol = (newSymbol) => {
    symbol = newSymbol;
  };

  const resetCell = () => {
    symbol = null;
  };

  return { getSymbol, setSymbol, resetCell };
}

// const board = createBoard;
// console.log(board.getBoardDisplay());

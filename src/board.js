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

  const getBoardDisplay = () => {
    let data = board.map((row) => row.map((cell) => cell.getSymbol()).join(" "));
    return data.join("\n");
  };

  const getRows = (cellCoordinates) => {
    const [x, y] = cellCoordinates;

    let horisontalRow = board[x].map(cell => cell.getSymbol());
    let verticalRow = board.map(row => row[y].getSymbol());

    let rows = [horisontalRow, verticalRow];

    if (x === y) {
      const diagonalFromLeftTop = board.map((row, index) => row[index].getSymbol());
      rows.push(diagonalFromLeftTop);
    }
  
    if (x + y === boardSide - 1) {
      const diagonalFromRightTop = board.map((row, index) => row[boardSide - 1 - index].getSymbol());
      rows.push(diagonalFromRightTop);
    }
  
    return rows;
  }

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
      throw Error('Passing invalid cell coordinate');
    }
      board[cellCoordinates[0]][cellCoordinates[1]] = cell;
    filledCellsAmount++;
  };

  const resetBoard = () => {
    board.forEach(row => {
      row.forEach(cell => {
        cell.resetCell();
      });
    });
    filledCellsAmount = 0;
  }

  return {
    getBoardDisplay,
    updateBoard,
    getFilledCellsAmount,
    getMaxCellsAmount,
    getRawBoard,
    getRows,
    resetBoard
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
  }

  return { getSymbol, setSymbol, resetCell };
}

// const board = createBoard;
// console.log(board.getBoardDisplay());

import { createPlayer } from "./player.js";
import { createBoard, createCell } from "./board.js";

const gameController = (function () {
  const board = createBoard;
  let player1;
  let player2;

  let activePlayer = null;
  let winner = null;
  let winningCoordinates = null;
  let gameState = "playing";

  function getActivePlayer() {
    return activePlayer;
  }

  function changeActivePlayer() {
    activePlayer = activePlayer === player1 ? player2 : player1;
  }

  function isGameOver() {
    return gameState === "draw" || gameState === "won";
  }

  function getGameResults() {
    if (gameState === "won") {
      return {gameState, winner, winningCoordinates};
    } else if (gameState === "draw") {
      return {gameState};
    }
  }

  function resetGame() {
    winner = null;
    gameState = "playing";
    board.resetBoard();
  }

  function startNewGame(player1Name = "Player1", player2Name = "Player2", activePlayerName = player1Name) {
    player1 = createPlayer(player1Name, "x");
    player2 = createPlayer(player2Name, "o");
    activePlayer = (activePlayerName === player1Name) ? player1 : player2;
    console.log(activePlayer.getName(), activePlayer.getId(), activePlayer.getSymbol());
    
    resetGame();
  }

  function getWinningCoordinates(rows, symbol) {
    for (let row of rows) {
      if (row.every((cell) => cell.symbol === symbol)) {
        return { start: row[0].coordinates, end: row[row.length - 1].coordinates };
      }
    }
    return null;
  }

  function isWinningMove(cellCoordinates, symbol) {

    const rows = board.getRowsWithCoordinates(cellCoordinates);

    return getWinningCoordinates(rows, symbol);
  }

  function isDraw() {
    return board.getFilledCellsAmount() === board.getMaxCellsAmount();
  }

  function checkCoordinatesData(coordinates) {
    if (!Array.isArray(coordinates) || coordinates.length !== 2) {
      throw new Error(
        "Invalid coordinates: must be an array with two elements"
      );
    }

    if (
      typeof coordinates[0] !== "number" ||
      typeof coordinates[1] !== "number"
    ) {
      throw new Error("Invalid coordinates: both elements must be numbers");
    }
  }

  function playRound(cellCoordinates) {
    checkCoordinatesData(cellCoordinates);
    let cell = createCell();
    cell.setSymbol(activePlayer.getSymbol());
    board.updateBoard(cellCoordinates, cell);
    
    let coordinates = isWinningMove(cellCoordinates, cell.getSymbol())
    if (coordinates) {
      winner = activePlayer;
      gameState = "won";
      winningCoordinates = coordinates;
    } else if (isDraw()) {
      gameState = "draw";
    }
    
    changeActivePlayer();

  }

  return {
    startNewGame,
    isGameOver,
    getGameResults,
    playRound,
    getActivePlayer,
  };
})();

export const game = gameController;

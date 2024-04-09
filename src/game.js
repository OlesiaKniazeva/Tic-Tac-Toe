import { createPlayer } from "./player.js";
import { createBoard, createCell } from "./board.js";

const gameController = (function () {
  const board = createBoard;
  let player1;
  let player2;

  let activePlayer = null;
  let winner = null;
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

  function showGameResults() {
    if (gameState === "won") {
      console.log(`Winner of this game is ${winner}`);
    } else if (gameState === "draw") {
      console.log("It's a draw!");
    }
  }

  function resetGame() {
    winner = null;
    gameState = "playing";
    board.resetBoard();
  }

  function startNewGame(player1Name = "Player1", player2Name = "Player2", activePlayerName = player1Name) {
    player1 = createPlayer(player1Name, "×");
    player2 = createPlayer(player2Name, "o");
    activePlayer = (activePlayerName === player1Name) ? player1 : player2;
    console.log(activePlayer.getName(), activePlayer.getId(), activePlayer.getSymbol());
    
    resetGame();
  }

  function hasThreeInRow(rows, symbol) {
    for (let row of rows) {
      if (row.every((cellSymbol) => cellSymbol === symbol)) {
        return true;
      }
    }
    return false;
  }

  function isWinningMove(cellCoordinates, symbol) {
    // console.log(cellCoordinates, symbol);

    const rows = board.getRows(cellCoordinates);
    // console.log(rows);

    if (hasThreeInRow(rows, symbol)) {
      return true;
    }
    return false;
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

    if (isWinningMove(cellCoordinates, cell.getSymbol())) {
      winner = activePlayer;
      gameState = "won";
    } else if (isDraw()) {
      gameState = "draw";
    }
    
    changeActivePlayer();

    // console.log(board.getBoardDisplay());
  }

  return {
    startNewGame,
    isGameOver,
    showGameResults,
    playRound,
    getActivePlayer,
  };
})();

export const game = gameController;
// game.startNewGame();

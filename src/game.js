import { createPlayer } from "./player.js";
import { createBoard, createCell } from "./board.js";

const gameController = (function () {

  const board = createBoard;
  const player1 = createPlayer("Masha", "x");
  const player2 = createPlayer("Nata", "o");

  let activePlayer = player1;
  let winner = null;
  let gameState = "playing";

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

  function reset() {
    winner = null;
    gameState = "playing";
    activePlayer = player1
    board.resetBoard();
  }

  function startNewGame() {
    reset();
    startTheGame();
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
    return board.getFilledCellsAmount === board.getMaxCellsAmount;
  }

  function sendPlayerChoice() {

  }

  function playRound() {
        let answer = sendPlayerChoice();
        let cellCoordinates = answer.split(" ").map((el) => Number(el));
        let cell = createCell();
        cell.setSymbol(activePlayer.getSymbol());
        board.updateBoard(cellCoordinates, cell);

        if (isWinningMove(cellCoordinates, cell.getSymbol())) {
          winner = activePlayer;
          gameState = "won";
          return;
        } else if (isDraw()) {
          gameState = "draw";
          return;
        } else {
          changeActivePlayer();
          playRound();
        }

        console.log(board.getBoardDisplay());
  }

  function startTheGame() {
    console.log("Start The Game");
    console.log(board.getBoardDisplay());
    console.log(
      `We have two players: ${player1.getName()} and ${player2.getName()}`
    );
    console.log(`It's ${player1.getName()}'s turn to choose!`);
    playRound();
    console.log("Game results ", gameState, winner);
    if (isGameOver()) {
      console.log(board.getBoardDisplay());
      console.log("Game results ", gameState, winner);

      
      showGameResults();
      // startNewGame();
    }
  }

  return { startNewGame, sendPlayerChoice, isGameOver, showGameResults, playRound };
})();

export const game = gameController;
game.startTheGame();

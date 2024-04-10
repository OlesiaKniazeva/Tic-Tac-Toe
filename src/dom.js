import { game } from "./game.js";

const displayController = (function () {
  const initialMessage =
    "Choose player and start the game or set players names";

  let player1Input;
  let player2Input;

  let gameStarted = false;

  let player1Button;
  let player2Button;

  let player1Container;
  let player2Container;

  let boardCells;
  let messageToUsers;

  let gameOverScreen;
  let boardContainer;

  function initEventListeners() {
    const body = document.body;
    boardContainer = document.querySelector(".board-container");
    boardCells = document.querySelectorAll(".board-container .board-cell");
    messageToUsers = document.querySelector(".user-turn-message");

    player1Input = document.getElementById("first-user");
    player2Input = document.getElementById("second-user");
    player1Button = document.querySelector(".first-user .user-symbol");
    player2Button = document.querySelector(".second-user .user-symbol");
    player1Container = document.querySelector(".user.first-user");
    player2Container = document.querySelector(".user.second-user");

    gameOverScreen = document.querySelector(".game-over-screen");

    setUsersMessage(initialMessage);

    body.addEventListener("click", processClicks);
    body.addEventListener("change", changeNameAndMessage);
  }

  function getTurnMessage(userName) {
    return `It's ${userName} turn`;
  }

  function changeNameAndMessage(event) {
    const player1Name = getFirstUserName();
    const player2Name = getSecondUserName();

    if (
      event.target === player1Input &&
      event.target.parentNode.classList.contains("active-user")
    ) {
      setUsersMessage(getTurnMessage(player1Name));
    }
    if (
      event.target === player2Input &&
      event.target.parentNode.classList.contains("active-user")
    ) {
      setUsersMessage(getTurnMessage(player2Name));
    }
  }

  function getSecondUserName() {
    const player2Name = player2Input.value || "Player2";

    return player2Name;
  }

  function getFirstUserName() {
    const player1Name = player1Input.value || "Player1";

    return player1Name;
  }

  function disableUsersInputs() {
    player1Input.disabled = true;
    player2Input.disabled = true;
  }

  function enableUsersInputs() {
    player1Input.disabled = false;
    player2Input.disabled = false;
  }

  function disableUsersButtons() {
    player1Button.disabled = true;
    player2Button.disabled = true;
  }

  function enableUsersButtons() {
    player1Button.disabled = false;
    player2Button.disabled = false;
  }

  function getActivePlayerName() {
    return player1Container.classList.contains("active-user")
      ? getFirstUserName()
      : getSecondUserName();
  }

  function resetDisplay() {
    boardCells.forEach((boardCell) => {
      boardCell.disabled = false;
      boardCell.classList.remove("first-user-symbol", "second-user-symbol");
    });
  }

  function toggleActiveUser(container) {
    console.log(container);

    if (container.classList.contains("active-user")) {
      return;
    }
    player2Container.classList.remove("active-user");
    player1Container.classList.remove("active-user");

    container.classList.add("active-user");
  }

  function setUsersMessage(message) {
    messageToUsers.style.opacity = "0";
    setTimeout(() => {
      messageToUsers.textContent = message;
      messageToUsers.style.opacity = "1";
    }, 120);
  }

  function updateActivePlayerInInterface(activePlayerName) {
    if (activePlayerName === getFirstUserName()) {
      toggleActiveUser(player1Container);
    } else {
      toggleActiveUser(player2Container);
    }
  }

  function showSymbol(button, symbol) {
    if (symbol === "x") {
      button.classList.add("first-user-symbol");
    } else if (symbol === "o") {
      button.classList.add("second-user-symbol");
    }
  }

  function getCoordinate(rectangleData, boardRectData) {
    const x = rectangleData.left + rectangleData.width / 2 - boardRectData.left;
    const y = rectangleData.top + rectangleData.height / 2 - boardRectData.top;

    return [x, y];
  }

  function drawWinningLine(startButtonCoordinate, endButtonCoordinate) {
    console.log(startButtonCoordinate, endButtonCoordinate);
    const buttonStartID = startButtonCoordinate.join("-");
    const buttonEndID = endButtonCoordinate.join("-");

    const buttonStart = document.getElementById(buttonStartID);
    const buttonEnd = document.getElementById(buttonEndID);
    console.log(buttonStart);
    console.log(buttonEnd);

    const rectStart = buttonStart.getBoundingClientRect();
    const rectEnd = buttonEnd.getBoundingClientRect();
    const boardRectData = boardContainer.getBoundingClientRect();
    console.log("board-rect", boardRectData);

    console.log(rectStart);
    console.log(rectEnd);

    const [x1, y1] = getCoordinate(rectStart, boardRectData);
    const [x2, y2] = getCoordinate(rectEnd, boardRectData);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.position = "absolute";
    svg.style.top = 0;
    svg.style.left = 0;
    svg.style.pointerEvents = "none";

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "red");
    line.setAttribute("stroke-width", 10);

    svg.appendChild(line);
    boardContainer.appendChild(svg);
    removeElementAfterSomeTime(svg, 2000);
  }

  function removeElementAfterSomeTime(element, delay) {
    setTimeout(() => {
      element.remove();
    }, delay);
  }

  function resetActivePlayer() {
    player2Container.classList.remove("active-user");
    player1Container.classList.remove("active-user");
    player1Container.classList.add("active-user");
  }

  function changeActiveUser(userSwitchButton) {
    toggleActiveUser(userSwitchButton.parentNode);
    if (userSwitchButton.classList.contains("first")) {
      setUsersMessage(getTurnMessage(getFirstUserName()));
    } else if (userSwitchButton.classList.contains("second")) {
      setUsersMessage(getTurnMessage(getSecondUserName()));
    }
  }

  function restartGame(firstName, secondName) {
    console.log("restart-the-game");

    resetActivePlayer();
    let activePlayerName = getActivePlayerName();
    console.log(activePlayerName);
    setUsersMessage(getTurnMessage(activePlayerName));
    game.startNewGame(firstName, secondName, activePlayerName);
    gameStarted = false;
    enableUsersInputs();
    enableUsersButtons();
    resetDisplay();
  }

  function startGame(firstName, secondName) {
    let activePlayerName = getActivePlayerName();

    gameStarted = true;
    disableUsersInputs();
    disableUsersButtons();
    game.startNewGame(firstName, secondName, activePlayerName);
  }

  function finishGame() {
    console.log("Game finished");
    let gameData = game.getGameResults();
    console.log(gameData);

    if (gameData.gameState === "won") {
      drawWinningLine(
        gameData.winningCoordinates.start,
        gameData.winningCoordinates.end
      );
    } else if (gameData.gameState === "draw") {
      console.log("pppp");
    }
  }

  function playGame(cellButton, firstName, secondName) {
    if (!gameStarted) {
      startGame(firstName, secondName);
    }
    const cellID = cellButton.id;
    const cellCoordinates = cellID.split("-").map(Number);

    let player = game.getActivePlayer();
    console.log(player.getId(), player.getName(), player.getSymbol());

    showSymbol(cellButton, player.getSymbol());

    console.log(player.getSymbol());

    cellButton.disabled = true;
    console.log(player);

    game.playRound(cellCoordinates);

    let newActivePlayerName = game.getActivePlayer().getName();
    updateActivePlayerInInterface(newActivePlayerName);
    setUsersMessage(getTurnMessage(newActivePlayerName));

    if (game.isGameOver()) {
      finishGame();
    }
  }

  function processClicks(event) {
    const firstName = getFirstUserName();
    const secondName = getSecondUserName();

    console.log(event.target);

    if (event.target.classList.contains("user-symbol")) {
      changeActiveUser(event.target);
    } else if (event.target.classList.contains("restart-game")) {
      restartGame(firstName, secondName);
    } else if (event.target.classList.contains("board-cell")) {
      playGame(event.target, firstName, secondName);
    }
  }

  document.addEventListener("DOMContentLoaded", initEventListeners);
})();

displayController;

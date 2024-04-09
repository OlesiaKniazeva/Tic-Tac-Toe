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

  function initEventListeners() {
    const body = document.body;
    boardCells = document.querySelectorAll(".board-container .board-cell");
    messageToUsers = document.querySelector(".user-turn-message");

    player1Input = document.getElementById("first-user");
    player2Input = document.getElementById("second-user");
    player1Button = document.querySelector(".first-user .user-symbol");
    player2Button = document.querySelector(".second-user .user-symbol");
    player1Container = document.querySelector(".user.first-user");
    player2Container = document.querySelector(".user.second-user");

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
      boardCell.classList.remove('first-user-symbol', 'second-user-symbol');
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
    // messageToUsers.textContent = message;
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
    console.log(symbol);
    
    if (symbol === "x") {
      button.classList.add("first-user-symbol");
    } else if (symbol === "o") {
      button.classList.add("second-user-symbol");
    }
  }

  function drawWinningLine(coordinate1, coordinate2) {

  }

  function resetActivePlayer() {
    player2Container.classList.remove("active-user");
    player1Container.classList.remove("active-user");
    player1Container.classList.add("active-user");
  }

  function processClicks(event) {
    const firstName = getFirstUserName();
    const secondName = getSecondUserName();

    console.log(event.target);

    if (event.target.classList.contains("user-symbol")) {
      toggleActiveUser(event.target.parentNode);
      if (event.target.classList.contains("first")) {
        setUsersMessage(getTurnMessage(getFirstUserName()));
      } else if (event.target.classList.contains("second")) {
        setUsersMessage(getTurnMessage(getSecondUserName()));
      }
    }

    if (event.target.classList.contains("restart-game")) {
      console.log("restart-the-game");

      resetActivePlayer();
      let activePlayerName = getActivePlayerName();
      console.log(activePlayerName);
      setUsersMessage(getTurnMessage(activePlayerName))
      game.startNewGame(firstName, secondName, activePlayerName);
      gameStarted = false;
      enableUsersInputs();
      enableUsersButtons();
      resetDisplay();
    }

    if (event.target.classList.contains("board-cell")) {
      if (!gameStarted) {
        let activePlayerName = getActivePlayerName();

        gameStarted = true;
        disableUsersInputs();
        disableUsersButtons();
        game.startNewGame(firstName, secondName, activePlayerName);
      }
      const cellID = event.target.id;
      const cellCoordinates = cellID.split("-").map(Number);

      let player = game.getActivePlayer();
      console.log(player.getId(), player.getName(), player.getSymbol());

      showSymbol(event.target, player.getSymbol());

      // event.target.textContent = player.getSymbol();
      console.log(player.getSymbol());

      event.target.disabled = true;
      console.log(player);

      game.playRound(cellCoordinates);

      let newActivePlayerName = game.getActivePlayer().getName();
      updateActivePlayerInInterface(newActivePlayerName);
      setUsersMessage(getTurnMessage(newActivePlayerName));

      if (game.isGameOver()) {
        console.log("Game finished");
        let gameData = game.getGameResults();
        console.log(gameData);
        
      }
    }
  }

  document.addEventListener("DOMContentLoaded", initEventListeners);
})();

displayController;

const createPlayerFactory = (function () {
  let playerIdCounter = 0;

  return function (name = `Player${playerIdCounter}`, symbol) {
    const playerId = playerIdCounter++;
    const player = {
      id: playerId,
      name,
      symbol,
    };

    function getId() {
      return player.id;
    }

    function getName() {
      return player.name;
    }

    function getSymbol() {
      return player.symbol;
    }

    return { getId, getName, getSymbol };
  };
})();

export const createPlayer = createPlayerFactory;

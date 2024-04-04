const createPlayerFactory = (function() {
  let playerIdCounter = 0;

  return function(name = `Player${playerIdCounter}`, sign) {
    const playerId = playerIdCounter++;
    return {
      id: playerId,
      name,
      sign
    };
  };
})();

export const createPlayer = createPlayerFactory;

const masha = createPlayer("Masha", 'x');
console.log(masha);

const nata = createPlayer('Nata', 'o');
console.log(nata);



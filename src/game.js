import { createPlayer } from './player.js';

const gameController = (function() {
  console.log("Start The Game");
  
  const player1 = createPlayer('Masha', 'x');
  const player2 = createPlayer('Nata', 'o');
  console.log(player1);
  console.log(player2);
  
  

})();


gameController;



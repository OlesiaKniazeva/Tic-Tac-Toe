import { createBoard, createCell } from "../src/board";
import { createPlayer } from '../src/player';
import { game } from "../src/game";

jest.mock('../src/game', () => ({
  ...jest.requireActual('../src/game',),
  getPlayerChoice: jest.fn(),
}));

beforeEach(() => {
  game.reset();
});



it('should declare the active player as the winner if they make a winning move', () => {
  game.getPlayerChoice()
    .mockReturnValueOnce('0 0')  
    .mockReturnValueOnce('0 1')
    .mockReturnValueOnce('1 1')
    .mockReturnValueOnce('0 2')
    .mockReturnValueOnce('2 2');

  game.startTheGame();

  expect
});
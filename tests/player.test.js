import { createPlayer } from '../src/player';

describe('createPlayer', () => {
  it('should create a player object with the given name and symbol', () => {
    const player = createPlayer('Masha', 'x');
    expect(player.getName()).toBe('Masha');
    expect(player.getSymbol()).toBe('x');
    expect(player.getId()).toBe(0);

    const player2 = createPlayer('Dodo', 'o');
    expect(player2.getName()).toBe('Dodo');
    expect(player2.getSymbol()).toBe('o');
    expect(player2.getId()).toBe(1);
  });
});

import { game } from "../src/game";

describe("game-tests", () => {
  it("should declare the active player as the winner if they make a winning move", () => {
    game.startNewGame();
    expect(game.getActivePlayer().getName()).toBe("Player1");
    expect(game.isGameOver()).toBe(false);

    game.playRound([0, 0]);
    expect(game.getActivePlayer().getName()).toBe("Player2");
    expect(game.isGameOver()).toBe(false);
    game.playRound([1, 0]);
    expect(game.getActivePlayer().getName()).toBe("Player1");
    expect(game.isGameOver()).toBe(false);
    game.playRound([1, 1]);
    expect(game.getActivePlayer().getName()).toBe("Player2");
    expect(game.isGameOver()).toBe(false);
    game.playRound([1, 2]);
    expect(game.getActivePlayer().getName()).toBe("Player1");
    expect(game.isGameOver()).toBe(false);
    game.playRound([2, 2]);
    expect(game.isGameOver()).toBe(true);
  });

  it("should declare a draw if all cells are filled and no player has won", () => {
    game.startNewGame();

    game.playRound([0, 0]);
    game.playRound([0, 1]);
    game.playRound([0, 2]);
    game.playRound([1, 0]);
    game.playRound([1, 2]);
    game.playRound([1, 1]);
    game.playRound([2, 0]);
    game.playRound([2, 2]);
    expect(game.isGameOver()).toBe(false);
    game.playRound([2, 1]);
    expect(game.isGameOver()).toBe(true);
  });
});

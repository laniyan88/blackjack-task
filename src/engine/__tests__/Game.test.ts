import { Game } from "../Game";
import { Deck } from "../Deck";
import { deck, H, S, C, D } from "../../test/builders";

describe("Game.playOneRound", () => {
  it("both have blackjack → Dealer wins", () => {
    // Order: P1,P2,D1,D2 -> player 21, dealer 21
    const g = new Game(new Deck(deck(H("A"), H("10"), S("A"), S("10"))), "Player");
    const r = g.playOneRound();
    expect(r.winner).toBe("Dealer");
  });

  it("player blackjack only → player wins", () => {
    const g = new Game(new Deck(deck(H("A"), H("10"), S("9"), S("9"))), "Player");
    const r = g.playOneRound();
    expect(r.winner).toBe("Player");
  });

  it("player draws to 17+, bust → Dealer wins", () => {
    // Player: 9,6 (=15) then draws 9 (=24 bust)
    const g = new Game(new Deck(deck(H("9"), H("6"), S("8"), S("7"), C("9"))), "P");
    const r = g.playOneRound();
    expect(r.winner).toBe("Dealer");
  });

  it("player stands at 17; dealer draws until strictly higher or busts", () => {
    // Player: 10,7 (=17 stop)
    // Dealer: 10,6 (=16), draws K (=26) → Player wins
    const g = new Game(new Deck(deck(H("10"), C("7"), S("10"), D("6"), C("K"))), "P");
    const r = g.playOneRound();
    expect(r.winner).toBe("P");
  });

  it("dealer stops when strictly higher → Dealer wins", () => {
    // Player: 9,7 (=16), draws 2 (=18 stop)
    // Dealer: 9,8 (=17) ≤18 → draws 2 (=19) → Dealer wins
    const g = new Game(new Deck(deck(H("9"), H("7"), S("9"), S("8"), D("2"), C("2"))), "P");
    const r = g.playOneRound();
    expect(r.winner).toBe("Dealer");
  });
});

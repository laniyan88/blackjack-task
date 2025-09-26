import { Formatter } from "../Formatter";
import { Scoring } from "../Scoring";
import type { Card, GameResult, HandState } from "../../types";
import { H, S } from "../../test/builders";

describe("Formatter", () => {
  it("formats single card and hand line", () => {
    const c: Card = H("A");
    expect(Formatter.card(c)).toBe("HA");

    const hand = { name: "Dealer", cards: [S("7"), S("10"), H("J")] };
    const score = Scoring.handScore(hand.cards);
    expect(Formatter.hand(hand)).toBe(`Dealer | ${score} | S7,S10,HJ`);
  });


  it("outputs the exact 4-line block", () => {
    const result: GameResult = {
      winner: "Ivar",
      dealer: { name: "Dealer", cards: [S("7"), S("10"), H("J")] },
      player: { name: "Ivar",   cards: [H("2"), H("2"), S("6"), H("9")] },
    };
    const out = Formatter.output(result);
    expect(out).toBe(
`Winner: Ivar

Dealer | ${Scoring.handScore(result.dealer.cards)} | S7,S10,HJ
Ivar | ${Scoring.handScore(result.player.cards)} | H2,H2,S6,H9`
    );
  });

  it("masks hand when hideHole is true (score '?' and only upcard)", () => {
    const dealer: HandState = {
      name: "Dealer",
      cards: [S("10"), H("J")],
      hideHole: true,
    };
    expect(Formatter.hand(dealer)).toBe("Dealer | ? | S10");
  });

  it("output() respects hideHole on dealer but shows full player", () => {
    const dealer: HandState = {
      name: "Dealer",
      cards: [S("7"), S("10"), H("J")],
      hideHole: true,
    };
    const player: HandState = {
      name: "Ivar",
      cards: [H("2"), H("2"), S("6"), H("9")],
    };

    const result: GameResult = {
      winner: "Ivar",
      dealer,
      player,
    };

    const expectedPlayerScore = Scoring.handScore(player.cards);
    const out = Formatter.output(result);

    expect(out).toBe(
`Winner: Ivar

Dealer | ? | S7
Ivar | ${expectedPlayerScore} | H2,H2,S6,H9`
    );
  });
});

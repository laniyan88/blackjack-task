import { Scoring } from "../Scoring";
import { H, S } from "../../test/builders";

describe("Scoring", () => {
  it("face cards = 10, A = 11, numbers = face value", () => {
    expect(Scoring.cardPoints(H("J"))).toBe(10);
    expect(Scoring.cardPoints(H("Q"))).toBe(10);
    expect(Scoring.cardPoints(H("K"))).toBe(10);
    expect(Scoring.cardPoints(H("A"))).toBe(11);
    expect(Scoring.cardPoints(H("7"))).toBe(7);
  });

  it("handScore sums values", () => {
    expect(Scoring.handScore([H("10"), S("A")])).toBe(21);
  });

  it("isBlackjack only for 2 cards totaling 21", () => {
    expect(Scoring.isBlackjack([H("10"), S("A")])).toBe(true);
    expect(Scoring.isBlackjack([H("10"), S("A"), H("2")])).toBe(false);
  });

  it("isBust when score > 21", () => {
    expect(Scoring.isBust([H("10"), H("K"), H("2")])).toBe(true);
  });
});

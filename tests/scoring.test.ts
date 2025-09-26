import { describe, it, expect } from "vitest";
import { handScore, isBlackjack, isBust, cardPoints } from "../src/scoring";


const c = (suit: any, value: any) => ({ suit, value });


describe("scoring", () => {
it("face cards are 10", () => {
expect(cardPoints(c("SPADES","J"))).toBe(10);
expect(cardPoints(c("SPADES","Q"))).toBe(10);
expect(cardPoints(c("SPADES","K"))).toBe(10);
});


it("ace is 11 per spec", () => {
expect(cardPoints(c("HEARTS","A"))).toBe(11);
});


it("blackjack only with two cards totalling 21", () => {
expect(isBlackjack([c("S","A"), c("H","10")] as any)).toBe(true);
expect(isBlackjack([c("S","A"), c("H","9"), c("D","A")] as any)).toBe(false);
});


it("bust over 21", () => {
expect(isBust([c("S","10"), c("H","9"), c("D","5")] as any)).toBe(true);
expect(isBust([c("S","10"), c("H","9")] as any)).toBe(false);
});


it("handScore sums correctly", () => {
expect(handScore([c("S","2"), c("H","3"), c("D","A")] as any)).toBe(16);
});
});
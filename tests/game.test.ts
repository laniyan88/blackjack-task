import { describe, it, expect } from "vitest";
import { playRound } from "../src/game";


const C = (suit: any, value: any) => ({ suit, value });


describe("game", () => {
it("dealer wins if both have initial blackjack", () => {
const deck = [
// Player: A,10 Dealer: A,10 (order: player,player,dealer,dealer)
C("SPADES","A"), C("HEARTS","10"), C("CLUBS","A"), C("DIAMONDS","10"),
];
const r = playRound(deck);
expect(r.winner).toBe("Dealer");
});


it("player bust means dealer wins immediately", () => {
const deck = [
// player: 10,6 then draws 10 -> bust 26
C("S","10"), C("H","6"), C("C","5"), C("D","5"), // initial: p10, p6, d5, d5
C("S","10"), // player draw -> bust
];
const r = playRound(deck);
expect(r.winner).toBe("Dealer");
});


it("dealer draws to beat player's 17+ or busts", () => {
const deck = [
// Player: 9,8 = 17 (stays). Dealer: 7,7=14, draws 8 -> 22 bust
C("S","9"), C("H","8"), C("C","7"), C("D","7"),
C("S","8"),
];
const r = playRound(deck);
expect(r.winner).toBe("Ivar");
});
});
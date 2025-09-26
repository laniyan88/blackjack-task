import type { Card } from "../types";

export class Scoring {
  static cardPoints(card: Card): number {
    const v = card.value;
    if (v === "J" || v === "Q" || v === "K") return 10;
    if (v === "A") return 11;
    return Number(v);
  }

  static handScore(cards: Card[]): number {
    return cards.reduce((sum, c) => sum + Scoring.cardPoints(c), 0);
  }

  static isBlackjack(cards: Card[]): boolean {
    return cards.length === 2 && Scoring.handScore(cards) === 21;
  }

  static isBust(cards: Card[]): boolean {
    return Scoring.handScore(cards) > 21;
  }
}

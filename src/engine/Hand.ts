import type { Card } from "../types";
import { Scoring } from "./Scoring";

export class Hand {
  readonly cards: Card[] = [];
  constructor(public readonly name: string) {}

  add(card: Card) { this.cards.push(card); }
  addTwo(c1: Card, c2: Card) { this.cards.push(c1, c2); }

  score(): number { return Scoring.handScore(this.cards); }
  isBlackjack(): boolean { return Scoring.isBlackjack(this.cards); }
  isBust(): boolean { return Scoring.isBust(this.cards); }
}

import type { Card } from "../types";

export class Deck {
  constructor(private cards: Card[]) {}

  draw(): Card {
    if (this.cards.length === 0) throw new Error("Deck is empty");
    return this.cards.shift()!;
  }

  remaining(): number { return this.cards.length; }
}

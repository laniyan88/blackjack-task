import type { Card, HandState, GameResult } from "../types";
import { Scoring } from "./Scoring";

const suitMap: Record<Card["suit"], string> = {
  HEARTS: "H", SPADES: "S", CLUBS: "C", DIAMONDS: "D",
};

export class Formatter {
  static card(c: Card): string {
    return `${suitMap[c.suit]}${c.value}`;
  }

  static hand(h: HandState): string {
    const hidden = h.hideHole
    const score = Scoring.handScore(h.cards);
    const cardList = hidden ? h.cards.slice(0,1) : h.cards
    const list = cardList.map(Formatter.card).join(",");
    return `${h.name} | ${hidden ? "?" : score} | ${list}`;
  }

  static output(r: GameResult): string {
    return [`Winner: ${r.winner}`, "", Formatter.hand(r.dealer), Formatter.hand(r.player)].join("\n");
  }
}

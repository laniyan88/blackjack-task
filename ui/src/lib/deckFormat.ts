import type { Card } from "./types";

const suitLetter = (s: Card["suit"]) =>
  ({ HEARTS:"H", SPADES:"S", CLUBS:"C", DIAMONDS:"D" }[s]);

export const fmtCards = (cs: Card[]) =>
  cs.map(c => `${suitLetter(c.suit)}${c.value}`).join(",");

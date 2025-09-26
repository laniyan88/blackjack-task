import type { Card } from "../types";

export const H = (value: Card["value"]): Card => ({ suit: "HEARTS", value });
export const S = (value: Card["value"]): Card => ({ suit: "SPADES", value });
export const C = (value: Card["value"]): Card => ({ suit: "CLUBS", value });
export const D = (value: Card["value"]): Card => ({ suit: "DIAMONDS", value });

export function deck(...cards: Card[]): Card[] {
  return cards.slice();
}

import React from "react";
import type { Card } from "../lib/types";
import "./playingCard.css";

const suitSymbol: Record<Card["suit"], string> = {
  HEARTS: "♥", DIAMONDS: "♦", CLUBS: "♣", SPADES: "♠",
};

const suitColor: Record<Card["suit"], "red" | "black"> = {
  HEARTS: "red", DIAMONDS: "red", CLUBS: "black", SPADES: "black",
};

export default function PlayingCard({ suit, value, hidden }: Card) {
  if (hidden) {
    return <div className="card back" aria-label="face-down card" />;
  }
  
  const color = suitColor[suit];
  const sym = suitSymbol[suit];
  return (
    <div className="card">
      <div className={`corner tl ${color}`}>{value}<span>{sym}</span></div>
      <div className={`corner br ${color}`}>{value}<span>{sym}</span></div>
      <div className={`pip ${color}`} aria-hidden>{sym}</div>
    </div>
  );
}

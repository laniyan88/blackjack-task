import React from "react";
import PlayingCard from "./PlayingCard";
import { Formatter } from "@engine";
import type { Card } from "../lib/types";
import "./hand.css";

interface Props { title: string; name: string; cards: Card[]; hideHole?: boolean; }

export default function Hand({ title, name, cards, hideHole }: Props) {
  return (
    <section className="hand-row">
      <h2>{title}</h2>
      <div className="cards">
        {cards.map((c, i) => <PlayingCard key={i}  hidden={hideHole && i === 1} {...c} />)}
      </div>
      <code className="line">
        {Formatter.hand({ name, cards, hideHole })}
      </code>
    </section>
  );
}

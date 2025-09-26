import { useState } from "react";
import type { Card } from "../lib/types";
import { DEFAULT_NAME, Deck, Game } from "@engine";

export function useOneRound() {
  const [name, setName] = useState(DEFAULT_NAME);
  const [mode, setMode] = useState<"url" | "json">("url");
  const [url, setUrl] = useState("/deck/blackjack/shuffle");
  const [json, setJson] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [result, setResult] = useState<null | {
    winner: string;
    dealer: { name: string; cards: Card[] };
    player: { name: string; cards: Card[] };
  }>(null);

  async function run() {
    setErr(null);
    setLoading(true);
    try {
      let deck: Card[];
      if (mode === "url") {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        deck = await res.json();
      } else {
        const parsed = JSON.parse(json);
        if (!Array.isArray(parsed)) throw new Error("JSON must be an array of cards");
        deck = parsed as Card[];
      }

      const game = new Game(new Deck(deck.slice()), name);
      const r = game.playOneRound();
      setResult(r as any);
    } catch (e: any) {
      setErr(e.message ?? String(e));
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return { name, setName, mode, setMode, url, setUrl, json, setJson, loading, err, result, run };
}

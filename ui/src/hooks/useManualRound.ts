import { useState } from "react";
import type { Card } from "../lib/types";
import { Deck, Hand, Scoring, Formatter } from "@engine";

type Phase = "idle" | "opening" | "player" | "dealer" | "finished";

export function useManualRound() {
  const [name, setName] = useState("Player");
  const [url, setUrl] = useState("/deck/blackjack/shuffle");
  const [json, setJson] = useState("");
  const [source, setSource] = useState<"url" | "json">("url");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [phase, setPhase] = useState<Phase>("idle");
  const [deck, setDeck] = useState<Deck | null>(null);
  const [player, setPlayer] = useState<Hand | null>(null);
  const [dealer, setDealer] = useState<Hand | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  function reset() {
    setPhase("idle");
    setDeck(null);
    setPlayer(null);
    setDealer(null);
    setWinner(null);
    setErr(null);
  }

  async function deal() {
    try {
      setErr(null);
      setLoading(true);

      let cards: Card[];
      if (source === "url") {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        cards = await res.json();
      } else {
        const parsed = JSON.parse(json);
        if (!Array.isArray(parsed)) throw new Error("JSON must be an array of cards");
        cards = parsed;
      }

      const d = new Deck(cards.slice());
      const p = new Hand(name);
      const dl = new Hand("Dealer");

      p.add(d.draw()); p.add(d.draw());
      dl.add(d.draw()); dl.add(d.draw());

      setDeck(d);
      setPlayer(p);
      setDealer(dl);
      setPhase("opening");

      const pBJ = p.isBlackjack();
      const dBJ = dl.isBlackjack();
      if (pBJ || dBJ) {
        setWinner(dBJ ? "Dealer" : p.name);
        setPhase("finished");
      } else {
        setPhase("player");
      }
    } catch (e: any) {
      setErr(e.message ?? String(e));
      reset();
    } finally {
      setLoading(false);
    }
  }

  function hit() {
    if (!deck || !player || phase !== "player") return;
    const card = deck.draw();
    const next = new Hand(player.name);
    player.cards.forEach(c => next.add(c));
    next.add(card);

    setPlayer(next);

    if (Scoring.isBust(next.cards)) {
      setWinner("Dealer");
      setPhase("finished");
    }
  }

  function stand() {
    if (!deck || !player || !dealer || phase !== "player") return;
    let dl = new Hand(dealer.name);
    dealer.cards.forEach(c => dl.add(c));

    const target = player.score();
    while (dl.score() <= target) {
      const c = deck.draw();
      const copy = new Hand(dl.name);
      dl.cards.forEach(x => copy.add(x));
      copy.add(c);
      dl = copy;
      if (Scoring.isBust(dl.cards)) {
        setDealer(dl);
        setWinner(player.name);
        setPhase("finished");
        return;
      }
    }
    setDealer(dl);
    setWinner("Dealer");
    setPhase("finished");
  }

  const cliOutput =
    phase === "finished" && player && dealer && winner
      ? Formatter.output({
          winner,
          dealer: { name: dealer.name, cards: dealer.cards },
          player: { name: player.name, cards: player.cards },
        })
      : "";

  return {
    name, setName, url, setUrl, json, setJson, source, setSource,
    loading, err, phase, player, dealer, winner, cliOutput,
    reset, deal, hit, stand,
  };
}

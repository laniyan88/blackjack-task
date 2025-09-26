import { DEFAULT_URL } from "../constant";
import type { Card } from "../types";

export class DeckService {
  constructor(private readonly url: string = DEFAULT_URL) {}

  get urlOrDefault() { return this.url || DEFAULT_URL; }

  async fetch(): Promise<Card[]> {
    const res = await fetch(this.urlOrDefault, { method: "GET" });
    if (!res.ok) throw new Error(`Failed to fetch deck: ${res.status} ${res.statusText}`);
    const json = await res.json();
    if (!Array.isArray(json)) throw new Error("Deck response was not an array");
    return (json as Card[]).slice();
  }
}

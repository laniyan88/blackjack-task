import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { DeckService } from "./engine/DeckService";
import { Deck } from "./engine/Deck";
import { Game } from "./engine/Game";
import { Formatter } from "./engine/Formatter";
import { ManualGame } from "./engine/ManualGame";
import { NodeIO } from "./engine/IO";
import { DEFAULT_NAME, DEFAULT_URL } from "./constant";

async function prompt(question: string, def?: string): Promise<string> {
  const rl = createInterface({ input, output });
  const ans = (await rl.question(def ? `${question} (default: ${def}): ` : `${question}: `)).trim();
  rl.close();
  return ans || (def ?? "");
}

async function main() {
  try {
    const isTTY = process.stdin.isTTY && process.stdout.isTTY;
    const args = process.argv.slice(2);
    const envName = process.env.PLAYER_NAME;
    const envUrl  = process.env.DECK_URL;

    let playerName = envName || DEFAULT_NAME;
    let deckUrl    = envUrl || args.find(a => /^https?:\/\//.test(a)) || DEFAULT_URL;
    let mode: "auto" | "manual" = args.includes("--manual") ? "manual" : "auto";

    if (isTTY) {
      playerName = await prompt("Player name", playerName);
      deckUrl    = await prompt("Deck URL", deckUrl);
      const m = await prompt("Mode (auto/manual)", mode);
      mode = (m.toLowerCase() === "manual" ? "manual" : "auto");
    }

    const deckCards = await new DeckService(deckUrl).fetch();

    if (mode === "manual") {
      const io = new NodeIO();
      try {
        const result = await new ManualGame(new Deck(deckCards.slice()), playerName, io).play();
        console.log(Formatter.output(result));
      } finally {
        io.close();
      }
    } else {
      const result = new Game(new Deck(deckCards.slice()), playerName).playOneRound();
      console.log(Formatter.output(result));
    }
  } catch (err) {
    console.error("Error:", (err as Error).message);
    process.exit(1);
  }
}

main();

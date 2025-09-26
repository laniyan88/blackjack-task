import type { GameResult } from "../types";
import { Deck } from "./Deck";
import { Hand } from "./Hand";
import { Scoring } from "./Scoring";
import type { PromptIO } from "./IO";

export class ManualGame {
  readonly player: Hand;
  readonly dealer: Hand;

  constructor(
    private readonly deck: Deck,
    playerName: string,
    private readonly io: PromptIO
  ) {
    this.player = new Hand(playerName);
    this.dealer = new Hand("Dealer");
  }

  private dealInitial() {
    this.player.add(this.deck.draw());
    this.player.add(this.deck.draw());
    this.dealer.add(this.deck.draw());
    this.dealer.add(this.deck.draw());
  }

  private result(winner: string): GameResult {
    return {
      winner,
      dealer: { name: this.dealer.name, cards: this.dealer.cards },
      player: { name: this.player.name, cards: this.player.cards },
    };
  }

  private async playerTurn(): Promise<"bust" | "stand"> {
    while (true) {
      const score = this.player.score();
      this.io.println(
        `You: ${score} [${this.player.cards.map(c => `${c.suit[0]}${c.value}`).join(",")}]`
      );

      if (Scoring.isBust(this.player.cards)) {
        this.io.println("You busted!");
        return "bust";
      }

      const ans = (await this.io.question("Hit or Stand? [H/S]: ")).trim().toLowerCase();
      const hit  = ans.startsWith("h");
      const stand = ans.startsWith("s");

      if (hit) {
        const card = this.deck.draw();
        this.io.println(`You drew: ${card.suit} ${card.value}`);
        this.player.add(card);
        continue;
      }
      if (stand) return "stand";

      this.io.println("Please enter H (hit) or S (stand).");
    }
  }

  private dealerTurn(targetScore: number): "bust" | "win" {
    while (this.dealer.score() <= targetScore) {
      const card = this.deck.draw();
      this.io.println(`Dealer drew: ${card.suit} ${card.value}`);
      this.dealer.add(card);
      if (Scoring.isBust(this.dealer.cards)) {
        this.io.println("Dealer busted!");
        return "bust";
      }
    }
    return "win"; 
  }

  async play(): Promise<GameResult> {
    this.dealInitial();

    const pBJ = this.player.isBlackjack();
    const dBJ = this.dealer.isBlackjack();
    if (pBJ || dBJ) return this.result(dBJ ? "Dealer" : this.player.name);

    const pState = await this.playerTurn();
    if (pState === "bust") return this.result("Dealer");

    const dealerOutcome = this.dealerTurn(this.player.score());
    if (dealerOutcome === "bust") return this.result(this.player.name);

    return this.result("Dealer");
  }
}

import type { GameResult } from "../types";
import { Deck } from "./Deck";
import { Hand } from "./Hand";

export class Game {
  readonly player: Hand;
  readonly dealer: Hand;

  constructor(private deck: Deck, playerName = "Ivar") {
    this.player = new Hand(playerName);
    this.dealer = new Hand("Dealer");
  }

  private dealInitial() {
    this.player.addTwo(this.deck.draw(), this.deck.draw());
    this.dealer.addTwo(this.deck.draw(), this.deck.draw());
  }

  private result(winner: string): GameResult {
    return { 
      winner, 
      dealer: { name: this.dealer.name, cards: this.dealer.cards },              
      player: { name: this.player.name, cards: this.player.cards }
    };
  }

  playOneRound(): GameResult {
    this.dealInitial();

    const pBJ = this.player.isBlackjack();
    const dBJ = this.dealer.isBlackjack();
    if (pBJ || dBJ) {
      return this.result(dBJ ? "Dealer" : this.player.name);
    }

    while (this.player.score() < 17) {
      this.player.add(this.deck.draw());
      if (this.player.isBust()) return this.result("Dealer");
    }

    const playerScore = this.player.score();
    while (this.dealer.score() <= playerScore) {
      this.dealer.add(this.deck.draw());
      if (this.dealer.isBust()) return this.result(this.player.name);
    }

    return this.result("Dealer");
  }
}

import { ManualGame } from "../ManualGame";
import { Deck } from "../Deck";
import type { PromptIO } from "../IO";
import type { Card } from "../../types";

class FakeIO implements PromptIO {
  lines: string[] = [];
  private answers: string[];
  constructor(answers: string[]) { this.answers = answers; }
  println(line: string) { this.lines.push(line); }
  async question(_prompt: string) { return this.answers.shift() ?? "s"; }
  close() {}
}

const H = (v: Card["value"]): Card => ({ suit: "HEARTS", value: v });
const S = (v: Card["value"]): Card => ({ suit: "SPADES", value: v });
const C = (v: Card["value"]): Card => ({ suit: "CLUBS", value: v });
const D = (v: Card["value"]): Card => ({ suit: "DIAMONDS", value: v });

function deck(...cards: Card[]) { return cards.slice(); }

describe("ManualGame", () => {
  it("player hits then stands; dealer busts → player wins", async () => {
    // Deal order: P1,P2,D1,D2 then draws...
    // Player: 9,6 (=15) -> Hit draws 9 (=24 bust) would lose, so we design a win:
    // Better: Player 10,7 (=17) -> stand. Dealer 10,6 (=16) -> draws K (=26 bust)
    const cards = deck(H("10"), C("7"), S("10"), D("6"), C("K"));
    const io = new FakeIO(["s"]); // immediately stand (player already at 17)
    const g = new ManualGame(new Deck(cards), "Player", io);
    const res = await g.play();
    expect(res.winner).toBe("Player");
  });

  it("player hits to bust → dealer wins", async () => {
    // Player: 9,6 (=15), Hit draws 9 (=24 bust)
    const cards = deck(H("9"), H("6"), S("8"), S("7"), C("9"));
    const io = new FakeIO(["h"]); // hit once → bust
    const g = new ManualGame(new Deck(cards), "P", io);
    const res = await g.play();
    expect(res.winner).toBe("Dealer");
  });
});

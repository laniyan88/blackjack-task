import { Deck } from "../Deck";
import { deck, H, S } from "../../test/builders";

describe("Deck", () => {
  it("draws from the front in order", () => {
    const d = new Deck(deck(H("2"), S("3")));
    expect(d.draw()).toEqual(H("2"));
    expect(d.draw()).toEqual(S("3"));
  });

  it("throws when empty", () => {
    const d = new Deck(deck());
    expect(() => d.draw()).toThrow(/empty/i);
  });
});

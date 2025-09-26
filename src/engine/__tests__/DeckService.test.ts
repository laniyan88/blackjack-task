import { DeckService } from "../DeckService";
import { mockFetchJson } from "../../test/setup";
import { H, S } from "../../test/builders";

describe("DeckService", () => {
  it("fetches deck as array of cards", async () => {
    const cards = [H("A"), S("10")];
    mockFetchJson(cards);
    const svc = new DeckService("https://example.com/deck");
    await expect(svc.fetch()).resolves.toEqual(cards);
  });

  it("throws on non-200", async () => {
    const res = new Response("nope", { status: 500 });
    vi.spyOn(global, "fetch").mockResolvedValue(res);
    const svc = new DeckService("https://example.com/deck");
    await expect(svc.fetch()).rejects.toThrow(/Failed to fetch deck/i);
  });

  it("throws on non-array payload", async () => {
    mockFetchJson({ hello: "world" });
    const svc = new DeckService("https://example.com/deck");
    await expect(svc.fetch()).rejects.toThrow(/not an array/i);
  });
});

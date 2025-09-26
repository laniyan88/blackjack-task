import { renderHook, act } from "@testing-library/react";
import { useManualRound } from "../useManualRound";

global.fetch = vi.fn(async () =>
  new Response(JSON.stringify([
    { suit: "HEARTS", value: "10" }, // P1
    { suit: "CLUBS", value: "7"  },  // P2  (player=17)
    { suit: "SPADES", value: "10" }, // D1
    { suit: "DIAMONDS", value: "6" },// D2  (dealer=16)
    { suit: "CLUBS", value: "K"  },  // dealer draws -> 26 (bust)
  ]), { status: 200, headers: { "Content-Type": "application/json" } })
) as any;

it("manual: deal → stand → finish", async () => {
  const { result } = renderHook(() => useManualRound());

  await act(async () => { await result.current.deal(); });
  expect(result.current.phase).toBe("player");

  act(() => { result.current.stand(); });
  expect(result.current.phase).toBe("finished");
  expect(result.current.winner).toBe(result.current.name);
  expect(result.current.cliOutput).toMatch(/Winner:/);
});

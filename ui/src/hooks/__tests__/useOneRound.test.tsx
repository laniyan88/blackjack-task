import { renderHook, act } from "@testing-library/react";
import { DEFAULT_NAME } from "@engine";

global.fetch = vi.fn(async () =>
  new Response(JSON.stringify([
    { suit: "HEARTS",   value: "10" },
    { suit: "CLUBS",    value: "7"  },
    { suit: "SPADES",   value: "10" },
    { suit: "DIAMONDS", value: "6"  },
    { suit: "CLUBS",    value: "K"  },
  ]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
) as unknown as typeof fetch;

import { useOneRound } from "../useOneRound";

it("runs one round from URL and sets result", async () => {
  const { result } = renderHook(() => useOneRound());

  await act(async () => {
    await result.current.run();
  });

  expect(result.current.err).toBeNull();
  expect(result.current.result?.winner).toBe(DEFAULT_NAME);
});

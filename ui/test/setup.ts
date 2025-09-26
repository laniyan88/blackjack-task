import "@testing-library/jest-dom";
import { vi } from "vitest";

if (!("clipboard" in navigator)) {
  // @ts-expect-error: jsdom lacks clipboard by default
  navigator.clipboard = {
    writeText: vi.fn(),
    readText: vi.fn().mockResolvedValue(""),
  };
}

if (!globalThis.fetch) {
  globalThis.fetch = vi.fn(async () =>
    new Response("[]", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  ) as any;
}

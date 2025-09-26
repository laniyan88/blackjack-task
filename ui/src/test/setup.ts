import "@testing-library/jest-dom";

if (!globalThis.fetch) {
  globalThis.fetch = vi.fn(async () =>
    new Response(JSON.stringify([]), { status: 200, headers: { "Content-Type": "application/json" } })
  ) as any;
}

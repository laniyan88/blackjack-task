import { beforeEach, afterEach, vi } from "vitest";

export function mockFetchJson(payload: unknown, init: Partial<ResponseInit> = {}) {
  const res = new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  vi.spyOn(global, "fetch").mockResolvedValue(res as unknown as Response);
}

beforeEach(() => {
  vi.restoreAllMocks();
  vi.clearAllMocks();
});

afterEach(() => {
  vi.useRealTimers();
});

import { render, screen } from "@testing-library/react";

vi.mock("@engine", async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual, // keep real exports so imports don’t break
    Formatter: {
      ...actual.Formatter,
      // honor hideHole: when true, mask the score with "?"
      hand: ({ name, cards, hideHole }: any) =>
        `${name} | ${hideHole ? "?" : cards.length} | MOCK`,
    },
  };
}); 

import Hand from "../Hand";

it("shows title, cards and CLI line", () => {
  const cards = [
    { suit: "HEARTS", value: "A" },
    { suit: "SPADES", value: "10" },
  ] as const;

  render(<Hand title="Dealer" name="Dealer" cards={cards as any} />);
  expect(screen.getByRole("heading", { name: /dealer/i })).toBeInTheDocument();
  // two cards rendered
  expect(screen.getAllByText("♥").length + screen.getAllByText("♠").length).toBeGreaterThan(0);
  // CLI line from mock
  expect(screen.getByText(/Dealer \| 2 \| MOCK/)).toBeInTheDocument();
});

it("masks dealer line and hides the hole card when hideHole is true", () => {
  const cards = [
    { suit: "HEARTS", value: "A" },
    { suit: "SPADES", value: "10" },
  ] as const;

  render(<Hand title="Dealer" name="Dealer" cards={cards as any} hideHole />);

  expect(screen.getByRole("heading", { name: /dealer/i })).toBeInTheDocument();

  expect(screen.getAllByText("A").length).toBeGreaterThan(0);
  expect(screen.getAllByText("♥").length).toBeGreaterThan(0);
  expect(screen.getByLabelText(/face-down card/i)).toBeInTheDocument();

  expect(screen.queryByText("10")).toBeNull();
  expect(screen.queryByText("♠")).toBeNull();

  expect(screen.getByText(/Dealer \s*\|\s*\?\s*\|\s*MOCK/i)).toBeInTheDocument();
});

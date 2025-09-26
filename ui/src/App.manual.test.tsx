import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

vi.mock("./hooks/useManualRound", () => ({
  useManualRound: () => ({
    url: "/deck/blackjack/shuffle",
    setUrl: vi.fn(),
    name: "Player",
    setName: vi.fn(),
    source: "url",
    setSource: vi.fn(),
    json: "",
    setJson: vi.fn(),
    phase: "player",          
    loading: false,
    deal: vi.fn(),
    hit: vi.fn(),
    stand: vi.fn(),
    reset: vi.fn(),
    dealer: { name: "Dealer", cards: [{ suit: "SPADES", value: "10" }, { suit: "HEARTS", value: "A" }] },
    player: { name: "Player", cards: [{ suit: "CLUBS", value: "9" }] },
    err: null,
    cliOutput: "",      
  }),
}));

test("manual mode: hides dealer hole card and masks dealer score until stand", async () => {
  const user = userEvent.setup();
  render(<App />);

 await user.click(screen.getByRole("button", { name: /manual/i }));

 expect(screen.getByRole("heading", { name: /dealer/i })).toBeInTheDocument();

  expect(screen.getByLabelText(/face-down card/i)).toBeInTheDocument();

 expect(screen.getByText(/Dealer\s*\|\s*\?\s*\|\s*S10/i)).toBeInTheDocument();

  expect(screen.queryByText(/Winner:/i)).toBeNull();
});

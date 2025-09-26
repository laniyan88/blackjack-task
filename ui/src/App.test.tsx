import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

vi.mock("@engine", async () => {

  return {
    DEFAULT_NAME: "Player",

    Game: class {
      constructor(..._args: any[]) {}
      playOneRound() {
        return {
          winner: "Player",
          dealer: { name: "Dealer", cards: [{ suit: "SPADES", value: "10" }] },
          player: { name: "Player", cards: [{ suit: "HEARTS", value: "A" }] },
        };
      }
    },

    Deck: class {
      constructor(..._args: any[]) {}
    },

    DeckService: class {
      url: string
      constructor(url: string) {
        this.url = url
      }
      async fetch() {
        return [{ suit: "SPADES", value: "10" }, { suit: "HEARTS", value: "A" }];
      }
    },

    Formatter: {
      output: (r: any) =>
        `Winner: ${r.winner}\n\nDealer | 21 | MOCK\nPlayer | 21 | MOCK`,

      hand: ({ name, hideHole }: { name: string; cards: any[]; hideHole?: boolean }) => {
        const score = hideHole ? "?" : 21;
        const list = hideHole ? "MOCK_UPCARD" : "MOCK";
        return `${name} | ${score} | ${list}`;
      },
    },
  };
});

global.fetch = vi.fn(async () =>
  new Response(JSON.stringify([{ suit: "HEARTS", value: "A" }, { suit: "SPADES", value: "10" }]), {
    status: 200, headers: { "Content-Type": "application/json" }
  })
) as any;


it("runs a round and shows winner + hands", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole("button", { name: /run one round/i }));
  const winners = await screen.findAllByText(/Winner:\s*Player/i);
  expect(winners.length).toBeGreaterThan(0);
  expect(screen.getAllByText("♥").length + screen.getAllByText("♠").length).toBeGreaterThan(0);
  expect(screen.getAllByText(/MOCK/).length).toBeGreaterThan(0); // fmtHandLine output
});

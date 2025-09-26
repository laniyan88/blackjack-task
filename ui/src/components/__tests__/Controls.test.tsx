import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Controls from "../Controls";

function renderControls(overrides: Partial<React.ComponentProps<typeof Controls>> = {}) {
  const props = {
    mode: "url" as const,
    setMode: vi.fn(),
    url: "/deck/blackjack/shuffle",
    setUrl: vi.fn(),
    json: "",
    setJson: vi.fn(),
    name: "Player",
    setName: vi.fn(),
    loading: false,
    onRun: vi.fn(),
    ...overrides,
  };
  render(<Controls {...props} />);
  return props;
}

it("switches between URL and JSON modes", async () => {
  const user = userEvent.setup();
  const props = renderControls();

  await user.click(screen.getByRole("button", { name: /paste json/i }));
  expect(props.setMode).toHaveBeenCalledWith("json");

  await user.click(screen.getByRole("button", { name: /use url/i }));
  expect(props.setMode).toHaveBeenCalledWith("url");
});

it("enters player name and runs", async () => {
  const user = userEvent.setup();
  const props = renderControls();

  await user.type(screen.getByPlaceholderText(/player name/i), " X");
  expect(props.setName).toHaveBeenCalled();

  await user.click(screen.getByRole("button", { name: /run one round/i }));
  expect(props.onRun).toHaveBeenCalled();
});

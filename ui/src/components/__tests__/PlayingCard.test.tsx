import { render, screen } from "@testing-library/react";
import PlayingCard from "../PlayingCard";

describe("PlayingCard", () => {
  it("renders hearts (red) with value A", () => {
    render(<PlayingCard suit="HEARTS" value="A" />);
    expect(screen.getAllByText("A").length).toBeGreaterThan(0);
    expect(screen.getAllByText("♥").length).toBeGreaterThan(0);
  });

  it("renders spade (black) with value 10", () => {
    render(<PlayingCard suit="SPADES" value="10" />);
    expect(screen.getAllByText("10").length).toBeGreaterThan(0);
    expect(screen.getAllByText("♠").length).toBeGreaterThan(0);
  });

  it("renders a face-down card when hidden", () => {
  render(<PlayingCard suit="SPADES" value="K" hidden />);

  const back = screen.getByLabelText(/face-down card/i);
  expect(back).toBeInTheDocument();
  expect(back).toHaveClass("card", "back");

  expect(screen.queryByText("K")).toBeNull();
  expect(screen.queryByText("♠")).toBeNull();
});
});

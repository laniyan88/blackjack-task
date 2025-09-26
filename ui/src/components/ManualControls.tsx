import React from "react";

type Props = {
  phase: "idle" | "opening" | "player" | "dealer" | "finished";
  loading: boolean;
  onDeal(): void;
  onHit(): void;
  onStand(): void;
  onPlayAgain(): void;
};

export default function ManualControls({ phase, loading, onDeal, onHit, onStand, onPlayAgain }: Props) {
  if (phase === "idle" || phase === "opening") {
    return (
      <button className="primary" disabled={loading} onClick={onDeal}>
        {loading ? "Dealing..." : "Deal"}
      </button>
    );
  }
  if (phase === "player") {
    return (
      <>
        <button className="primary" disabled={loading} onClick={onHit} style={{ marginRight: "0.8rem" }}>
          Hit
        </button>
        <button className="primary" disabled={loading} onClick={onStand}>
          Stand
        </button>
      </>
    );
  }
  return (
    <button className="primary" onClick={onPlayAgain}>
      Play Again
    </button>
  );
}

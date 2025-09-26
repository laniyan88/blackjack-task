import React from "react";
import "./winner.css";

export default function WinnerBanner({ text }: { text: string | null }) {
  if (!text) return null;
  return <div className="winner">{text}</div>;
}

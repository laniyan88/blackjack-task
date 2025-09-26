import React from "react";
import "./header.css";
import "./controls.css";

type BaseProps = {
  playMode: "auto" | "manual";
  setPlayMode: (m: "auto" | "manual") => void;
};

type AutoProps = {
  type: "auto";
  url: string; setUrl: (v: string) => void;
  name: string; setName: (v: string) => void;
  segMode: "url" | "json"; setSegMode: (m: "url" | "json") => void;
  json: string; setJson: (t: string) => void;
  onRun: () => void;
  loading: boolean;
};

type ManualProps = {
  type: "manual";
  url: string; setUrl: (v: string) => void;
  name: string; setName: (v: string) => void;
  source: "url" | "json"; setSource: (m: "url" | "json") => void;
  json: string; setJson: (t: string) => void;
  phase: "idle" | "opening" | "player" | "dealer" | "finished";
  loading: boolean;
  onDeal: () => void;
  onHit: () => void;
  onStand: () => void;
  onPlayAgain: () => void;
};

type Props = BaseProps & (AutoProps | ManualProps);

export default function HeaderBar(props: Props) {
  const LeftModeSwitch = (
    <div className="seg">
      <button
        className={props.playMode === "auto" ? "active" : ""}
        onClick={() => props.setPlayMode("auto")}
      >
        Auto
      </button>
      <button
        className={props.playMode === "manual" ? "active" : ""}
        onClick={() => props.setPlayMode("manual")}
      >
        Manual
      </button>
    </div>
  );

  const NameUrlInputs = (
    <>
      <input
        className="input"
        placeholder="/deck/blackjack/shuffle"
        value={props.url}
        onChange={(e) => props.setUrl(e.target.value)}
      />
      <input
        className="input small"
        placeholder="Player name"
        value={props.name}
        onChange={(e) => props.setName(e.target.value)}
      />
    </>
  );

  const BottomRightActions =
    props.type === "auto" ? (
      <button className="primary" disabled={props.loading} onClick={props.onRun}>
        {props.loading ? "Running…" : "Run One Round"}
      </button>
    ) : (
      <>
        {props.phase === "player" ? (
          <>
            <button className="primary" disabled={props.loading} onClick={props.onHit} style={{ marginRight: "0.8rem" }}>Hit</button>
            <button className="primary" disabled={props.loading} onClick={props.onStand}>Stand</button>
          </>
        ) : props.phase === "finished" ? (
          <button className="primary" onClick={props.onPlayAgain}>Play Again</button>
        ) : (
          <button className="primary" disabled={props.loading} onClick={props.onDeal}>
            {props.loading ? "Dealing…" : "Deal"}
          </button>
        )}
      </>
    );

  const TopRow =
    props.type === "auto" ? (
      <>
        <div className="seg">
          <button
            className={props.segMode === "url" ? "active" : ""}
            onClick={() => props.setSegMode("url")}
          >
            Use URL
          </button>
          <button
            className={props.segMode === "json" ? "active" : ""}
            onClick={() => props.setSegMode("json")}
          >
            Paste JSON
          </button>
        </div>
        {NameUrlInputs}
      </>
    ) : (
      <>
        <div className="seg">
          <button
            className={props.source === "url" ? "active" : ""}
            onClick={() => props.setSource("url")}
          >
            Use URL
          </button>
          <button
            className={props.source === "json" ? "active" : ""}
            onClick={() => props.setSource("json")}
          >
            Paste JSON
          </button>
        </div>
        {NameUrlInputs}
      </>
    );

  const ShowJsonArea =
    (props.type === "auto" && props.segMode === "json") ||
    (props.type === "manual" && props.source === "json");

  return (
    <header className="bar">
      <h1>Blackjack</h1>
      <div className="controls-row top">
        {TopRow}
      </div>
      {ShowJsonArea && (
        <textarea
          className="textarea"
          placeholder='[{"suit":"HEARTS","value":"A"}, {"suit":"SPADES","value":"10"}, ...]'
          value={props.json}
          onChange={(e) => props.setJson(e.target.value)}
          rows={4}
        />
      )}
      <div className="controls-row top">
        {LeftModeSwitch}
        <div className="grow" />
        <div className="actions">{BottomRightActions}</div>
      </div>
    </header>
  );
}

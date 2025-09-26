import React from "react";
import "./controls.css";

export default function Controls(props: {
  mode: "url" | "json";
  setMode: (m: "url" | "json") => void;
  url: string;
  setUrl: (s: string) => void;
  json: string;
  setJson: (s: string) => void;
  name: string;
  setName: (s: string) => void;
  loading: boolean;
  onRun: () => void;
}) {
  const { mode, setMode, url, setUrl, json, setJson, name, setName, loading, onRun } = props;

  return (
    <div className="controls">
      <div className="seg">
        <button className={mode==="url" ? "active" : ""} onClick={()=>setMode("url")}>Use URL</button>
        <button className={mode==="json" ? "active" : ""} onClick={()=>setMode("json")}>Paste JSON</button>
      </div>

      {mode === "url" ? (
        <input className="input" value={url} onChange={e=>setUrl(e.target.value)} placeholder="/deck/blackjack/shuffle" />
      ) : (
        <textarea
          className="textarea" rows={5}
          value={json} onChange={e=>setJson(e.target.value)}
          placeholder='[{"suit":"HEARTS","value":"A"},{"suit":"SPADES","value":"10"}]'
        />
      )}

      <input className="input small" value={name} onChange={e=>setName(e.target.value)} placeholder="Player name" />
      <button className="primary" onClick={onRun} disabled={loading}>{loading ? "Running..." : "Run One Round"}</button>
    </div>
  );
}

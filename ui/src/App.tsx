import React, { useState } from "react";
import { DEFAULT_NAME, Formatter } from "@engine";
import HandView from "./components/Hand";
import HeaderBar from "./components/HeaderBar";
import WinnerBanner from "./components/WinnerBanner";
import CliMirror from "./components/CliMirror";

import { useOneRound } from "./hooks/useOneRound";
import { useManualRound } from "./hooks/useManualRound";
import "./styles/layout.css";
import "./App.css";

export default function App() {
  const [playMode, setPlayMode] = useState<"auto" | "manual">("auto");

  const auto = useOneRound();
  const manual = useManualRound();

  const winnerAuto = auto.result ? `Winner: ${auto.result.winner}` : null;
  const winnerManual = manual.winner ? `Winner: ${manual.winner}` : null;

  return (
    <div className="table">
      <HeaderBar
        playMode={playMode}
        setPlayMode={setPlayMode}
        {...(playMode === "auto"
          ? {
              type: "auto" as const,
              url: auto.url, setUrl: auto.setUrl,
              name: auto.name, setName: auto.setName,
              segMode: auto.mode, setSegMode: auto.setMode,
              json: auto.json, setJson: auto.setJson,
              onRun: auto.run, loading: auto.loading
            }
          : {
              type: "manual" as const,
              url: manual.url, setUrl: manual.setUrl,
              name: manual.name, setName: manual.setName,
              source: manual.source, setSource: manual.setSource,
              json: manual.json, setJson: manual.setJson,
              phase: manual.phase, loading: manual.loading,
              onDeal: manual.deal, onHit: manual.hit,
              onStand: manual.stand, onPlayAgain: manual.reset
            })}
      />

      <main className="stage">
        <WinnerBanner text={playMode === "auto" ? winnerAuto : winnerManual} />

        {playMode === "auto" ? (
          <>
            {auto.result && (
              <>
                <HandView title="Dealer" name="Dealer" cards={auto.result.dealer.cards} />
                <HandView title={auto.name || DEFAULT_NAME} name={auto.name || DEFAULT_NAME} cards={auto.result.player.cards} />
                <CliMirror output={Formatter.output(auto.result)} />
              </>
            )}
            {auto.err && <div className="toast error">{auto.err}</div>}
          </>
        ) : (
          <>
            {manual.dealer && (
              <HandView title="Dealer" name="Dealer" cards={manual.dealer.cards as any}  hideHole={manual.phase === "player"}/>
            )}
            {manual.player && (
              <HandView title={manual.name || DEFAULT_NAME} name={manual.name || DEFAULT_NAME} cards={manual.player.cards as any} />
            )}
            {manual.err && <div className="toast error">{manual.err}</div>}
            {manual.cliOutput && <CliMirror output={manual.cliOutput} />}
          </>
        )}
      </main>
    </div>
  );
}

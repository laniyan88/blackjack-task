import React from "react";

export default function CliMirror({ output }: { output: string }) {
  if (!output) return null;
  return (
    <div className="cli-mirror">
      <pre>{output}</pre>
    </div>
  );
}

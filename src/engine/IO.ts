import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export interface PromptIO {
  println(line: string): void;
  question(prompt: string): Promise<string>;
  close(): void;
}

export class NodeIO implements PromptIO {
  private rl = createInterface({ input, output });

  println(line: string) {
    // eslint-disable-next-line no-console
    console.log(line);
  }

  question(prompt: string) {
    return this.rl.question(prompt);
  }

  close() {
    this.rl.close();
  }
}

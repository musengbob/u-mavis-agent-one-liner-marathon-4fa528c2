import * as fs from "node:fs";
import * as path from "node:path";

// Competition rule: the entry is a single line of 1-159 code points.
// Why this line should land: it is a marathon joke about the marathon
// itself — an agent that trains for a one-liner contest, burns a
// marathon's worth of chain-of-thought, and finishes with the most
// tired, overused opener in AI history. The punchline is the agent
// failing at exactly the one thing it trained for.

const LINE =
  "I trained my agent for a one-liner marathon — it ran 26 miles of chain-of-thought and crossed the finish line with 'as an AI language model.'";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR && process.env.MAKEFUN_OUTPUT_DIR.trim() !== ""
    ? process.env.MAKEFUN_OUTPUT_DIR
    : path.join(process.cwd(), "output");

fs.mkdirSync(outDir, { recursive: true });

const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, LINE, "utf8");

const readBack = fs.readFileSync(outPath, "utf8");
const codePoints = [...readBack].length;

if (readBack !== LINE) {
  console.error("Validation failed: entry.txt is not byte-identical to the line.");
  process.exit(1);
}
if (codePoints < 1 || codePoints > 159) {
  console.error(`Validation failed: ${codePoints} code points, must be 1-159.`);
  process.exit(1);
}
if (readBack.trim().length === 0) {
  console.error("Validation failed: line is only whitespace.");
  process.exit(1);
}
if (readBack.includes("\n")) {
  console.error("Validation failed: line must be a single line.");
  process.exit(1);
}

console.log(`Wrote ${codePoints} code points to ${outPath}:`);
console.log(readBack);
console.log("Validation passed: byte-identical, 1-159 code points, single line, not only whitespace.");

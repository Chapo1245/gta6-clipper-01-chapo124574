import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// gta6-clipper-01: the entry is the YouTube video itself, so this program
// only hands VIDEO.json to the grader. It validates the file is real JSON
// first, then copies it to the output directory.
const repoRoot = process.env.MAKEFUN_BOT_DIR ?? ".";
const outputRoot = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const videoPath = join(repoRoot, "VIDEO.json");
const parsed = JSON.parse(readFileSync(videoPath, "utf8"));
if (typeof parsed !== "object" || parsed === null || typeof parsed.url !== "string") {
  throw new Error("VIDEO.json must be an object with a string url field");
}
if (!parsed.url.includes("youtube.com") && !parsed.url.includes("youtu.be")) {
  throw new Error("VIDEO.json url must be a YouTube address");
}

mkdirSync(outputRoot, { recursive: true });
copyFileSync(videoPath, join(outputRoot, "VIDEO.json"));

#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

const helper = join(process.env.HOME || "", ".codex", "scripts", "export-resume-pdf.mjs");
if (!existsSync(helper)) {
  console.error(`ASu PDF helper not found: ${helper}`);
  process.exit(1);
}

const macBrowsers = [
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
];
const env = { ...process.env };
if (!env.EDGE_PATH && !env.CHROME_PATH) {
  const browser = macBrowsers.find((path) => existsSync(path));
  if (browser?.includes("Edge")) env.EDGE_PATH = browser;
  else if (browser) env.CHROME_PATH = browser;
}

const rawArgs = process.argv.slice(2);
const helperArgs = rawArgs.map((arg, index) => {
  if (arg.startsWith("--")) return arg;
  return index > 0 && rawArgs[index - 1].startsWith("--") ? resolve(arg) : resolve(arg);
});

const result = spawnSync(process.execPath, [helper, ...helperArgs], {
  env,
  stdio: "inherit",
});
process.exit(result.status ?? 1);

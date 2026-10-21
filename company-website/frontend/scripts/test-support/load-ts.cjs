/* eslint-disable @typescript-eslint/no-require-imports -- Node audit tooling uses CommonJS. */
/** In-memory TypeScript loading for dependency-free Node tests and audit scripts. */
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const root = path.resolve(__dirname, "../..");
const cache = new Map();
module.exports = function loadTs(file) {
  const absolute = path.resolve(root, file);
  if (cache.has(absolute)) return cache.get(absolute);
  const exports = {};
  cache.set(absolute, exports);
  const js = ts.transpileModule(fs.readFileSync(absolute, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const resolve = (id) => {
    if (id.startsWith("@/")) return module.exports(`src/${id.slice(2)}.ts`);
    if (id.startsWith(".")) return module.exports(path.resolve(path.dirname(absolute), `${id}.ts`));
    return require(id);
  };
  vm.runInThisContext(`(function(require, exports) {${js}\n})`, { filename: absolute })(resolve, exports);
  return exports;
};

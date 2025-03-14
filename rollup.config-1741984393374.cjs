'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var babel = require('@rollup/plugin-babel');
var terser = require('@rollup/plugin-terser');
var license = require('rollup-plugin-license');
var typescript = require('@rollup/plugin-typescript');
var rollupPluginDts = require('rollup-plugin-dts');
var pkjson = require('./package.json');
var babelrc = require('./.babelrc.json');

const INPUT_FILE = "src/index.js";
const IS_DEV = process.env.NODE_ENV === "dev";
const CURRENT_YEAR = new Date().getFullYear();

const createBanner = () => `/*!
* Proton v${pkjson.version}
* https://github.com/drawcall/Proton
*
* Copyright 2013-${CURRENT_YEAR}, drawcall
* Licensed under the MIT license
* http://www.opensource.org/licenses/mit-license
*
*/`;

const removeExportsPlugin = {
  name: "remove-exports",
  transform(code, id) {
    if (id.endsWith(INPUT_FILE)) {
      console.log("remove-exports: Removing exports from", id);
      return code.replace(/export\s*{[\s\S]*?};/g, "");
    }
    return null;
  },
};

const createBabelPlugin = () =>
  babel({
    exclude: "node_modules/**",
    babelHelpers: "bundled",
    babelrc: false,
    ...babelrc,
  });

const createConfig = (outputFile, isWeb, plugins) => ({
  input: INPUT_FILE,
  output: {
    file: outputFile,
    format: isWeb ? "iife" : "umd",
    name: "Proton",
    exports: isWeb ? "auto" : "named",
    sourcemap: true,
    ...(isWeb ? { extend: true } : {}),
  },
  plugins,
});

const devConfigs = [
  createConfig("build/proton.js", false, [createBabelPlugin()]),
  createConfig("build/proton.web.js", true, [removeExportsPlugin, createBabelPlugin()]),
];

const prodConfigs = [
  createConfig("build/proton.min.js", false, [
    createBabelPlugin(),
    typescript({ tsconfig: "./tsconfig.json" }),
    terser(),
    license({ banner: createBanner() }),
  ]),
  createConfig("build/proton.web.min.js", true, [
    removeExportsPlugin,
    createBabelPlugin(),
    typescript({ tsconfig: "./tsconfig.json" }),
    terser(),
    license({ banner: createBanner() }),
  ]),
];

const dtsConfig = {
  input: INPUT_FILE,
  output: [{ file: "build/proton.d.ts", format: "es" }],
  plugins: [rollupPluginDts.dts({ respectExternal: true })],
};

var rollup_config = [...(IS_DEV ? devConfigs : prodConfigs), dtsConfig];

exports.default = rollup_config;

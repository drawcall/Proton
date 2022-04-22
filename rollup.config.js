// Rollup plugins
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import license from "rollup-plugin-license";
import pkjson from "./package.json";
import babelrc from "./.babelrc.json";

const banner = `/*!
* Proton v${pkjson.version}
* https://github.com/drawcall/Proton
*
* Copyright 2013-${new Date().getFullYear()}, drawcall
* Licensed under the MIT license
* http://www.opensource.org/licenses/mit-license
*
*/`;

const input = "src/index.js";
const isDev = process.env.NODE_ENV == "dev";

let rconfig;
if (isDev) {
  rconfig = {
    input,
    output: {
      file: "build/proton.js",
      format: "umd",
      name: "Proton",
      sourcemap: true,
    },
    plugins: [
      babel({
        babelHelpers: "bundled",
        compact: false,
        babelrc: false,
        ...babelrc,
        exclude: "node_modules/**",
      }),
    ],
  };
} else {
  rconfig = {
    input,
    output: {
      file: "build/proton.min.js",
      format: "umd",
      name: "Proton",
      sourcemap: true,
    },
    plugins: [
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
        babelrc: false,
        ...babelrc,
      }),
      terser(),
      license({ banner }),
    ],
  };
}

export default rconfig;

// Rollup plugins
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import license from "rollup-plugin-license";
import pkjson from "./package.json";

const banner = `/*!
* Proton v${pkjson.version}
* https://github.com/drawcall/Proton
*
* Copyright 2013-${new Date().getFullYear()}, A-JIE
* Licensed under the MIT license
* http://www.opensource.org/licenses/mit-license
*
*/`;

const isDev = process.argv.splice(2).indexOf("--pub") < 0;
const plugins = isDev
  ? [
      babel({
        exclude: "node_modules/**"
      })
    ]
  : [
      babel({
        exclude: "node_modules/**"
      }),
      uglify(),
      license({ banner: banner })
    ];

const output = isDev
  ? { file: "build/proton.js" }
  : { file: "build/proton.min.js" };

export default {
  input: "src/index.js",
  output: {
    ...output,
    format: "umd",
    name: "Proton",
    sourcemap: true
  },
  plugins: plugins
};

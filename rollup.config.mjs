import packageJson from "./package.json" assert { type: "json" };

//This plugin prevents packages listed in peerDependencies from being bundled with our component library
import peerDepsExternal from "rollup-plugin-peer-deps-external";

//efficiently bundles third party dependencies we've installed and use in node_modules
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import del from "rollup-plugin-delete";

const rollupConfig = [
  {
    input: "src/index.js",
    output: [
      {
        file: `dist/${packageJson.name}.css`,
        format: "es",
        sourcemap: false,
      },
    ],

    external: ["react", "react-dom"],

    plugins: [
      del({ targets: "dist/*" }),
      peerDepsExternal(),
      resolve(),
      postcss({
        extract: true,
        modules: false,
        use: ["sass"],
        minimize: true,
      }),
      terser(),
    ],
  },
];

export default rollupConfig;

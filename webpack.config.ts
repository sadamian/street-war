const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

const prodEnvValue: string = "prod";
const devEnvValue: string = "dev";

module.exports = (env: string = devEnvValue) => {
  if (env === prodEnvValue) {
    return {
      entry: "./server.ts",
      target: "node",
      module: {
        rules: [
          {
            test: /.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/,
          },
        ],
      },
      mode: "production",
      resolve: {
        extensions: [".tsx", ".ts", ".js"],
      },
      output: {
        path: path.join(__dirname, "dist"),
        filename: "index.js",
      },
    };
  }
  // Else DEV environment
  return {
    entry: ["webpack/hot/poll?100", "./server.ts"],
    watch: true,
    target: "node",
    externals: [
      nodeExternals({
        whitelist: ["webpack/hot/poll?100"],
      }),
    ],
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    mode: "development",
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    output: {
      path: path.join(__dirname, "dist"),
      filename: "index.js",
    },
  };
};

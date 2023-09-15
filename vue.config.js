const { defineConfig } = require("@vue/cli-service");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

let cesiumSource = "./node_modules/cesium/Source/";
const cesiumWorkers = "../Build/Cesium/Workers";

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/",
  outputDir: "dist", // 输出文件目录
  lintOnSave: false, // eslint 是否在保存时检查 关闭语法检查

  configureWebpack: {
    output: {
      sourcePrefix: " ",
    },
    amd: {
      toUrlUndefined: true,
    },
    resolve: {
      alias: {
        "@": path.resolve("src"),
        cesium: path.resolve(__dirname, "./node_modules/cesium/"),
      },
      fallback: { https: false, zlib: false, http: false, url: false },
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" },
          { from: path.join(cesiumSource, "Assets"), to: "Assets" },
          { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
          { from: path.join(cesiumSource, "ThirdParty"), to: "ThirdParty" },
        ],
      }),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify("./"),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: "@open-wc/webpack-import-meta-loader",
          },
        },
        {
          test: /\.(glb|gltf)?$/,
          use: {
            loader: "url-loader",
          },
        },
      ],
    },
  },
});

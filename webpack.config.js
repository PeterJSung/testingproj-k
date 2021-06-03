// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /[\.js]$/,
        exclude: /node_module/,
        use: ["babel-loader"],
      },
      {
        test: /\.ts$/,
        exclude: /node_module/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"], // 모듈 위치
    extensions: [".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 템플릿 위치
    }),
  ],
  devServer: {
    host: "localhost", // live-server host 및 port
    port: 6275,
  },
  mode: "production", // 번들링 모드 development / production
};

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: {
    app: "./src/app.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,

        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "nebula.gl mapboxgl",
      template: "./index.html",
    }),
  ],
};

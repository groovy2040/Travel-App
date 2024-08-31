const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
// const { BackgroundSyncPlugin } = require("workbox-background-sync");

module.exports = {
  entry: "./client/index.js",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./client/html/views/index.html",
      filename: "./index.html",
    }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp("^http://localhost:8000/api"),
          //   urlPattern: new RegExp("https://api.meaningcloud.com/sentiment-2.1"),
          handler: "NetworkFirst",
          options: {
            cacheName: "api-cache",
            networkTimeoutSeconds: 10,
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24,
            },
            cacheableResponse: {
              statuses: [0, 200], // Cache only successful (status 200) and opaque responsesnpm run build
            },
            fetchOptions: {
              mode: "cors", // Adjust for CORS if your API is cross-origin
            },
            // plugins: [
            //   new BackgroundSyncPlugin("apiQueue", {
            //     maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
            //   }),
            // ],
          },
          method: "POST",
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "images-cache",
          },
        },
      ],
    }),
  ],
};

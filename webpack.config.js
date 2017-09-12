const path = require('path');
const glob = require('glob');
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');

const extractSass = new ExtractTextPlugin({
    filename: "css/bootstrap.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: ['./src/js/main.js', './src/css/bootstrap/scss/bootstrap.scss'],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'js/bundle.js'
  },

  module: {
      rules: [{
          test: /\.scss$/,
          use: extractSass.extract({
              use: [{
                  loader: "css-loader", options: { minimize: true }
              }, {
                  loader: "sass-loader"
              }],
              // use style-loader in development
              fallback: "style-loader"
          })
      }]
  },
  plugins: [
      extractSass,
      // Comment out PurifyCSSPlugin and run webpack to see difference
      // new PurifyCSSPlugin({
      //   // Give paths to parse for rules. These should be absolute!
      //   paths: glob.sync(path.join(__dirname, 'index.html')),
      //   purifyOptions: {
      //     // minify: true,
      //     info:true
      //   }
      // })
  ]

}

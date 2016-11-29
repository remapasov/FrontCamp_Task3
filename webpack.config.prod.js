const webpack = require('webpack');

module.exports = {
  entry: "./src/js/main",
  output: {
    filename: "build.js",
  },

  module: {
    loaders: [
      {
        test:   /\.js$/,
        loader: 'babel'
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
      {
        test:   /\.(png|jpg|svg)$/,
        loader: 'url?name=[path][name].[ext]'
      }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false,
          drop_console: true,
      }
    })
  ],

};



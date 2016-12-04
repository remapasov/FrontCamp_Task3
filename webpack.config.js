const webpack = require('webpack');

module.exports = {
  entry: ["webpack/hot/dev-server", "webpack-dev-server/client?http://localhost:8080", "./src/js/main"],
  output: {
    filename: "build.js",
  },

  module: {
    loaders: [{
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

  devtool: "source-map",

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true
  }

};



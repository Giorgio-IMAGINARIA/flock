var webpack = require('webpack');
module.exports = {
  entry: ['whatwg-fetch','./source/index.js'],
  output: {
    path: __dirname + '/build',
    filename: 'flock.js',
  },
  devServer: {
    contentBase: __dirname + '/build',
    colors: true,
    historyApiFallback: true,
    inline: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true)
      }
    })
  ],
  resolve: {
    modules: ['node_modules'],
    alias: {},
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ],
  }
};

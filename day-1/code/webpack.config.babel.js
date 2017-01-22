import path from 'path';

export default {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: 'demo/',
    inline: true,
    watchContentBase: true
  },
  entry: [
    './src/index'
  ],
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        test: /\.js$/
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/'
  }
};

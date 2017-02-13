const path = require('path')

module.exports = {
  entry: './src/handler.ts',
  target: 'node',
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: 'handler.js'
***REMOVED***,
  module: {
    loaders: [{
      test: /\.ts$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
***REMOVED***, {
      test: /.node$/,
      loader: 'node-loader',
***REMOVED***, {
      test: /.json$/,
      loader: 'json-loader',
***REMOVED***],
***REMOVED***,
};

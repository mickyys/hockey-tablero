const path = require('path');

module.exports = {
  entry: {
    display: './src/display/index.js',
    config: './src/config/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
  mode: 'development',
};

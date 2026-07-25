const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './js/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/app.js',
  },
  plugins: [
    // Shared by dev and prod so the dev server serves the same generated
    // document that ships, not the raw index.html from the project root.
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};

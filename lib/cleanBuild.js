const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = (path) => {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        root: process.cwd()
      })
    ]
  };
}

const NpmInstallPlugin = require('npm-install-webpack-plugin');

exports.npmInstall = function(options) {
  options = options || {};

  return {
    plugins: [
      new NpmInstallPlugin(options)
    ]
  };
}

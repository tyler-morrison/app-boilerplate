const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.compile = (paths) => {
  return {
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass'],
          include: paths
        }
      ]
    }
  };
}

exports.extract = (paths) => {
  return {
    module: {
      loaders: [
        // Extract CSS during build
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css','sass'),
          include: paths
        }
      ]
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  };
}

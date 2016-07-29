const webpack = require('webpack');

exports.performanceTools = () => {
  return {
    module: {
      loaders: [
        {
          test: require.resolve('react'),
          loader: 'expose?React'
        }
      ]
    }
  };
}

/**
 * React relies on `process.env.NODE_ENV` based optimizations.
 * This method allows us to dynamically set env key / value pairs.
 */
exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
}

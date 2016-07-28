module.exports = (include) => {
  return {
    module: {
      loaders: [
        {
          test: /\.(ts|tsx)$/,
          // Enable caching for extra performance
          loaders: ["ts-loader"],
          exclude: /node_modules/
        }
      ]
    }
  };
}

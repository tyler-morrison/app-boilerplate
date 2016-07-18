/**
 * Load JSX files
 */
module.exports = (include) => {
  return {
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          // Enable caching for extra performance
          loaders: ["babel?cacheDirectory"],
          include: include
        }
      ]
    }
  };
}

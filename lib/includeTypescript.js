module.exports = (include) => {
  return {
    module: {
      preLoaders: [
          // All output '.js' files will have any sourcemaps re-processed.
          { test: /\.js$/, loader: "source-map-loader" }
      ],
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

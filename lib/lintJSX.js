module.exports = (include) => {
  return {
    module: {
      preLoaders: [{
        test: /\.(js|jsx)$/,
        loaders: ["eslint"],
        include: include
      }]
    }
  };
}

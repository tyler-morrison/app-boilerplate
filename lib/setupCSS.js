module.exports = (paths) => {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ["style", "css"],
          include: paths
        }
      ]
    }
  };
}

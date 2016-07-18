module.exports = () => {
  return {
    module: {
      loaders: [
        {
          test: require.resolve("react"),
          loader: "expose?React"
        }
      ]
    }
  };
}

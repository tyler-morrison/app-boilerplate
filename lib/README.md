# Webpack Split Configuration

This application utilizes Webpack to bundle all dependencies.

## Single Source of Truth

While it is neither uncommon, nor incorrect, for applications to use multiple config files within Webpack, this can be confusing approach for newer Webpack users. Instead, this boilerplate uses a single `webpack.config.js` file.

## Splitting & Merging Configuration

In an effort to create a configuration that is modular, extensible, and reusable; we will split certain from the main config and store these branches in the `lib` folder.

Using the [require-all](https://www.npmjs.com/package/require-all) package, we are able to dynamically add and remove configuration branches as the project grows.

Within the primary `webpack.config.js`, we use the [webpack-merge](https://www.npmjs.com/package/webpack-merge) package to combine all of the different branches, without overriding object keys and arrays.

## Environment Switching

This boilerplate watches the `npm_lifecycle_event` variable as the primary means of switching configurations.

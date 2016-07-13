'use strict';
/**
 * External Dependencies
 */
const path = require('path'),
  merge = require('webpack-merge'),
  validate = require('webpack-validator');

/**
 * Internal Dependencies
 */
const parts = require('./lib/parts');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  client: path.join(__dirname, 'client'),
  server: path.join(__dirname, 'server'),
  style: [
    path.join(__dirname, 'assets', 'style.scss')
  ],
  build: path.join(__dirname, 'build'),
  test: path.join(__dirname, 'tests')
};

const common = merge(
  {
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    entry: {
      app: 'index.js'
    },
    output: {
      path: PATHS.build,
      filename: '[name].js'
      // TODO: Set publicPath to match your GitHub project name
      // E.g., '/kanban-demo/'. Webpack will alter asset paths
      // based on this. You can even use an absolute path here
      // or even point to a CDN.
      //publicPath: ''
    },
    resolve: {
      extensions: ['', '.json', '.js', '.jsx'],
      // Include both `client` and `server` to root so that all modules resolve.
      root: [ PATHS.server, PATHS.client, __dirname],
      modulesDirectories: [ 'node_modules' ]
    }
  },
  parts.indexTemplate({
    title: 'New Application',
    appMountId: 'app'
  })
);

let config;

// Detect how npm is run and branch based on that
switch (TARGET) {
  case 'build':
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map',
      }
    );
}

module.exports = validate(config, {
  quiet: true
});

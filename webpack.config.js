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
const parts = require('require-all')(__dirname + '/lib');

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

process.env.BABEL_ENV = TARGET;

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
      // Important! Do not remove ''. If you do, imports without an extension won't work anymore!
      extensions: ['', '.js', '.jsx'],
      // Include both `client` and `server` to root so that all modules resolve.
      root: [ PATHS.server, PATHS.client, __dirname],
      modulesDirectories: [ 'node_modules' ]
    }
  }
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
      },
      parts.npmInstall()
    );
}

module.exports = validate(config, {
  quiet: true
});

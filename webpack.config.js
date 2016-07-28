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
    path.join(__dirname, 'assets', 'styles', 'main.scss')
  ],
  build: path.join(__dirname, 'build'),
  test: path.join(__dirname, 'tests')
};

const common = merge(
  {
    entry: {
      client: PATHS.client
    },
    output: {
      path: PATHS.build,
      filename: '[name].js'
    },
    resolve: {
      // Important! Do not remove ''. If you do, imports without an extension won't work anymore!
      extensions: ['', '.js', '.ts', '.tsx']
      // Inlcude both `client` amd `server` to root so that all modules resolve.
      // root: [ PATHS.server, PATHS.client, __dirname],
      // modulesDirectories: [ 'node_modules' ]
    }
  },
  parts.loadTSX()
);

let webpackConfig;

// Detect how npm is run and branch based on that
switch (TARGET) {
  case 'build':
  default:
    webpackConfig = merge(
      common,
      {
        devtool: 'eval-source-map',
        entry: {
          style: PATHS.style
        }
      },
      // TODO: Set dev ? true | false based on env variable
      parts.minify(),
      parts.styles.extract(PATHS.style),
      parts.npmInstall()
    );
}

module.exports = validate(webpackConfig, {
  quiet: true
});

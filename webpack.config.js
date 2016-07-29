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
      // NOTE: Do not remove ''. If you do, imports w/o an extension won't function!
      extensions: ['', '.js', '.ts', '.tsx']
    }
  },
  // Use Typescript for all applcation files
  parts.includeTypescript()
);

let webpackConfig;

// Detect how npm is run and branch based on that
switch (TARGET) {
  case 'build':
  case 'stats':
    webpackConfig = merge(
      common,
      {
        devtool: 'source-map',
        entry: {
          style: PATHS.style
        },
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        }
      },
      parts.minifyScripts(),
      parts.buildSass.andExtract(PATHS.style)
    );
    break;
  default:
    webpackConfig = merge(
      common,
      {
        devtool: 'eval-source-map',
        entry: {
          style: PATHS.style
        }
      },
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT,
        poll: ENABLE_POLLING
      }),
      parts.buildSass.basic(PATHS.style),
      parts.includeReact.performanceTools(),
      parts.npmInstall()
    );
}

module.exports = validate(webpackConfig, {
  quiet: true
});

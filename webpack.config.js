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
      // TODO: Set publicPath to match your GitHub project name to use 'gh-pages'
      //publicPath: ''
    },
    resolve: {
      // NOTE: Do not remove ''. If you do, imports w/o an extension won't function!
      extensions: ['', '.js', '.ts', '.tsx'],
      // Include both `client` and `server` to root so that all modules resolve.
      root: [ PATHS.server, PATHS.client],
      modulesDirectories: [ 'node_modules' ]
    }
  },
  // TODO: Remove this partial if you do not intend to use static HTML
  parts.includeHTML.indexTemplate({
    title: 'New Application',
    appMountId: 'app'
  }),
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
      parts.cleanBuild(PATHS.build),
      // Force `process.env.NODE_ENV` to 'production' for improved performance.
      parts.includeReact.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.extractBundle({
        name: 'vendor',
        entries: ['react', 'react-dom']
      }),
      parts.minifyScripts(),
      parts.buildSass.andExtract(PATHS.style)
    );
    break;
  // TODO: Come up with proper testing suite
  case 'test':
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
        port: process.env.PORT
      }),
      parts.buildSass.basic(PATHS.style),
      parts.includeReact.performanceTools(),
      parts.npmInstall()
    );
}

module.exports = validate(webpackConfig, {
  quiet: true
});

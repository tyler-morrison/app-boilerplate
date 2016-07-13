/**
 * External Dependencies
 */
const path = require('path'),
  express = require( 'express' ),
	morgan = require( 'morgan' ),
	pages = require( 'pages' );


/**
 * Internal Dependencies
 */


/**
 * Returns the server HTTP request handler "app".
 *
 * @api public
 */
let setup = () => {

  let app = express();

  // for nginx
	app.enable( 'trust proxy' );

  // TODO: Set template engine
	// app.set( 'view engine', 'jade' );

  return app;
};

module.exports = setup;

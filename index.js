/** @module google-client-api */

var scriptjs = require( 'scriptjs' ),
	promise = require( 'promise' );


module.exports = function( onComplete ) {

	return new promise( function( resolve, reject ) {

		if( window.gapi ) {

			doResolve( resolve, onComplete );
		} else {

			window.$$onClientLoad = function() {

				doResolve( resolve, onComplete );
			};

			scriptjs( 'http://maps.googleapis.com/maps/api/js?callback=$$onClientLoad' );
		}
	});
};

function doResolve( resolve, onComplete ) {

	resolve( window.gapi );

	if( onComplete )
		onComplete( window.gapi );
}
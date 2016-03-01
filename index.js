/** @module google-client-api */

var scriptjs = require( 'scriptjs' ),
	promise = require( 'promise' );

var callbacks = [];

global.$$onClientLoad = function() {

	for( var i = 0, len = callbacks.length; i < len; i++ ) {

		doResolve.apply( undefined, callbacks[ i ] );
	}
};

function doResolve( resolve, onComplete ) {

	resolve( global.gapi );

	if( onComplete )
		onComplete( global.gapi );
}

module.exports = function( onComplete ) {

	return new promise( function( resolve, reject ) {

		if( global.gapi ) {

			doResolve( resolve, onComplete );
		} else {

			callbacks.push( [ resolve, onComplete ] );

			if( callbacks.length == 1 ) {

				scriptjs( 'https://maps.googleapis.com/maps/api/js?sensor=false&libraries=places&dummy=.j&callback=$$onClientLoad' );
			}
		}
	});
};

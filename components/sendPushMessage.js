var Push = require( 'pushover-notifications' )

var p = new Push( {
  user: process.env.PUSH_USER,
  token: process.env.PUSH_TOKEN,
  // httpOptions: {
  //   proxy: process.env['http_proxy'],
  //},
  // onerror: function(error) {},
  // update_sounds: true // update the list of sounds every day - will
  // prevent app from exiting.
})

module.exports = (errorCode) => {
	if (errorCode) {
		var msg = {message: `Laminvale Stock Update Error - ${errorCode}`}
	}else {
		var msg = {message: `Laminvale Stock Updated`}
	}
	p.send(msg, (err, result) => {
		if ( err ) {
    throw err
	}
  console.log( result )
	})
}

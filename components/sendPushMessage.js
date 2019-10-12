const Pushover = require('node-pushover');

const push = new Pushover({
	token: process.env.PUSH_TOKEN,
	user: process.env.PUSH_USER,
});

const sendPushMessage = (errorCode) => {
	if (errorCode) {
		push.send("Laminvale Stock Update Error", errorCode);
	} else {
		push.send("Laminvale Stock Update", "Successful");

	}
}

module.exports = {sendPushMessage}

const events = require("events");

module.exports = () => {
	const forwarder = {
		_downstreamForwarder: new events(),
		_upstreamForwarder: new events(),

		downstream: {
			on: (...args) => {
				forwarder._downstreamForwarder.on(...args);
			},
			emit: (...args) => {
				forwarder._upstreamForwarder.emit(...args);
			}
		},

		upstream: {
			on: (...args) => {
				forwarder._upstreamForwarder.on(...args);
			},
			emit: (...args) => {
				forwarder._downstreamForwarder.emit(...args);
			}
		}
	};

	return forwarder;
};


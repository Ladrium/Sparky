const { Client } = require('klasa');
const { config, token } = require('./config');
const defaultClientSchema = require('./lib/structures/Internals/defaultClientSchema');
const defaultGuildSchema = require('./lib/structures/Internals/defaultGuildSchema');
const permissionLevels = require('./lib/structures/Internals/permissionLevels');
const utils = require('./Utils/utils');

class SparkyClient extends Client {

	constructor(...args) {
		super(...args, {
			defaultClientSchema,
			defaultGuildSchema,
			permissionLevels,
		});
		// easy config access
		this.config = config;

		// Commands Count
		this.health = Object.seal({
			commands: {
				temp: {
					count: 0,
					ran: {},
				},
				cmdCount: new Array(60).fill({
					count: 0,
					ran: {},
				}),
			},
		});

		this.utils = utils;

	}
}

new SparkyClient(config).login(token);

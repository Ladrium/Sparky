const { KlasaClient } = require('klasa');

module.exports = KlasaClient.defaultGuildSchema

// Auto Roles
	.add('autoroles', folder => folder
		.add('roles', 'role', { array: true })
		.add('enabled', 'boolean', { default: true }))

// Logging
	.add('loggingChannel', 'textchannel')
	.add('logs', folder => folder
		.add('kick', 'boolean', { default: false })
		.add('ban', 'boolean', { default: false })
		.add('join', 'boolean', { default: false })
		.add('leave', 'boolean', { default: false })
		.add('channels', 'boolean', { default: false })
		.add('messages', 'boolean', { default: false })
		.add('roles', 'boolean', { default: false })
		.add('automod', 'boolean', { default: false })
		.add('mute', 'boolean', { default: false }))

// Starboard
	.add('starboard', folder => folder
		.add('enabled', 'boolean', { default: true })
		.add('channel', 'textchannel')
		.add('required', 'integer', { default: 3 }))

// Welcome & Leave
	.add('messages', folder => folder
		.add('leave', leave => leave
			.add('channel', 'textchannel'))
		.add('welcome', welcome => welcome
			.add('channel', 'textchannel')))

// Automod
	.add('automod', folder => folder
		.add('enabled', 'boolean', { default: false })
		.add('invites', 'boolean', { default: false }));

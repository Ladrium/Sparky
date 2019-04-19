/* eslint-disable comma-dangle */
/**
 * The following are all client options for Klasa/Discord.js.
 * Any option that you wish to use the default value can be removed from this file.
 * This file is init with defaults from both Klasa and Discord.js.
 */

module.exports.config = {
	/**
	 * General Options
	 */
	// Disables/Enables a process.on('unhandledRejection'...) handler
	production: false,
	// The default language that comes with klasa. More base languages can be found on Klasa-Pieces
	language: 'en-US',
	// The default configurable prefix for each guild
	prefix: '!',
	// If custom settings should be preserved when a guild removes your bot
	preserveSettings: true,
	// If your bot should be able to mention @everyone
	disableEveryone: false,
	// The time in ms to add to ratelimits, to ensure you wont hit a 429 response
	restTimeOffset: 500,
	// A presence to login with
	presence: { activity: { name: 'for @Sparky help', type: 'WATCHING' } },
	// A once ready message for your console
	readyMessage: client => `Successfully initialized. Ready to serve ${client.guilds.size} guild${client.guilds.size === 1 ? '' : 's'}.`,
	/**
	 * Caching Options
	 */
	fetchAllMembers: false,
	messageCacheMaxSize: 200,
	messageCacheLifetime: 120,
	commandMessageLifetime: 120,
	// The above 2 options are ignored while the interval is 0
	messageSweepInterval: 60,

	/**
	 * Sharding Options
	 */
	shardId: 0,
	shardCount: 1,

	/**
	 * Command Handler Options
	 */
	commandEditing: true,
	commandLogging: false,
	typing: false,

	/**
	 * Database Options
	 */
	providers: {
		default: 'json'
	},

	/**
	 * Custom Prompt Defaults
	 */
	customPromptDefaults: {
		time: 30000,
		limit: Infinity,
		quotedStringSupport: false
	},

	/**
	 * Klasa Piece Defaults
	 */
	pieceDefaults: {
		commands: {
			aliases: [],
			autoAliases: true,
			bucket: 1,
			cooldown: 0,
			description: '',
			enabled: true,
			guarded: false,
			nsfw: false,
			permissionLevel: 0,
			promptLimit: 0,
			promptTime: 30000,
			requiredSettings: [],
			requiredPermissions: 0,
			runIn: ['text', 'dm', 'group'],
			subcommands: false,
			usage: '',
			quotedStringSupport: false,
			deletable: false
		},
		events: {
			enabled: true,
			once: false
		},
		extendables: {
			enabled: true,
			klasa: false,
			appliesTo: []
		},
		finalizers: { enabled: true },
		inhibitors: {
			enabled: true,
			spamProtection: false
		},
		languages: { enabled: true },
		monitors: {
			enabled: true,
			ignoreBots: true,
			ignoreSelf: true,
			ignoreOthers: true,
			ignoreWebhooks: true,
			ignoreEdits: true
		},
		providers: {
			enabled: true,
			sql: false,
			cache: false
		},
		tasks: { enabled: true }
	},

	/**
	 * Console Event Handlers (enabled/disabled)
	 */
	consoleEvents: {
		debug: false,
		error: true,
		log: true,
		verbose: false,
		warn: true,
		wtf: true
	},

	/**
	 * Console Options
	 */
	console: {
		// Alternatively a Moment Timestamp string can be provided to customize the timestamps.
		timestamps: true,
		utc: false,
		colors: {
			debug: { time: { background: 'magenta' } },
			error: { time: { background: 'red' } },
			log: { time: { background: 'blue' } },
			verbose: { time: { text: 'gray' } },
			warn: { time: { background: 'lightyellow', text: 'black' } },
			wtf: { message: { text: 'red' }, time: { background: 'red' } }
		}
	},

	/**
	 * Klasa Schedule Options
	 */
	schedule: { interval: 60000 },
	regexPrefix: /^(((hey|yo|ok),?\s*)?sparky,?)\s*/i
};

// The token for this bot to login with
module.exports.token = 'NDg3Njc2NjI4Njk3MDg4MDAw.XLnJnA.TksmeaVmboulzFfP9_lRJNtSpq4';

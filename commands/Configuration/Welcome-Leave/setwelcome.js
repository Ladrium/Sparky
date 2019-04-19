const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliaes: ['setwelcomechannel'],
			permissionLevel: 6,
			usage: '[channel:channelname]',
			description: 'Sets welcome channel for the server',
		});
	}

	async run(message, [channel = message.channel]) {

		return message.guild.settings.update('messages.welcome.channel', channel.id).then(() => {
			message.sendMessage(`Sucessfully set ${channel.toString()} has welcome channel.`);
		});
	}
};
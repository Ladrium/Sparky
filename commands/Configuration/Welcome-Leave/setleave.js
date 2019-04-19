const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliaes: ['setleavechannel'],
			permissionLevel: 6,
			usage: '[channel:channelname]',
			description: 'Sets leave channel for the server',
		});
	}

	async run(message, [channel = message.channel]) {

		return message.guild.settings.update('messages.leave.channel', channel.id).then(() => {
			message.sendMessage(`Sucessfully set ${channel.toString()} has leave channel.`);
		});
	}
};
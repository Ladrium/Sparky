const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ['text'],
			requiredPermissions: ['KICK_MEMBERS'],
			promptLimit: 0,
			permissionLevel: 4,
			description: '',
			extendedHelp: 'No extended help available.',
			usage: '<member:membername> [reason:string] [...]',
			usageDelim: ' ',
		});
	}

	async run(message, [member, ...reason]) {

		if(member.id === this.client.user.id) return message.reply(`You cannot kick ${this.client.user.username}`);
		if(member.id === message.author.id) return message.reply('You cannot kick yourslef!');

		if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('You don\'t have enough permissions to kick that member.');
		if(!member.kickable) return message.reply('I was not able to kick that member');

		reason = reason.length > 0 ? `${reason.join(' ')}\n__kicked by:__${message.author.tag}` : 'No reason was provided';

		try {
			await member.kick({ reason: reason });
		}
		catch (e) {
			return message.sendMessage('I was unable to kick that member, please try again.');
		}

		return message.sendMessage(`***${member.user.tag} was kicked.***`);

	}

};

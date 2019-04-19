const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ['text'],
			requiredPermissions: ['BAN_MEMBERS'],
			promptLimit: 0,
			permissionLevel: 4,
			description: '',
			extendedHelp: 'No extended help available.',
			usage: '<member:membername> [reason:string] [...]',
			usageDelim: ' ',
		});
	}
	async run(message, [member, ...reason]) {

		if(member.id === this.client.user.id) return message.reply(`You cannot ban ${this.client.user.username}`);
		if(member.id === message.author.id) return message.reply('You cannot ban yourslef!');

		if(member.roles.highest.position >= message.member.roles.highest.position) {
			return message.channel.send('You don\'t have enough permissions to ban that member.');
		}
		if(!member.bannable) return message.reply('I was not able to ban that member');

		reason = reason.length > 0 ? `${reason.join(' ')}\n__Banned by:__${message.author.tag}` : 'No reason was provided';

		try {
			await member.ban({ reason: reason });
		}
		catch (e) {
			return message.sendMessage('I was unable to ban that member, please try again.');
		}

		return message.sendMessage(`***${member.user.tag} was banned.***`);

	}
};

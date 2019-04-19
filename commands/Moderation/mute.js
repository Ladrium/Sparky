const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ['text'],
			requiredPermissions: ['MANAGE_ROLES'],
			promptLimit: 0,
			permissionLevel: 4,
			description: '',
			extendedHelp: 'No extended help available.',
			usage: '<member:membername> [reason:string] [...]',
			usageDelim: ' ',
		});
	}

	async run(message, [member, ...reason]) {

		if(member.id === this.client.user.id) return message.reply(`You cannot mute ${this.client.user.username}`);
		if(member.id === message.author.id) return message.reply('You cannot mute yourslef!');

		if(member.roles.highest.position >= message.member.roles.highest.position) return message.sendMessage('You don\'t have enough permissions to mute that member.');

		let muteRole = message.guild.roles.find(x => x.name === 'Muted');
		if(!muteRole) {
			try {
				muteRole = await message.roles.create({
					data: {
						name: 'Muted',
						color:'#2C2F33',
						premissions: [],
					},
				});
				message.guild.channels.forEach(async channel => {
					await channel.updateOverwrite(
						muteRole,
						{
							SEND_MESSAGES: false,
							ADD_REACTIONS: false,
							SPEAK: false,
						}
					);

				});
			}
			catch (e) {
				message.channel.send('I was not able to create a Muted Role');
			}
		}

		if(member.roles.has(muteRole.id)) return message.sendMessage(`${member.tag} is already muted.`);
		const bot = message.guild.me.roles.highest;
		if(muteRole.position > bot.position) return message.sendMessage('Mute role is higher than my highest role.');
		reason = reason.length > 0 ? `${reason.join(' ')}\n__Muted by:__${message.author.tag}` : 'No reason was provided!';

		await member.roles.add(muteRole.id).catch(() => null);
		this.client.emit('modLogs', message.guild, 'mute', { name: 'mute', reason: reason, user: member.user.user }, message.author);
		return message.sendMessage(`Successfully muted ${member.user.tag}`);
	}

};

const { Command, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');
const activities = {
	PLAYING: 'Playing',
	STREAMING: 'Streaming',
	WATCHING: 'Watching',
	LISTENING: 'Listening to',
};

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['ui', 'user'],
			cooldown: 5,
			requiredPermissions: ['EMBED_LINKS'],
			description: 'Gives information about the user',
			usage: '[user:membername]',
		});
		this.timestamp = new Timestamp('d MMM YYYY');
	}

	async run(message, [user]) {
		if (!user) user = await message.guild.members.fetch(message.author.id).catch(() => null);
		return message.sendEmbed(new MessageEmbed()
			.setColor(user.displayHexColor ? user.displayHexColor : '#32c4e3')
			.setTimestamp()
			.setFooter(`${this.client.user.tag}`, this.client.user.displayAvatarURL())
			.setThumbnail(user.user.displayAvatarURL())
			.addField('❯ Name', user.user.tag, true)
			.addField('❯ ID', user.id, true)
			.addField('❯ Discord Join Date', this.timestamp.display(user.user.createdAt), true)
			.addField('❯ Server Join Date', user.joinedTimestamp ? this.timestamp.display(user.joinedTimestamp) : 'Unknown', true)
			.addField('❯ Nickname', user.nickname || 'None', true)
			.addField('❯ Bot?', user.bot ? 'Yes' : 'No', true)
			.addField('❯ Activity', user.presence.activity ? `${activities[user.presence.activity.type]} **${user.presence.activity.name}**` : 'None')
			.addField('❯ Highest Role', user.roles.highest.id !== message.guild.defaultRole.id ? user.roles.highest.name : 'None', true)
			.addField('❯ Hoist Role', user.roles.hoist ? user.roles.hoist.name : 'None', true)
			.addField(`❯ Roles :${user.roles.size}`, user.roles.length > 10 ? this.client.utils.trimArray(user.roles, 10).join(', ') : `${user.roles.map(x => x.toString())}`));
	}

};
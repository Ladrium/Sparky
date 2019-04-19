const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ['text'],
			aliases: ['si'],
			permissionLevel: 0,
			description: 'Gives information of the server',
			requiredPermissions: ['EMBED_LINKS'],
		});
	}

	async run(message) {

		const verificationLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'];
		const filterLevels = ['Off', 'No Role', 'Everyone'];

		if(!message.guild.members.has(message.guild.ownerID)) await message.guild.members.fetch(message.guild.ownerID);

		const embed = new MessageEmbed()
			.setColor('#971db3')
			.setAuthor(message.guild.name, message.guild.iconURL({ format: 'png' }))
			.addField('❯ ID', message.guild.id, true)
			.addField('❯ Region', message.guild.region.toUpperCase(), true)
			.addField('❯ Creation Date', message.guild.createdAt.toDateString(), true)
			.addField('❯ Explicit Filter', filterLevels[message.guild.explicitContentFilter], true)
			.addField('❯ Verification Level', verificationLevels[message.guild.verificationLevel], true)
			.addField('❯ Owner', `<@${message.guild.ownerID}>`, true)
			.addField('❯ Members', message.guild.memberCount, true)
			.addField('❯ Roles', message.guild.roles.size, true)
			.addField('❯ Channels', message.guild.channels.filter(channel => channel.type !== 'category').size, true)
			.setTimestamp()
			.setFooter(`${this.client.user.tag}`, this.client.user.displayAvatarURL());

		return message.sendEmbed(embed);


	}
};

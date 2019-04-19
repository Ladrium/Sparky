const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text', 'dm'],
			cooldown: 5,
			aliases: ['pp', 'profilepicture'],
			permissionLevel: 0,
			requiredPermissions: ['EMBED_LINKS', 'USE_EXTERNAL_EMOJIS'],
			description: 'Shows avatar of the user.',
			usage: '[person:username]',
		});
	}

	async run(message, [user]) {

		const formats = ['webp', 'png', 'jpg'];
		const format = user.avatar && user.avatar.startsWith('a_') ? 'gif' : 'png';
		if(format === 'gif') formats.push('gif');

		const embed = new MessageEmbed()
			.setTitle(user.tag)
			.setDescription(
				formats.map(fmt => `[${fmt.toUpperCase()}](${user.displayAvatarURL({ format: fmt, size: 2048 })})`).join(' | ')
			)
			.setImage(user.displayAvatarURL({ format, size: 2048 }))
			.setColor(0x00AE86);
		return message.sendEmbed(embed);

	}
};
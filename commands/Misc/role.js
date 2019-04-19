const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const permissions = require('../../Utils/utils');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text', 'dm'],
			cooldown: 5,
			aliases: ['roleinfo', 'ri'],
			permissionLevel: 0,
			requiredPermissions: ['EMBED_LINKS'],
			description: 'Shows role information.',
			usage: '',
		});
	}

	run(message, [role]) {
		const serialized = role.permissions.serialize();
		const perms = Object.keys(permissions).filter(perm => serialized[perm]);
		const embed = new MessageEmbed()
			.setColor(role.hexColor)
			.addField('❯ Name', role.name, true)
			.addField('❯ ID', role.id, true)
			.addField('❯ Color', role.hexColor.toUpperCase(), true)
			.addField('❯ Creation Date', role.createdAt.toDateString(), true)
			.addField('❯ Hoisted?', role.hoist ? 'Yes' : 'No', true)
			.addField('❯ Mentionable?', role.mentionable ? 'Yes' : 'No', true)
			.addField('❯ Permissions', perms.map(perm => permissions[perm]).join(', ') || 'None');
		message.sendEmbed(embed);

	}
};
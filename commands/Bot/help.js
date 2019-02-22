const { Command, RichMenu } = require('klasa');
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['commands'],
			guarded: true,
			description: language => language.get('COMMAND_HELP_DESCRIPTION'),
			usage: '(Command:command)'
		});

		this.menu = new RichMenu(new MessageEmbed()
		.setColor(0x673AB7)
	//	.setAuthor(this.client.user.username, this.client.user.avatarURL())
		.setTitle('Advanced Commands Help:')
		.setDescription('Use the arrow reactions to scroll between pages.\nUse number reactions to select an option.')
	);
	}

	async run(message) {
        const collector = await this.menu.run(await message.send('Loading commands...'));

        const choice = await collector.selection;
        if (choice === null) {
            return collector.message.delete();
        }

        const command = this.client.commands.get(this.menu.options[choice].name);
        const info = new MessageEmbed()
            .setTitle(`Command \`${message.guild.settings.prefix}${command.name}\``)
            .setDescription(typeof command.description === 'function' ? command.description(message) : command.description)
            .addField('Usage:', command.usageString);

        if (command.extendedHelp && command.extendedHelp !== '') {
            const extendHelp = typeof command.extendedHelp === 'function' ? command.extendedHelp(message) : command.extendedHelp;
            info.addField('Help:', extendHelp);
        }

        return message.sendEmbed(info);
    }

    init() {
        for (const command of this.client.commands.values()) {
            this.menu.addOption(command.name, command.description);
        }
    }

};


   

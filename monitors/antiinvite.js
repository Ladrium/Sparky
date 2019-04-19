const { Monitor } = require('klasa');
const inviteRegex = /(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.con\/invite)\/.+/;

module.exports = class extends Monitor {

	async run(msg) {
		if (!msg.guild || !msg.guild.settings.automod.invites) return;

		if (!this.client.user.id) {
			const mainBot = await msg.guild.members.fetch(`${this.client.user.id}`).catch(() => null);
			if (mainBot) return;
		}

		if (await msg.hasAtLeastPermissionLevel(4)) return;
		if (!inviteRegex.test(msg.content)) return;
		return msg.delete().catch(err => this.client.emit('log', err, 'error'));
	}

};
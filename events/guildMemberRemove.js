const { Event } = require('klasa');
const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');


module.exports = class extends Event {

	constructor(...args) {
		super(...args);
	}

	async run(member) {

		const applyText = (canvas, text) => {
			const ctx = canvas.getContext('2d');

			// Declare a base size of the font
			let fontSize = 70;

			do {
				// Assign the font to the context and decrement it so it can be measured again
				ctx.font = `${fontSize -= 10}px sans-serif`;
				// Compare pixel width of the text to the canvas minus the approximate avatar size
			} while (ctx.measureText(text).width > canvas.width - 300);

			// Return the result to use in the actual canvas
			return ctx.font;
		};

		if(!member.guild.settings.messages.welcome.channel) return;

		const channel = member.guild.channels.get(member.guild.settings.messages.welcome.channel);

		const canvas = Canvas.createCanvas(700, 250);
		const ctx = canvas.getContext('2d');

		const background = await Canvas.loadImage('./assets/images/welcome.png');
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		ctx.strokeStyle = '#74037b';
		ctx.strokeRect(0, 0, canvas.width, canvas.height);

		// Slightly smaller text placed above the member's display name
		ctx.font = '28px sans-serif';
		ctx.fillStyle = '#ffffff';
		ctx.fillText(`${member.displayName},`, canvas.width / 2.5, canvas.height / 3.5);

		// Add an exclamation point here and below
		ctx.font = applyText(canvas, `${member.displayName}!`);
		ctx.fillStyle = '#ffffff';
		// let x;
		// if(member.guild.memberCount === 1) x = 'st' ;
		// else if(member.guild.memberCount === 2) x = 'nd';
		// else if(member.guild.memberCount === 3) x = 'rd';
		// else x = 'th';

		ctx.fillText('Left the server!', canvas.width / 2.5, canvas.height / 1.8);

		ctx.beginPath();
		ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();

		const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
		ctx.drawImage(avatar, 25, 25, 200, 200);
		channel.send(new MessageAttachment(canvas.toBuffer()));
	}
};
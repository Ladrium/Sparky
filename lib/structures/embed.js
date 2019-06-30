/**
 * @author Anish Shobith
 * @license MIT
 * @file embed.js
 */

const { MessageEmbed } = require('discord.js');

module.exports.generateEmbed = data => new MessageEmbed(data);
/**
 * @author Anish Shobith
 * @license MIT
 * @file embed.js
 */

/* eslint-disable no-unused-expressions */
'use strict';

const { MessageEmbed } = require('discord.js');

module.exports.generateEmbed = data => new MessageEmbed(data);
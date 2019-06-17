/* eslint-disable no-unused-expressions */
'use strict';

const { MessageEmbed } = require('discord.js');

module.exports.generateEmbed = data => {
  const embed = new MessageEmbed();
  data.description ? embed.setDescription(data.description) : null;
  data.title ? embed.setTitle(data.title) : null;
  data.authors ? embed.setAuthor(data.authors.tag, data.authors.image) : null;
  data.footer ? embed.setFooter(data.footer) : null;
  data.color ? embed.setColor(data.color) : null;
  data.thumbnail ? embed.setThumbnail(data.thumbnail) : null;
  data.image ? embed.setImage(data.image) : null;
  if (data.fields && data.fields.length > 0 && data.fields.length < 24) {
    data.fields.map(f => embed.addField(f.name, f.description));
  }

  return embed;
};

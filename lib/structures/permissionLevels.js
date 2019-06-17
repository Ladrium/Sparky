/* eslint-disable max-len */
'use strict';

const { PermissionLevels } = require('klasa');
module.exports = new PermissionLevels()

// Everyone
  .add(0, () => true)

// Kick/Ban perms or is Mod
  .add(5, ({ guild, member }) => {
    if (!guild || !member) return false;
    return member.roles.has(guild.settings.roles.mod) || (member.permissions.has('KICK_MEMBERS') || member.permissions.has('BAN_MEMBERS'));
  }, { fetch: true })

// Member with Admin or Manage_Guild perms
  .add(6, ({ guild, member }) => {
    if (!guild || !member) return false;
    return member.permissions.has('MANAGE_GUILD') || member.permissions.has('ADMINISTRATOR');
  }, { fetch: true })


// Guild Owners
  .add(8, ({ guild, member }) => {
    if (!guild || !member) return false;
    return guild.owner;
  }, { fetch: true })

// Allows the Bot Owner to use any lower commands
  .add(9, ({ author, client }) => {
    if (!client || !author) return false;
    return author === client.owner;
  }, { break: true })

// Allows the bot owner to use Bot Owner only commands, which silently fail for other users.
  .add(10, ({ author, client }) => {
    if (!client || !author) return false;
    return author === client.owner;
  });

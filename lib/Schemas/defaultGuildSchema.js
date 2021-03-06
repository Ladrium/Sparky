/**
 * @author Anish Shobith
 * @license MIT
 * @file defaultGuildSchema.js
 */

const { KlasaClient } = require('klasa');

module.exports = KlasaClient.defaultGuildSchema

// Auto Roles
  .add('autoroles', folder => folder
    .add('roles', 'role', { array: true })
    .add('enabled', 'boolean', { default: true }))

// Logging
  .add('loggingChannel', 'textchannel')

// Starboard
  .add('starboard', folder => folder
    .add('enabled', 'boolean', { default: true })
    .add('channel', 'textchannel')
    .add('required', 'integer', { default: 3 }))

// Welcome & Leave
  .add('messages', folder => folder
    .add('leave', leave => leave
      .add('channel', 'textchannel'))
    .add('welcome', welcome => welcome
      .add('channel', 'textchannel')))

// Automod
  .add('automod', folder => folder
    .add('enabled', 'boolean', { default: false })
    .add('invites', 'boolean', { default: false }));

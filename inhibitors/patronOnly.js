// Copyright (c) 2018-2019 AdityaTD. All rights reserved. MIT license.

const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {
  constructor(...args) {
    super(...args, { spamProtection: false });
  }

  run(msg, cmd) {
    if (!cmd.patronOnly) return;
    throw `🔒 *${msg.language.get('CMD_PATRON_ONLY')}*`;
  }
};
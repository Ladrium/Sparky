// Copyright (c) 2017-2018 dirigeants. All rights reserved. MIT license.

'use strict';

const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {
  run(msg, cmd) {
    if (!cmd.requiredProviders || !cmd.requiredProviders.length) return false;
    const providers = cmd.requiredProviders.filter(provider => !this.client.providers.has(provider));
    // eslint-disable-next-line max-len
    if (!providers.length) throw new Error(`The client is missing the **${providers.join(', ')}** provider${providers.length > 1 ? 's' : ''} and cannot run.`);
    return false;
  }
};

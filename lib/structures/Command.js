// Copyright (c) 2018-2019 AdityaTD. All rights reserved. MIT license.

'use strict';

const { Command: KlasaCommand } = require('klasa');

class Command extends KlasaCommand {
  constructor(client, store, file, core, { upvoteOnly = false, patronOnly = false, ...options }) {
    super(client, store, file, core, options);
    this.upvoteOnly = upvoteOnly;
    this.patronOnly = patronOnly;
  }
}

module.exports = Command;

/* eslint-disable no-useless-escape */
'use strict';

const { Client } = require('klasa');
const { config, token, Constants } = require('../../config');
const defaultClientSchema = require('../Schemas/defaultGuildSchema');
const defaultGuildSchema = require('../Schemas/defaultGuildSchema');
const permissionLevels = require('./permissionLevels');
const utils = require('./Utils/utils');

const escapeRegExp = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

const regexPrefix = new RegExp(`/^(((hey|ok|yo)?\s*)?${escapeRegExp(config.botName)}(,|!)?)\s*/`, 'i');

class client extends Client {
  constructor() {
    super({
      defaultClientSchema,
      defaultGuildSchema,
      permissionLevels,
      regexPrefix: regexPrefix,
      prefix: config.development ? 'sb!' : '!',
      commandEditing: true,
      language: 'en-US',
      preserveSettings: false,
      schedule: { interval: 6000 },
    });
    this.utils = utils;
    this.config = config;
    this.constants = {
      coin: Constants.coin,
      error: Constants.error,
      success: Constants.success,
      loading: Constants.loading,
    };
    this.version = '0.0.2';
    this.health = Object.seal({
      commands: {
        temp: {
          count: 0,
          ran: {},
        },
        cmdCount: new Array(60).fill({
          count: 0,
          ran: {},
        }),
      },
    });
  }

  login() {
    return super.login(token);
  }
}

const SparkyClient = new client();

module.exports = SparkyClient;

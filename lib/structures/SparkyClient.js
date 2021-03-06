/**
 * @author Anish Shobith
 * @license MIT
 * @file SparkyClient.js
 */

/* eslint-disable no-useless-escape */

const { Client } = require('klasa');
const { config } = require('../../config');
const defaultClientSchema = require('../Schemas/defaultGuildSchema');
const defaultGuildSchema = require('../Schemas/defaultGuildSchema');
const permissionLevels = require('./permissionLevels');
const { version } = require('../../package.json');
const { Constants, token } = config;
const DBL = require('dblapi.js');

const escapeRegExp = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

const regexPrefix = new RegExp(`/^(((hey|ok|yo)?\s*)?${escapeRegExp(config.botName)}(,|!)?)\s*/`, 'i');

class client extends Client {
  constructor() {
    super({
      defaultClientSchema,
      defaultGuildSchema,
      permissionLevels,
      regexPrefix: regexPrefix,
      prefix: config.prefix,
      commandEditing: true,
      language: 'en-US',
      preserveSettings: false,
      schedule: { interval: 6000 },
      ownerID: '259008949427109891',
    });
    this.config = config;
    this.constants = Constants;
    this.version = version;
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
    this.embed = require('./embed');
    this.dbl = new DBL(this.config.dbl, client);
  }

  login() {
    return super.login(token);
  }
}

const SparkyClient = new client();

module.exports = SparkyClient;

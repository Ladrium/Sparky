/**
 * @author Anish Shobith
 * @license MIT
 * @file utils.js
 */

const { util: { toTitleCase } } = require('klasa');

class Util {
  constructor(client) {
    this.client = client;
  }
  static trimArray(arr, maxLen = 10) {
    if (arr.length > maxLen) {
      const len = arr.length - maxLen;
      arr = arr.slice(0, maxLen);
      arr.push(`${len} more...`);
    }
    return arr;
  }

  static firstUpperCase(text, split = ' ') {
    return text.split(split).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join(' ');
  }

  static isUpvoter(userId) {
    if (userId.id) userId = userId.id;
    if (userId.author) userId = userId.author.id;
    this.client.dbl.hasVoted(userId);
  }

  static postStats() {
    if (!this.client.ready) return Promise.resolve();
    return this.client.dbl.postStats(this.client.guilds.size);
  }

  static capitalize(str) {
    return str.split('_').map(toTitleCase).join(' ');
  }

  static random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  static randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

module.exports = Util;

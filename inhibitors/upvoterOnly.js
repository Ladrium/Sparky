const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {
  constructor(...args) {
    super(...args, { spamProtection: false });
  }

  run(msg, cmd) {
    if (!cmd.upvoteOnly) return;
    if (this.client.utils.isUpvoter(msg.author)) return;
    throw `🔒 *${msg.language.get('CMD_UPVOTE_ONLY')}*`;
  }
};
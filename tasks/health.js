// Copyright (c) 2018-2019 AdityaTD. All rights reserved. MIT license.

const { Task } = require('klasa');

class health extends Task {
  run() {
    this.client.health.commands.cmdCount.shift();
    this.client.health.commands.cmdCount.push(this.client.health.commands.temp);
    this.client.health.commands.temp = {
      count: 0,
      ran: {},
    };
  }

  async init() {
    if (!this.client.settings.schedules.some(task => task.taskName === this.name)) {
      await this.client.schedule.create(this.name, '* * * * *');
    }
  }
}

module.exports = health;

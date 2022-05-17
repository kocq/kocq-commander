

class Command {
  constructor(commandHead, commandArgs) {
    this.commandHead = commandHead;
    this.commandArgs = commandArgs;
    this.cb = null;
    this.curCommander = null;
  }

  action(fn) {
    this.cb = fn;
    return this.curCommander;
  }

  setCommander(commander) {
    this.curCommander = commander;
  }
}

module.exports = Command;
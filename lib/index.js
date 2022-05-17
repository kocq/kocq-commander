const KocqMessage = require('koa-oicq-message');
const Command = require('./command');

class KocqCommander {
  constructor() {
    this.commandList = new Map();
    this.message = new KocqMessage();
    this.message.use(async (ctx, next) => {
      let originMessage = ctx.rowMsg;
      let command = parseMessage.call(this, originMessage);
      if (command) {
        let cb = this.commandList.get(command.commandHead).cb;
        cb && cb(ctx, next, ...command.commandArgs);
      }
    })
  }



  callback() {
    return this.message.callback();
  }

  directive(command) {
    let com = parseCommand(command);
    if (!this.commandList.has(com.commandHead)) this.commandList.set(com.commandHead, com);
    com.setCommander(this);
    return com;
  }

  install(add) {
    add(this.callback());
  }

}

/** 解析命令 */
function parseCommand(command) {
  let pattern = /\<.+?\>|\[.+?\]|[^\s]+/g;
  let origin = command.match(pattern);
  if (!origin.length) return;
  let commandHead = origin.shift();
  let originArgs = origin.map(item => {
    return item.replace(/^\[|\]$|^\<|\>$/g, '');
  })
  let commandArgs = {};
  for (let i of originArgs) commandArgs[i] = undefined;
  return new Command(commandHead, commandArgs);
}

/** 解析消息 */
function parseMessage(message) {
  let pattern = /\(.+?\)|[^\s]+/g;
  if (!message) return;
  let origin = message.match(pattern);
  if (!origin.length) return;
  let commandHead = origin.shift();
  let originArgs = origin.map(item => {
    return item.replace(/^\(|\)$/g, '');
  })

  if (this.commandList.has(commandHead)) {
    return { commandHead, commandArgs: originArgs };
  }
}

module.exports = KocqCommander;
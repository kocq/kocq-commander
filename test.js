const KocqCommander = require('.');

const commander = new KocqCommander();

commander.directive('$list <name> [age]')
  .action(() => {

  })
  .directive('$all <num>')
  .action(() => {

  })

console.log(commander.commandList.get('$list'));
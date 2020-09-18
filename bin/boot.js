#!/usr/bin/env node
const program = require('commander')
program.version(require('../package.json').version)

program
  .command('init <name>')
  .description('init project')
  .action(require('../lib/init'))

program
  .command('refresh')
  .description('monitoring vue2.0 adn vue3.0')
  .action(require('../lib/refresh'))

program
  .command('doctor')
  .description('monitoring vue2.0 adn vue3.0')
  .action(require('../lib/doctor'))

program.parse(process.argv)
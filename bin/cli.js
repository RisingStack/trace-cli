#!/usr/bin/env node
'use strict'

const program = require('commander')
const pkg = require('../package.json')

program
  .version(pkg.version)
  .usage('[subcommand] <args ...>')
  .description('Example: trace-cli deployhook --git')
  .command('deployhook', 'Sends deployhook to highlight your application versions in Trace')
  .parse(process.argv)

'use strict'

const program = require('commander')
const merge = require('lodash.merge')
const deployhook = require('../lib/deployhook')

program
  .usage('<args ...>')
  .option('-g, --git [value]', 'use last GIT commit for revision, description and user')
  .option('-r, --revision [value]', 'deploy revision, like GIT short hash')
  .option('-m, --message [value]', 'deploy message, like commit message')
  .option('-u, --user [value]', 'deploy created by, like committer')
  .option('--api-key [value]', 'TRACE_API_KEY from Trace')
  .option('--service-name [value]', 'TRACE_SERVICE_NAME from Trace')
  .parse(process.argv)

// output help by default
if (!process.argv.slice(2).length) {
  program.outputHelp()
  process.exit(1)
}

const apiKey = program.apiKey || process.env.TRACE_API_KEY
const serviceName = program.serviceName || process.env.TRACE_SERVICE_NAME

// validation
if (!apiKey) {
  console.error('--api-key argument or TRACE_API_KEY environment variable is required')
  process.exit(1)
}
if (!serviceName) {
  console.error('--service-name argument or TRACE_SERVICE_NAME environment variable is required')
  process.exit(1)
}

// deploy data
let revision = {
  revision: '',
  description: '',
  user: ''
}

// from git
if (program.git) {
  const gitRevision = deployhook.revision.getGIT()
  revision = merge(revision, gitRevision)
} else {
  ['message', 'revison', 'user'].forEach((arg) => {
    if (!program[arg]) {
      console.error(`--${arg} argument is required, or use --git`)
      process.exit(1)
    }
  })
}

// from arguments
const argumentRevision = {
  revision: program.revision,
  description: program.message,
  user: program.user
}
revision = merge(revision, argumentRevision)

// send to Trace
deployhook.api.send(apiKey, serviceName, revision, function (err) {
  if (err) {
    console.error(`Deployhook rejected: ${err.message}`)
    process.exit(1)
  }

  console.log('Deployhook accepted!')
  process.exit(0)
})

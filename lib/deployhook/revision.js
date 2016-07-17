'use strict'

const fs = require('fs')
const execSync = require('child_process').execSync

function getGIT () {
  // check for git repo
  try {
    fs.accessSync('.git')
  } catch (err) {
    console.log(err)
    console.error('Not a valid git repository')
    process.exit(1)
  }

  const revision = {
    revision: execSync('git rev-parse --short HEAD').toString().trim(),
    description: execSync('git log -1 --pretty=%B').toString().trim(),
    user: execSync('git --no-pager show -s --format=\'%an <%ae>\'').toString().trim()
  }

  return revision
}

module.exports = {
  getGIT
}

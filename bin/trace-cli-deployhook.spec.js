'use strict'

const expect = require('chai').expect
const execSync = require('child_process').execSync
const path = require('path')
const cli = path.join(__dirname, 'trace-cli-deployhook')

describe('deployhook', function () {
  it('should reject without api key', () => {
    const fn = () => {
      execSync(`node ${cli} --service-name foo`).toString()
    }

    expect(fn).to.throw(/TRACE_API_KEY/)
  })

  it('should reject without service name', () => {
    const fn = () => {
      execSync(`node ${cli} --api-key bar`).toString()
    }

    expect(fn).to.throw(/TRACE_SERVICE_NAME/)
  })
})

'use strict'

const nock = require('nock')

afterEach(function afterEach () {
  nock.cleanAll()
})

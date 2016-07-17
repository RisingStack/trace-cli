'use strict'

const expect = require('chai').expect
const nock = require('nock')
const api = require('./api')

describe('deployhook api', () => {
  describe('#send', () => {
    it('should send to api', (done) => {
      const revision = {
        description: 'foo',
        user: 'bar',
        revision: 'such'
      }

      const traceAPI = nock('https://api.trace.risingstack.com')
        .post('/service/service-name/deployment', revision)
        .reply(200)

      api.send('api-key', 'service-name', revision, () => {
        expect(traceAPI.isDone()).to.be.true
        done()
      })
    })

    it('should handle api error', (done) => {
      const revision = {
        description: 'foo',
        user: 'bar',
        revision: 'such'
      }

      const traceAPI = nock('https://api.trace.risingstack.com')
        .post('/service/service-name/deployment', revision)
        .reply(400)

      api.send('api-key', 'service-name', revision, (err) => {
        expect(traceAPI.isDone()).to.be.true
        expect(err.message).to.be.equal('Error happened')
        done()
      })
    })
  })
})

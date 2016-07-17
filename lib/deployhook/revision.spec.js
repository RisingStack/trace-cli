'use strict'

const expect = require('chai').expect
const revision = require('./revision')

describe('deployhook revision', () => {
  describe('#getGIT', () => {
    it('should read revision', () => {
      const gitRevision = revision.getGIT()

      expect(gitRevision.revision).to.have.lengthOf(7)
      expect(gitRevision.user).to.be.string
      expect(gitRevision.description).to.be.string
    })
  })
})

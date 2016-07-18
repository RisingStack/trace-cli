'use strict'

const url = require('url')
const https = require('https')
const traceAPI = process.env.TRACE_COLLECTOR_API_URL || 'https://api.trace.risingstack.com'
const URI = url.parse(traceAPI)

function send (apiKey, serviceName, revision, callback) {
  const postData = JSON.stringify(revision)
  const path = `/service/${serviceName}/deployment`

  const options = {
    hostname: URI.hostname,
    port: 443,
    path: encodeURI(path),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      'Authorization': `Bearer ${apiKey}`
    }
  }

  const req = https.request(options, (res) => {
    // ok
    if (res.statusCode === 201) {
      return callback()
    }

    // error
    let data = ''

    res.setEncoding('utf8')
    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', (chunk) => {
      callback(new Error(data || 'Error happened'))
    })
  })

  req.on('error', (err) => {
    callback(err)
  })

  req.write(postData)
  req.end()
}

module.exports = {
  send
}

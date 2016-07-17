'use strict'

const https = require('https')
const traceAPI = process.env.TRACE_COLLECTOR_API_URL || 'api.trace.risingstack.com'

function send (apiKey, serviceName, revision, callback) {
  const postData = JSON.stringify(revision)
  const path = `/service/${serviceName}/deployment`

  const options = {
    hostname: traceAPI,
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

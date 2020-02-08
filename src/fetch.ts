require('dotenv').config()

export function fetchCollection(callback: any) {
  'use strict'

  const httpTransport = require('https')
  const responseEncoding = 'utf8'
  const httpOptions = {
    hostname: 'boardgamegeek.com',
    port: '443',
    path: `/xmlapi2/collection/?username=${process.env.BGG_USERNAME}&own=1&prevowned=0&preordered=0&wanttobuy=0&wishlist=0&want=0&showprivate=1`,
    method: 'POST',
    headers: {
      Cookie: `bggusername=${process.env.BGG_USERNAME}; bggpassword=${process.env.BGG_PASSWORD}`
    }
  }

  // httpOptions.headers['User-Agent'] = 'node ' + process.version

  // Paw Follow Redirects option is not supported
  // Paw Store Cookies option is not supported

  const request = httpTransport
    .request(httpOptions, (res: any) => {
      let responseBufs: any = []
      let responseStr = ''

      res
        .on('data', (chunk: any) => {
          if (Buffer.isBuffer(chunk)) {
            responseBufs.push(chunk)
          } else {
            responseStr = responseStr + chunk
          }
        })
        .on('end', () => {
          responseStr =
            responseBufs.length > 0
              ? Buffer.concat(responseBufs).toString(responseEncoding)
              : responseStr

          callback(null, res.statusCode, res.headers, responseStr)
        })
    })
    .setTimeout(0)
    .on('error', (error: any) => {
      callback(error)
    })
  request.write('')
  request.end()
}

const ApiBuilder = require('claudia-api-builder')
const AWS = require('aws-sdk')
const comprehend = new AWS.Comprehend({ apiVersion: '2017-11-27' })
const api = new ApiBuilder()

const detectSentiment = params => new Promise((resolve, reject) => {
  comprehend.detectSentiment(params, (err, data) => {
    if (err) {
      reject(err)
      return
    }

    resolve(data)
  })
})

const detectKeyPhrases = params => new Promise((resolve, reject) => {
  comprehend.detectKeyPhrases(params, (err, data) => {
    if (err) {
      reject(err)
      return
    }

    resolve(data)
  })
})

const detectEntities = params => new Promise((resolve, reject) => {
  comprehend.detectEntities(params, (err, data) => {
    if (err) {
      reject(err)
      return
    }

    resolve(data)
  })
})

api.get('/', () => 'Working!')

api.post('/analyze', async (r) => {
  const params = {
    LanguageCode: r.headers['Accept-Language'] || 'en',
    Text: r.body
  }

  const sentiment = await detectSentiment(params)
  const phrases = await detectKeyPhrases(params)
  const entities = await detectEntities(params)

  return {
    sentiment,
    phrases,
    entities
  }
})

module.exports = api

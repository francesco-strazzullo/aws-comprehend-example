import entitiesTable from './components/entityTable.js'
import phrasesTable from './components/phrasesTable.js'
import sentiment from './components/sentiment.js'

const analyze = async (language, text) => {
  const response = await window.fetch('https://nw9zhnsip4.execute-api.eu-west-1.amazonaws.com/development/analyze', {
    method: 'POST',
    headers: {
      'Accept-Language': language
    },
    body: text
  })

  return response.json()
}

const select = document.querySelector('select')
const textarea = document.querySelector('textarea')
const button = document.querySelector('button')
const resultArea = document.querySelector('[data-result]')

button.addEventListener('click', async () => {
  try {
    const result = await analyze(select.value, textarea.value)

    resultArea.appendChild(sentiment(_.get(result, 'sentiment')))
    resultArea.appendChild(entitiesTable(_.get(result, 'entities.Entities', [])))
    resultArea.appendChild(phrasesTable(_.get(result, 'phrases.KeyPhrases', [])))
  } catch (e) {
    resultArea.textContent = `Error: ${e.message}`
  }
})

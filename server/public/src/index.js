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
    resultArea.textContent = `The sentiment is ${result.Sentiment}`
  } catch (e) {
    resultArea.textContent = `Error: ${e.message}`
  }
})

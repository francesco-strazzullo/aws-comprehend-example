
const tableTemplate = document.querySelector('template[data-sentiment]')

export default sentiment => {
  const table = tableTemplate.content.firstElementChild.cloneNode(true)
  table.querySelector('[data-sentiment-result]').textContent = _.get(sentiment, 'Sentiment')
  return table
}

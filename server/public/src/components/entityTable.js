const tableTemplate = document.querySelector('template[data-entites]')
const rowTemplate = document.querySelector('template[data-entites-row]')

const createRow = entity => {
  const row = rowTemplate.content.firstElementChild.cloneNode(true)
  row
    .querySelectorAll('[data-bind]')
    .forEach(element => {
      const key = element.dataset.bind
      element.textContent = entity[key]
    })
  return row
}

export default entities => {
  const table = tableTemplate.content.firstElementChild.cloneNode(true)

  const body = table.querySelector('tbody')
  _.orderBy(entities, ['Score'], ['desc'])
    .map(createRow)
    .forEach(row => {
      body.appendChild(row)
    })

  return table
}

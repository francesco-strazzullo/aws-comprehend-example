const tableTemplate = document.querySelector('template[data-phrases]')
const rowTemplate = document.querySelector('template[data-phrases-row]')

const createRow = entity => {
  const row = rowTemplate.content.firstElementChild.cloneNode(true)
  row.querySelector('td').textContent = entity.Text
  return row
}

export default phrases => {
  const table = tableTemplate.content.firstElementChild.cloneNode(true)

  const body = table.querySelector('tbody')
  phrases
    .map(createRow)
    .forEach(row => {
      body.appendChild(row)
    })

  return table
}

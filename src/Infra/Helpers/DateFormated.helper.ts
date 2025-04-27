const date = new Date()

const formattedDate = date.toLocaleDateString('pt-BR', {
  timeZone: 'America/Sao_Paulo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})

const SPLITED_DATE = String(formattedDate).split(', ')
const REMOVE_BAR = String(SPLITED_DATE[0]).split('/');
const dateDBQuery = `${REMOVE_BAR[2]}-${REMOVE_BAR[1]}-${REMOVE_BAR[0]}`

export {
  formattedDate,
  dateDBQuery
}
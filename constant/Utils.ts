import _ from 'lodash'

function setComma(str: string | number): string {
  const parts = _.toString(str).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

function delComma(str: string | number): string {
  return _.toString(str).replace(/,/g, '')
}

export default {
  setComma,
  delComma,
}

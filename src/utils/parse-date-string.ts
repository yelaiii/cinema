export function parseDDMMYY(dateString: string) {
  let [day, month, year] = dateString.split('.').map(Number)
  return new Date(year + 2000, month - 1, day)
}

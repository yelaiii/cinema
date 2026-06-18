export function parseDDMMYY(dateString: string) {
  const [day, month, year] = dateString.split('.').map(Number)
  return new Date(year + 2000, month - 1, day)
}

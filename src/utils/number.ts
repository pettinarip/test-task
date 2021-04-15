const numberFormatter = new Intl.NumberFormat('en-US')

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatNumber(number: number) {
  return numberFormatter.format(number)
}

export function formatCurrency(amount: number) {
  return currencyFormatter.format(amount)
}
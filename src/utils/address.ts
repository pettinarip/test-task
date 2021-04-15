export function short(address: string) {
  if (address.length < 10) {
    return address
  }

  return `${address.substr(0, 5)}...${address.substr(-4)}`
}
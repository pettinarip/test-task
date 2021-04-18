export function short(address: string): string {
  if (address.length < 10) {
    return address
  }

  return `${address.substr(0, 5)}...${address.substr(-4)}`
}

export function isAddress(address: string): boolean {
  return /^(0x)?[0-9a-f]{40}$/i.test(address)
}
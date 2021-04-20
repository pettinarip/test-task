export function formatDate(date: Date): string {
  if (!isValid(date)) {
    return "";
  }

  const year = date.getFullYear().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${month}-${day}-${year} ${hours}:${minutes}`;
}

export function fromString(date: string): Date {
  const segments = date.match(/^(\d{2})-(\d{2})-(\d{4})\s(\d{2}):(\d{2})$/);
  if ((segments || []).length < 5) {
    throw new Error("Incorrect date format. 'mm-dd-yyyy hh:mm' is used.");
  }

  const seg = segments?.map(Number);
  return new Date(seg![3], seg![1] - 1, seg![2], seg![4], seg![5]);
}

export function isValid(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

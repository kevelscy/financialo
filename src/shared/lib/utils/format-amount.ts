export function formatAmount(amountStr: string): number {
  const num = parseFloat(amountStr);

  if (isNaN(num)) {
    throw new Error(`Invalid amount: "${amountStr}"`);
  }

  // Truncar a 2 decimales sin redondear
  const truncated = Math.floor(num * 100) / 100;

  return truncated;
}

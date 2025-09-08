export function formatCurrency(
  amount: number,
  showDecimals: boolean = true
): string {
  if (isNaN(amount)) {
    return (0).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: showDecimals ? 2 : 0,
      maximumFractionDigits: showDecimals ? 2 : 0,
    });
  }

  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });
}

export default function formatCurrency(amount) {
  const currencyFormat = new Intl.NumberFormat("NG", {
    style: "currency",
    currency: "NGN",
  });
  const formatted = currencyFormat.format(amount);
  const nairaFormat = formatted
    .replace("NGN", "₦")
    .replace(/\u00A0/g, "")
    .split(".")[0];
  //   console.log(formatted.replace("NGN", "₦").replace(/\u00A0/g, ""));

  return nairaFormat;
}

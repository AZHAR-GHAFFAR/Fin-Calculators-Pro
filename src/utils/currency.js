// Currency formatting utility
export const formatCurrency = (amount, locale = 'en-PK') => {
  const formatted = amount.toLocaleString(locale, { maximumFractionDigits: 0 });
  return `Rs. ${formatted}`;
};

export const currencySymbol = 'Rs.';
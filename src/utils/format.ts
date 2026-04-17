export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(amount);
};

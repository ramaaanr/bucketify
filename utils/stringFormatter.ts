const rupiahFormatter = (amount: number): string => {
  const formattedAmount = amount.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formattedAmount.replace('IDR', 'Rp').trim();
};

const shortenProductName = (name: string): string => {
  const maxLength = 35;
  if (name.length > maxLength) {
    return name.substring(0, maxLength) + '...';
  } else {
    return name;
  }
};

export { rupiahFormatter, shortenProductName };

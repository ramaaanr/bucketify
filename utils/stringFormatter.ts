import moment from 'moment';

const rupiahFormatter = (amount: number): string => {
  if (typeof amount == 'undefined') {
    return 'Rp0';
  }
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

const dateFormatter = (date: string): string => {
  moment.locale('id'); // Set locale globally
  const tanggal = moment(date);
  return tanggal.format('LL');
};

export { rupiahFormatter, shortenProductName, dateFormatter };

function toCurrency(summ) {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency'
  }).format(summ);
}

export default {
  toCurrency
};
$(document).ready(function() {
  $('.jsPrice').each(function() {
    this.textContent = new Intl.NumberFormat('ru-RU', {
      currency: 'rub',
      style: 'currency'
    }).format(this.textContent)
  })
})
$(document).ready(function() {
  $('.jsPrice').each(function() {
    this.textContent = new Intl.NumberFormat('ru-RU', {
      currency: 'rub',
      style: 'currency'
    }).format(this.textContent)
  })

  $('.jsDate').each(function() {
    this.textContent = new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      seconds: '2-digit'
    }).format(new Date(this.textContent))
  })
})
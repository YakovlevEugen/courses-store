$(document).ready(function() {
  const cartElement = $('.cart');

  cartElement.on('click', event => {
    if ($(event.target).hasClass('js-cart-remove-course')) {
      const id = event.target.dataset.id;

      fetch(`/cart/remove/${id}`, {
        method: 'delete'
      }).then(res => res.json())
        .then(cart => {
          if (cart.courses.length) {
            const html = cart.courses.map(course => `
              <tr>
                <td>${course.title}</td>
                <td>${course.count}</td>
                <td class="jsPrice">${new Intl.NumberFormat('ru-RU', {currency: 'rub', style: 'currency'}).format(course.price)}</td>
                <td>
                  <div class="ui buttons">
                    <button class="ui button basic red icon js-cart-remove-course" data-id="${course.id}">
                      <i class="icon remove" />
                    </button>
                  </div>
                </td>
              </tr>
            `).join('');
            cartElement.find('tbody').html(html);
            cartElement.find('.jsCartTotal').text(new Intl.NumberFormat('ru-RU', {
              currency: 'rub',
              style: 'currency'
            }).format(cart.totalCost))
          } else {
            cartElement.html('<p>Курсы не добавлены</p>');
          }
        })
          .catch(err => {
            console.log(err);
          })
    }
  });
});
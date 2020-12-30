$(document).ready(function() {
  const formAuth = $('.form-auth')

  if (formAuth) {
    const validatedFields = {
      email: 'empty',
      password: 'empty'
    }
    const formAuthValidatedFields = $('.form-auth__input').filter((i, item) => validatedFields[item.name])

    formAuth.form({
      fields: validatedFields
    })
  
    formAuth.on('submit', () => {
      formAuthValidatedFields.each(function(i) {
        if (formAuth.form('is valid', this.name)) {
          $(this).siblings('.prompt').addClass('hidden')
        } else {
          $(this).siblings('.prompt').removeClass('hidden')
        }
      })
    })
  }
})
$(document).ready(function() {
  const formRegister = $('.form-register')

  if (formRegister) {
    const validatedFields = {
      email: 'empty',
      password: 'empty',
      'confirm-password': 'empty'
    }
    const formRegisterValidatedFields = $('.form-register__input').filter((i, item) => validatedFields[item.name])

    formRegister.form({
      fields: validatedFields
    })
  
    formRegister.on('submit', () => {
      formRegisterValidatedFields.each(function(i) {
        if (formRegister.form('is valid', this.name)) {
          $(this).siblings('.prompt').addClass('hidden')
        } else {
          $(this).siblings('.prompt').removeClass('hidden')
        }
      })
    })
  }
})
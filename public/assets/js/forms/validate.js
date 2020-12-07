$(document).ready(function() {
  const formAddCourse = $('.form-add-course');

  if (formAddCourse) {
    const validatedFields = {
      title: 'empty',
      cost: 'number'
    };
    const formAddCourseValidatedFields = $('.form-add-course__input').filter((i, item) => validatedFields[item.name]);

    formAddCourse.form({
      fields: validatedFields
    });
  
    formAddCourse.on('submit', () => {
      formAddCourseValidatedFields.each(function(i) {
        if (formAddCourse.form('is valid', this.name)) {
          $(this).siblings('.prompt').addClass('hidden');
        } else {
          $(this).siblings('.prompt').removeClass('hidden');
        }
      });
    });
  }
});
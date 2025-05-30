$(document).ready(function() {
  $('form').submit(function(event) {
      if (!check_form(this) || !check_name(this) || !check_phone(this) || !check_q3(this)) {
          event.preventDefault(); // Предотвращаем отправку формы, если есть ошибки
      }
  });
});


function check_form(form) {
  let isValid = true;
  $(form).find('input, select, textarea').each(function() {
      $(this).removeClass("error");
      let type = $(this).attr('type');
      let value = $(this).val();

      if (type === 'text' || type === 'email' || type === 'tel' || type === 'number' || type === 'textarea') {
          if (!value) {
              $(this).addClass("error").focus();
              isValid = false;
          }
      } else if (type === 'radio') {
          let name = $(this).attr('name');
          if ($(`input[name="${name}"]:checked`).length === 0) {
              $(this).addClass("error").focus();
              isValid = false;
          }
      } else if (type === 'checkbox') {
          let name = $(this).attr('name');
          if ($(`input[name="${name}"]:checked`).length === 0) {
              $(this).addClass("error").focus();
              isValid = false;
          }
      } else if (type === 'select-one') {
          if ($(this).val() === '') {
              $(this).addClass("error").focus();
              isValid = false;
          }
      } else if (type === 'number') {
          if (isNaN(value)) {
              $(this).addClass("error").focus();
              isValid = false;
          }
      }
  });
  return isValid;
}


function check_q3(form) {
  let isValid = true;
  $('#q3', form).each(function() {
      let value = $(this).val();
      if (value !== '' && isNaN(value)) {
          $(this).addClass("error").focus();
          isValid = false;
      }
  });
  return isValid;
}


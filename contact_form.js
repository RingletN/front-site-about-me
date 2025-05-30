$(function() {
  const $nameInp = $("#name");
  const $mRadio = $("#male");
  const $fRadio = $("#female");
  const $bday = $("#birthdate");
  const $phoneInp = $("#phone");
  const $emailInp = $("#email");
  const $msgInp = $("#message");
  const $submitButton = $("#submit_button");
  $submitButton.prop('disabled', !false).toggleClass('disabled-button', !false);
  const $resetButton = $("#reset_button");

  let tooltipTimeout;
  let currentTooltipElement = null; // Отслеживаем текущий элемент с подсказкой

  function showTooltip(element, message) {
    if (currentTooltipElement) {
      clearTimeout(tooltipTimeout);
      $(currentTooltipElement).next('.tooltip').hide();
    }

    let tooltip = element.next('.tooltip');
    if (tooltip.length === 0) {
        tooltip = $('<div class="tooltip">').insertAfter(element);
    }

    tooltip.text(message).show();
    currentTooltipElement = element;
    clearTimeout(tooltipTimeout);
    tooltipTimeout = setTimeout(() => {
      tooltip.hide();
      currentTooltipElement = null;
    }, 3000);
  }

  function validateField(element, validator, tooltipText) {
    const isValid = validator(element);
    element.toggleClass('error', !isValid).toggleClass('ok', isValid);
    checkFormValidity();
  }

  function checkFormValidity() {
    const isValid = checkNameValidation() && checkGenderSelection() && checkBirthDateValidation() && checkPhoneValidation() && checkEmailValidation() && checkMessageValidation();
    $submitButton.prop('disabled', !isValid).toggleClass('disabled-button', !isValid);
  }

  // Валидаторы для полей
  function checkNameValidation() {
    const name = $nameInp.val().trim();
    return name.length > 0 && name.split(/\s+/).length === 3 && /^[а-яА-ЯёЁa-zA-Z\s]+$/.test(name);
  }

  function checkGenderSelection(){
    return $mRadio.is(':checked') || $fRadio.is(':checked');
  }

  function checkBirthDateValidation() {
    return $bday.val().trim() !== '';
  }

  function checkPhoneValidation() {
    const phone = $phoneInp.val().trim();
    return (phone.startsWith('+7') || phone.startsWith('+3')) && /^\+?[0-9]+$/.test(phone) && phone.length >= 9 && phone.length <= 11;
  }

  function checkEmailValidation() {
    const email = $emailInp.val().trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function checkMessageValidation() {
    return $msgInp.val().trim() !== '';
  }

  // Используем mouseover для показа подсказки
  $nameInp.on("mouseover", () => showTooltip($nameInp, "Поле ФИО обязательно для заполнения. Необходимо ввести 3 раздельных слова без спецсимволов."));
  $nameInp.on("blur", () => validateField($nameInp, checkNameValidation));

  $bday.on("mouseover", () => showTooltip($bday, "Поле Дата Рождения не должно быть пустым."));
  $bday.on("blur", () => validateField($bday, checkBirthDateValidation));

  $phoneInp.on("mouseover", () => showTooltip($phoneInp, "Номер должен начинаться с +7 или +3, содержать только цифры и иметь длину от 9 до 11 символов."));
  $phoneInp.on("blur", () => validateField($phoneInp, checkPhoneValidation));

  $emailInp.on("mouseover", () => showTooltip($emailInp, "Поле E-Mail не должно быть пустым, должно иметь следующий макет: example@email.com"));
  $emailInp.on("blur", () => validateField($emailInp, checkEmailValidation));

  $msgInp.on("mouseover", () => showTooltip($msgInp, "Поле Сообщение не должно быть пустым."));
  $msgInp.on("blur", () => validateField($msgInp, checkMessageValidation));

  $mRadio.on("change", checkFormValidity);
  $fRadio.on("change", checkFormValidity);

  $resetButton.click(function(event) {
    // Находим все элементы формы с классами 'ok' или 'error'
    const $elementsWithErrorOrOk = $('form :input').filter(function() {
      return $(this).hasClass('ok') || $(this).hasClass('error');
    });
  
    // Удаляем классы 'ok' и 'error' у найденных элементов
    $elementsWithErrorOrOk.removeClass('ok error');

  });

  $submitButton.click(function(e) {
    e.preventDefault(); // Предотвращаем стандартную отправку формы
    showModal();
  });

  function showModal() {
    const modal = `
      <div id="modal" class="modal">
        <div class="modal-content">
          <p>Вы действительно хотите отправить форму?</p>
          <button id="yes_button">Да</button>
          <button id="no_button">Нет</button>
        </div>
      </div>
    `;

    $('body').append(modal);

    $('#modal').addClass('show'); // Добавляем класс 'show' для отображения

    $('#yes_button').click(function() {
      $('form').submit();
      $('#modal').remove();
    });

    $('#no_button').click(function() {
      $('#modal').remove();
    });
  }
});

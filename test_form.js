$(function() {
  const $nameInp = $("#fio");
  const $q3 = $("#q3");
  const $q1_c = $("#q1-c");
  const $q1_a = $("#q1-a");
  const $q1_b = $("#q1-b");

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

          // Функция проверки валидности всей формы
          function checkFormValidity() {
            const isValid = checkNameValidation()  && checkQ3Validation() && checkQ1Selection();
            $submitButton.prop('disabled', !isValid).toggleClass('disabled-button', !isValid);
          }

   // Валидатор для поля q3
   function checkQ3Validation() {
    const q3Value = $q3.val().trim();
    const parsed = parseInt(q3Value, 10); // 10 - основание системы счисления (десятичная)
    return q3Value !== '' && !isNaN(parsed) && parsed.toString() === q3Value;
  }
  
  
    // Валидатор для фио
    function checkNameValidation() {
        const name = $nameInp.val().trim();
        return name.length > 0 && name.split(/\s+/).length === 3 && /^[а-яА-ЯёЁa-zA-Z\s]+$/.test(name);
      }

      //для 1го вопроса чекбокс
      function checkQ1Selection() {
        return $q1_a.is(':checked') || $q1_b.is(':checked') || $q1_c.is(':checked');
      }

  // Используем mouseover для показа подсказки
  $nameInp.on("mouseover", () => showTooltip($nameInp, "Поле ФИО обязательно для заполнения. Необходимо ввести 3 раздельных слова без спецсимволов."));
  $nameInp.on("blur", () => validateField($nameInp, checkNameValidation));

  $q3.on("mouseover", () => showTooltip($q3, "Ответ должен быть целым числом!"));
  $q3.on("blur", () => validateField($q3, checkQ3Validation));

  $q1_a.on("change", checkFormValidity);
  $q1_b.on("change", checkFormValidity);
  $q1_c.on("change", checkFormValidity);

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

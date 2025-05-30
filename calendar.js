$(document).ready(function() {
  populateMonths();
  populateYears();
  updateDays();

  $('#month, #year').change(updateDays); 

  $(document).click(function(event) {
    if (!$('#birthdate').is(event.target) && !$('#birthdate').has(event.target).length && !$('#calendar').is(event.target) && !$('#calendar').has(event.target).length) {
      $('#calendar').hide();
    }
  });
});

function toggleCalendar() {
  $('#calendar').toggle();
}

function populateMonths() {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  $.each(monthNames, function(index, month) {
    $('#month').append($('<option>', {
      value: index,
      text: month
    }));
  });
}

function populateYears() {
  const currentYear = new Date().getFullYear();

  for (let i = currentYear - 100; i <= currentYear; i++) {
    $('#year').append($('<option>', {
      value: i,
      text: i
    }));
  }
}

function updateDays() {
  const month = parseInt($('#month').val());
  const year = parseInt($('#year').val());
  const daysContainer = $('#days');

  daysContainer.empty();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); 

  for (let i = 0; i < firstDay; i++) {
    daysContainer.append('<div class="day" data-active="false"></div>');
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const day = $('<div class="day" data-active="true">').text(i);
    day.click(function() {
      $('#birthdate').val((month + 1) + '/' + i + '/' + year);
      $('#birthdate').focus();
      toggleCalendar();
    });
    daysContainer.append(day);
  }
}



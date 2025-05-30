$(document).ready(function() {
  function updateDateTime() {
      const now = new Date();
      const options = { weekday: 'short', year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const formattedDateTime = now.toLocaleDateString('ru-RU', options);
      $('#currentDateTime').text(formattedDateTime);
  }

  setInterval(updateDateTime, 1000);
  updateDateTime();
});

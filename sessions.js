
    // Получаем таблицы и их тела
    const $currtable = $("#currSession");
    const $currtableBody = $currtable.find('tbody');
    const $alltable = $("#allSession");
    const $alltableBody = $alltable.find('tbody');
  
    // Получаем историю сессии из sessionStorage
    let sessionHistory = JSON.parse(sessionStorage.getItem('sessionHistory')) || {};
  
    // Получаем историю всех сессий из localStorage
    let allTimeHistory = JSON.parse(localStorage.getItem('allTimeHistory')) || {};

    // Текущая сессия
    $currtable.find('tbody tr').each(function(index) {
      if (index >= 0) { 
        const $currRow = $(this);
        const currPageName = $currRow.find('td:first').text();
        const currVisitsCountCell = $currRow.find('td:last');
        currVisitsCountCell.text(sessionHistory[currPageName] || 0);
      }
    });
  
    // Все время
    $alltable.find('tbody tr').each(function(index) {
      if (index >= 0) { 
        const $allRow = $(this);
        const allPageName = $allRow.find('td:first').text();
        const allVisitsCountCell = $allRow.find('td:last');
        allVisitsCountCell.text(allTimeHistory[allPageName] || 0);
      }
    });
  

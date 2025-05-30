
    const urlToName = {   
        'main_page.html': 'Главная',   
        'about.html': 'Обо мне',   
        'interests.html#hobby': 'Мои интересы',   
        'interests.html#movies': 'Мои интересы',   
        'interests.html#music': 'Мои интересы',  
        'study.html': 'Учеба',   
        'photoalbum.html': 'Фотоальбом',   
        'contact.html': 'Контакт',   
        'test.html': 'Тест',   
        'history.html': 'История'   
    };   
  
    function updateHistory(pageName) {
      let sessionHistory = JSON.parse(sessionStorage.getItem('sessionHistory')) || {};
      sessionHistory[pageName] = (sessionHistory[pageName] || 0) + 1;
      sessionStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));
  
      let allTimeHistory = JSON.parse(localStorage.getItem('allTimeHistory')) || {};
      allTimeHistory[pageName] = (allTimeHistory[pageName] || 0) + 1;
      localStorage.setItem('allTimeHistory', JSON.stringify(allTimeHistory));
    }
  
    let currentUrl = window.location.href;
    let index = currentUrl.lastIndexOf('/');   
  currentUrl = currentUrl.substring(index + 1);  
    let pageName = urlToName[currentUrl];
    console.log(currentUrl );
    console.log(pageName);
    
    if (pageName) {
      updateHistory(pageName);
    } 



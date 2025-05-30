$(document).ready(function() {
    const $bigPhotoBox = $('#big_photo_box');
    const $bigPhoto = $('#big_photo');
    const $closeButton = $('.close-button');
    const $photoGrid = $('.photo_grid');
    const $images = $photoGrid.find('img');
    let currentImageIndex = 0;
    const totalImages = $images.length;
  
    const imageSources = $images.map(function(){return $(this).attr('src');}).get();
    const imageTitles = $images.map(function(){return $(this).attr('title');}).get();
    const imageAlts = $images.map(function(){return $(this).attr('alt');}).get();
  
    function updateBigImage() {
      $bigPhoto.attr({
        src: imageSources[currentImageIndex],
        alt: imageAlts[currentImageIndex],
        title: imageTitles[currentImageIndex]
      });
      $('#image-counter').text(`Фото ${currentImageIndex + 1} из ${totalImages}`);
    }
  
    // Добавляем стрелочки
    $bigPhotoBox.append(`
      <div class="carousel-controls">
        <button class="prev-button">&lt;</button>
        <button class="next-button">&gt;</button>
      </div>
    `);
  
    // Обработчики событий для стрелок
    $('.prev-button').click(function() {
      currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
      updateBigImage();
    });
  
    $('.next-button').click(function() {
      currentImageIndex = (currentImageIndex + 1) % totalImages;
      updateBigImage();
    });
  
    // Анимация при переключении изображений
    $('.carousel-controls button').click(function(){
        updateBigImage(); // Обновляем изображение
    });

    // Открытие большого изображения при клике на маленькое
    $images.click(function() {
      currentImageIndex = $images.index(this);
      updateBigImage();
      $bigPhotoBox.css("display", "flex").show();
    });
  
    // Закрытие окна
    $closeButton.click(function() {
      $bigPhotoBox.hide();
    });
  
    // Закрытие окна при клике вне изображения
    $bigPhotoBox.click(function(event) {
      if (event.target === this) {
        $bigPhotoBox.hide();
      }
    });
    
  });
  
  
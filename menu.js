$(document).ready(function() {
    // Получаем текущий URL
    let currentPage = window.location.pathname.split("/").pop();

    // Выделяем текущую страницу в меню
    $('.nav-item a').each(function() {
        if ($(this).attr('href') === currentPage) {
            $(this).parent().addClass('active');
        }
    });

    // Обработчики событий для наведения и убирания мыши
    $('.nav-item').hover(function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
        }
    }, function() {
        let link = $(this).find('a');
        if (link.attr('href') !== currentPage) {
            $(this).removeClass('active');
        }
    });

    // Выпадающее меню для интересов
    $('.dropdown').click(function(e) {
        e.preventDefault();
        $('.dropdown-content').toggleClass('show');
    });

    // Переход на страницу при клике на элемент выпадающего меню
    $('.dropdown-content a').click(function(e) {
        e.preventDefault();
        let href = $(this).attr('href');
        window.location.href = "interests.html" + href;
    });
});

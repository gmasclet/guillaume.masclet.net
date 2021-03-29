(function($) {
  'use scrict';

  var root = $('html, body');
  var isMenuOpen = false;
  var toggleMenu = function() {
    $('nav .fas').toggle();
    $('nav .entry').animate({
      left: isMenuOpen ? '-120%' : '-40px'
    }, 500);
    isMenuOpen = !isMenuOpen;
  }

  $(document).on('click', 'a[href^="#"]', function(event) {
    event.preventDefault();

    root.animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);

    if (isMenuOpen) {
      toggleMenu();
    }
  });

  $('nav .fas').click(toggleMenu)
})(window.jQuery);

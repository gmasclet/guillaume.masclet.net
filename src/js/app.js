(function($) {
  'use scrict';

  var root = $('html, body');

  $(document).on('click', 'a[href^="#"]', function(event) {
    event.preventDefault();

    root.animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);
  });
})(window.jQuery);

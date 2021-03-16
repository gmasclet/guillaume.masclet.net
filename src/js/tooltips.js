(function($) {
    'use scrict';

    function addTooltip(image) {
      var container, tooltip;

      container = document.createElement('span');
      container.setAttribute('class', 'tooltip-container');

      tooltip = document.createElement('div');
      tooltip.setAttribute('class', 'tooltip');
      tooltip.innerHTML = image.alt;

      image.parentNode.insertBefore(container, image);
      container.appendChild(image);
      container.appendChild(tooltip); 
  }

  Array.prototype.forEach.call(document.querySelectorAll('.tools img'), addTooltip);
})(window.jQuery);

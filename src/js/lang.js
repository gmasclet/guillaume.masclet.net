(function() {
  'use scrict';

  var docLang = document.querySelector('html').lang;
  var lang = navigator.language || '';
  var path = document.location.pathname;

  if (path === '/' && !lang.startsWith('fr')) {
    document.location = '/en';
  }

  Array.prototype.forEach.call(document.querySelectorAll('.language'), function(element) {
    if (element.href.endsWith('/' + docLang)) {
      element.setAttribute('class', 'language current');
    }
  });
})();

import $ from 'jquery'

function scrollToArticle(event) {
  event.preventDefault();

  root.animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 1000);

  if (isMenuOpen) {
    toggleMenu();
  }
}

function toggleMenu() {
  burgerIcons.toggle();
  menuItems.animate({
    left: isMenuOpen ? '-120%' : '-40px'
  }, 500);
  isMenuOpen = !isMenuOpen;
}

const root = $('html, body');
const burgerIcons = $('nav .fas');
const menuItems = $('nav .entry');

let isMenuOpen = false;

$(document).on('click', 'a[href^="#"]', scrollToArticle);
burgerIcons.on('click', toggleMenu);

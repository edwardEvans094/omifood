/* eslint-env jquery, browser */
$(document).ready(() => {

  // Place JavaScript code here...

});

$('#goToAboutUs').click(() => {
  $([document.documentElement, document.body]).animate({
    scrollTop: $('#aboutUs').offset().top
  }, 400);
});

$('#goToAuthors').click(() => {
  $([document.documentElement, document.body]).animate({
    scrollTop: $('#authors').offset().top
  }, 800);
});

$('#goToInstruction').click(() => {
  $([document.documentElement, document.body]).animate({
    scrollTop: $('#instruction').offset().top
  }, 1200);
});

$('#goToPlans').click(() => {
  $([document.documentElement, document.body]).animate({
    scrollTop: $('#plans').offset().top
  }, 1600);
});

$('[data-open-modal]').click((e) => {
  const target = $(this).attr('data-open-modal');
  $(target).addClass('active');
  e.preventDefault();
});

$('[data-close-modal]').click((e) => {
  const target = $(this).attr('data-close-modal');
  $(target).removeClass('active');
  e.preventDefault();
});

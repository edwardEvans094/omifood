/* eslint-env jquery, browser */
$(document).ready(() => {

  // Place JavaScript code here...

});

$("#goToPlans").click(function() {
  $([document.documentElement, document.body]).animate({
    scrollTop: $("#plans").offset().top
  }, 1600);
});

$('[data-open-modal]').click(function(e) {
  let target = $(this).attr('data-open-modal');
  $(target).addClass('active');
  e.preventDefault();
});

$('[data-close-modal]').click(function(e) {
  let target = $(this).attr('data-close-modal');
  $(target).removeClass('active');
  e.preventDefault();
});

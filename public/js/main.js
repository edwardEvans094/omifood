/* eslint-env jquery, browser */
$(document).ready(() => {
  // Place JavaScript code here...
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

  $('[data-open-modal]').click(function openModal(e) {
    const target = $(this).attr('data-open-modal');
    $(target).addClass('active');
    e.preventDefault();
  });

  $('[data-close-modal]').click(function closeModal(e) {
    const target = $(this).attr('data-close-modal');
    $(target).removeClass('active');
    e.preventDefault();
  });

  $('#addItemBtn').click((e) => {
    e.preventDefault();
    const items = $('#items');
    const itemTemplate =
      '<div class="item-option">' +
        '<input class="quantity" type="number" min="1" step="1" value="1">' +
        '<select class="size">' +
          '<option value="S">S</option>' +
          '<option value="M">M</option>' +
          '<option value="L">L</option>' +
          '<option value="XL">XL</option>' +
        '</select>' +
        '<select class="gender">' +
          '<option value="F">Nữ</option>' +
          '<option value="M">Nam</option>' +
        '</select>' +
      '</div>';
    items.append(itemTemplate);
  });
});

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
        '<input class="quantity" name="box2_quantity" type="number" min="1" step="1" value="1">' +
        '<select class="size" name="box2_size">' +
          '<option value="S">S</option>' +
          '<option value="M">M</option>' +
          '<option value="L">L</option>' +
          '<option value="XL">XL</option>' +
        '</select>' +
        '<select class="gender" name="box2_gender">' +
          '<option value="F">Nữ</option>' +
          '<option value="M">Nam</option>' +
        '</select>' +
      '</div>';
    items.append(itemTemplate);
  });

  $('#modal_2').submit((event) => {
    event.preventDefault();

    const values = [];
    // $.each($('#modal_2').serializeArray(), (i, field) => {
    //   values[field.name] = field.value;
    // });
    const csrf = $('meta[name=csrf-token]').attr('content');

    const quantity = $("input[name='box2_quantity']")
      .map(function () { return $(this).val(); }).get();

    const size = $("select[name='box2_size']")
      .map(function () { return $(this).val(); }).get();

    const gender = $("select[name='box2_gender']")
      .map(function () { return $(this).val(); }).get();

    quantity.map((v, i) => {
      values[i] = {};
      values[i].quantity = quantity[i];
      values[i].size = size[i];
      values[i].gender = gender[i];
      values[i].type = 2;
    });

    $.post('api/order/add-to-cart', {
      cart: values,
      _csrf: csrf
    })
      .done((data) => {
        // console.log(data);
        alert('Đã được thêm vào giỏ hàng');
        if (data.carts) {
          $('#cartsNumber').html(data.carts.length);
        }
      });
  });


  $('#modal_3').submit((event) => {
    event.preventDefault();


    // $.each($('#modal_2').serializeArray(), (i, field) => {
    //   values[field.name] = field.value;
    // });
    const csrf = $('meta[name=csrf-token]').attr('content');

    const quantity = $("input[name='box3_quantity']").val();

    const values = [{
      type: 3,
      quantity
    }];

    $.post('api/order/add-to-cart', {
      cart: values,
      _csrf: csrf
    })
      .done((data) => {
        // console.log(data);
        alert('Đã được thêm vào giỏ hàng');
        if (data.carts) {
          $('#cartsNumber').html(data.carts.length);
        }
      });
  });

  $('[cart-delete-id]').off('click');
  $('[cart-delete-id]').click(function deleteCart(e) {
    e.preventDefault();
    const target = $(this).attr('cart-delete-id');
    const csrf = $('meta[name=csrf-token]').attr('content');
    $.post('api/order/remove-cart', {
      cardId: target,
      _csrf: csrf
    })
      .done((data) => {
        // console.log(data);
        alert('Đã xoá');
        location.reload();
      });
  });
});

$(document).on('click', '.menuLink', function () {
  var ele = $(this);
  var hash = ele.prop('hash');

  $('.containerData').hide();
  $(hash).show();
  $('.menuLink').closest('li').removeClass('active');
  ele.closest('li').addClass('active');
});

$(document).on('click', '.addNewFile', function () {
  var element = $(this);

  element.siblings('input[type=file]').trigger('click');
});


$.ajax({
  url: '/php/is_admin.php',
  success: function(response) {
    console.log(response);
    if (!JSON.parse(response).hasAdminAccess)
      window.location.href = "/";
  },
  error: function() {
    window.location.href = "/";
  }
});

var db = new DropboxWrapper();

$(document).on('click', '.menuLink', function () {
  var ele = $(this);
  var hash = ele.prop('hash');

  $('.containerData').hide();
  $(hash).show();
  $('.menuLink').closest('li').removeClass('active');
  ele.closest('li').addClass('active');
});

function addFile(name, link) {
  var tr   = $('<tr>');
  var td   = $('<td>');
  var span = $('<span class="glyphicon glyphicon-remove">');
  span.click(function() {
    removeFile(tr, name);
  });
  
  tr.append($('<td>' + name + '</td>'));
  td.append(span);
  tr.append(td);

  $('#file-table-body').append(tr);
}

function removeFile(tr, name) {
  db.deleteMaterial(name, function(err) {
    if (err)
      return; // maybe some flashy red animation?

    $(tr).remove();
  })
}

function addImage(name, link) {
  var div       = $('<div class="imageContainer">');
  var img       = $('<img src="' + link + '" alt="' + name + '">');
  var spanOuter = $('<span class="remove-link">');
  var spanInner = $('<span class="glyphicon glyphicon-remove">');

  spanInner.click(function() {
    removeImage(div, name);
  });

  spanOuter.append(spanInner);
  div.append(img);
  div.append(spanOuter);

  $('#imageTable .imageContent').append(div);
}

function removeImage(div, name) {
  db.deleteImage(name, function(err) {
    if (err)
      return; // maybe some flashy red animation?

    $(div).remove();
  })
}

function initMaterials() {
  $('#input-material').change(function() {
    var files = $(this).context.files;
    
    for (var i = 0; i < files.length; ++i) {
      db.uploadMaterial(files[i], function(file) {
        addFile(file.name, file.staticLink);
      });
    }
  });

  db.forEachMaterialFile(function(file) {
    addFile(file.name, file.staticLink);    
  });
}

function initImages() {
  $('#input-image').change(function() {
    var files = $(this).context.files;
    
    for (var i = 0; i < files.length; ++i) {
      db.uploadImage(files[i], function(file) {
        addImage(file.name, file.staticLink);
      });
    }
  });

  db.forEachImageFile(function(file) {
    addImage(file.name, file.staticLink);    
  });
}

$(document).ready(function() {
  initMaterials();
  initImages();

  $('#add-material').click(function () {
    $('#input-material').trigger('click');
  });

  $('#add-image').click(function () {
    $('#input-image').trigger('click');
  });
});

